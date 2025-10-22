import PageHeader from "../../../components/PageHeader";
import Link from "next/link";

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

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; name?: string; mobile?: string; email?: string; club?: string; meal?: string; spouseName?: string; children?: string }>;
}) {
  const params = await searchParams;
  const type = (params?.type || "").toString() as RegType | "";
  const option = TYPES.find(t => t.key === type);
  const name = (params?.name || "").toString();
  const mobile = (params?.mobile || "").toString();
  const email = (params?.email || "").toString();
  const club = (params?.club || "").toString();
  const meal = (params?.meal || "").toString();
  const spouseName = (params?.spouseName || "").toString();
  const children = Number((params?.children || "0").toString()) || 0;
  const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const title = option ? `Review — ${option.label}` : "Review";

  // Build payment URL
  const paymentUrl = option ? (() => {
    const params = new URLSearchParams();
    params.set("type", option.key);
    if (name) params.set("name", name);
    if (club) params.set("club", club);
    if (meal) params.set("meal", meal);
    return `/register/payment?${params.toString()}`;
  })() : "";

  return (
    <main className="min-h-screen">
      <PageHeader
        title={title}
        subtitle={option ? `Review your details for ${option.label}.` : "Review your details."}
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
          <div className="space-y-6">
            {/* Selected type summary */}
            <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface rounded-2xl p-5 sm:p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{option.label}</h3>
                  <p className="text-white/80 text-sm mt-1">{option.benefits}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-amber-300">{inr.format(option.amount)}</div>
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface rounded-2xl p-5 sm:p-6">
                <h4 className="text-white font-semibold text-lg">Your Details</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/85 text-sm">
                  <div><span className="text-white/60">Name:</span> {name}</div>
                  <div><span className="text-white/60">Mobile:</span> {mobile}</div>
                  <div><span className="text-white/60">Email:</span> {email}</div>
                  <div><span className="text-white/60">Club:</span> {club}</div>
                  <div><span className="text-white/60">Meal:</span> {meal}</div>
                  {type === "rotarian_spouse" && <div><span className="text-white/60">Spouse:</span> {spouseName || '-'}</div>}
                  {type === "rotarian_spouse" && <div><span className="text-white/60">Children:</span> {children}</div>}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/register/details?type=${option.key}`} className="text-white/70 hover:text-white underline underline-offset-4">Edit Details</Link>
                  <Link href={paymentUrl} className="vibrant-button">
                    Continue to Payment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
