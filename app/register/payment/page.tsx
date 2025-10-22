import PageHeader from "../../../components/PageHeader";
import Link from "next/link";
import UPIPayment from "./UPIPayment";

type RegType =
  | "rotarian"
  | "rotarian_spouse"
  | "ann"
  | "annet"
  | "guest"
  | "rotaractor"
  | "silver_donor"
  | "silver_sponsor"
  | "gold_sponsor"
  | "platinum_sponsor"
  | "patron_sponsor";

type RegOption = { key: RegType; label: string; amount: number; benefits: string };

const TYPES: RegOption[] = [
  { key: "rotarian", label: "Rotarian", amount: 4500, benefits: "Admission, Food & 1 Memento" },
  { key: "rotarian_spouse", label: "Rotarian with Spouse", amount: 7500, benefits: "Admission with spouse + 2 children below 12 years, Food & 1 Memento" },
  { key: "ann", label: "Ann", amount: 3500, benefits: "Admission & Food" },
  { key: "annet", label: "Annet", amount: 2000, benefits: "Admission & Food" },
  { key: "guest", label: "Guest", amount: 4500, benefits: "Admission, Food & 1 Memento" },
  { key: "rotaractor", label: "Rotaractor", amount: 25000, benefits: "Admission & Food" },
  { key: "silver_donor", label: "Silver Donor", amount: 20000, benefits: "Admission with spouse + 2 children below 12 years, Food & 2 Mementos" },
  { key: "silver_sponsor", label: "Silver Sponsor", amount: 25000, benefits: "Admission with spouse + 2 children below 12 years, Food & 1 Memento, Double Room at venue (no extra beds)" },
  { key: "gold_sponsor", label: "Gold Sponsor", amount: 50000, benefits: "Admission with spouse + 2 children below 12 years, Food & special Memento, Double Room at venue (no extra beds)" },
  { key: "platinum_sponsor", label: "Platinum Sponsor", amount: 75000, benefits: "Admission with spouse + 2 children below 12 years, Food & special Memento, Premium Room at venue (no extra beds)" },
  { key: "patron_sponsor", label: "Patron Sponsor", amount: 100000, benefits: "Admission with spouse + 2 children below 12 years, Food & special Memento, Suite Room at venue (no extra beds)" },
];

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; name?: string; club?: string; meal?: string }>;
}) {
  const params = await searchParams;
  const type = (params?.type || "").toString() as RegType | "";
  const option = TYPES.find(t => t.key === type);
  const name = (params?.name || "").toString();
  const club = (params?.club || "").toString();
  const meal = (params?.meal || "").toString();
  const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const UPI_VPA = process.env.NEXT_PUBLIC_UPI_VPA || "";
  const UPI_NAME = process.env.NEXT_PUBLIC_UPI_NAME || "Sneha Sourabha";
  
  const upiLink = option && UPI_VPA ? (() => {
    const amount = (option.amount ?? 0).toFixed(2);
    const note = `Registration ${option.label}${name ? ` - ${name}` : ""}`;
    const params = new URLSearchParams({ pa: UPI_VPA, pn: UPI_NAME, am: amount, cu: "INR", tn: note });
    return `upi://pay?${params.toString()}`;
  })() : "";

  const title = option ? `Payment — ${option.label}` : "Payment";

  return (
    <main className="min-h-screen">
      <PageHeader
        title={title}
        subtitle={option ? `Complete payment for ${option.label}.` : "Complete payment."}
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        {!option ? (
          <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
            <div className="panel-surface rounded-2xl p-6">
              <p className="text-white/85">Missing or invalid registration type. Please choose your registration type again.</p>
              <div className="mt-4">
                <Link href="/register/type" className="vibrant-button">Choose Type</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Summary */}
            <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface rounded-2xl p-5 sm:p-6 space-y-2">
                <h3 className="text-white font-semibold text-lg">Summary</h3>
                <div className="text-white/85 text-sm">
                  <div><span className="text-white/60">Type:</span> {option.label}</div>
                  {name && <div><span className="text-white/60">Name:</span> {name}</div>}
                  {club && <div><span className="text-white/60">Club:</span> {club}</div>}
                  {meal && <div><span className="text-white/60">Meal:</span> {meal}</div>}
                </div>
                <div className="pt-2 text-2xl font-extrabold text-amber-300">{inr.format(option.amount)}</div>
              </div>
            </div>

            {/* QR & Actions */}
            <UPIPayment 
              upiLink={upiLink}
              name={name}
              club={club}
              optionKey={option.key}
              optionLabel={option.label}
              optionAmount={option.amount}
            />

            {/* Back button */}
            <div className="lg:col-span-2">
              <Link href={`/register/details?type=${option.key}`} className="text-white/70 hover:text-white underline underline-offset-4">
                ← Back to Details
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
