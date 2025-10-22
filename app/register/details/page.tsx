"use client";

import PageHeader from "../../../components/PageHeader";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

// Allowed Rotary club names (exact-match enforced)
const CLUBS = [
  "B C Road City",
  "Baikampady",
  "Bajpe",
  "Bannur",
  "Bantwal",
  "Bantwal Loretto Hills",
  "Bantwal Town",
  "Bellare Town",
  "Belthangady",
  "Central Mysore",
  "Chamarajanagara",
  "Chamarajanagara Silk City",
  "Deralakatte",
  "E Club of Mysore Center",
  "Farangipete",
  "Gonikoppal",
  "H D Kote",
  "Hanagud",
  "Hemavathi Kodlipete",
  "Heritage Mysuru",
  "Hunsur",
  "Ivory City",
  "Kinigoli",
  "Kollegala",
  "Kollegala Midtown",
  "Krishnaraja",
  "Krishnarajanagara",
  "Kushalnagara",
  "Madanthyar",
  "Madikeri",
  "Madikeri Woods",
  "Malleshwar Alapur Siddapur",
  "Mangalore",
  "Mangalore Central",
  "Mangalore City",
  "Mangalore Coastal",
  "Mangalore Down Town",
  "Mangalore East",
  "Mangalore Hillside",
  "Mangalore Metro",
  "Mangalore Midtown",
  "Mangalore North",
  "Mangalore Port Town",
  "Mangalore Seaside",
  "Mangalore South",
  "Mangalore Sunrise",
  "Misty Hills Madikeri",
  "Modankap",
  "Moodabidri",
  "Moodabidri Midtown",
  "Moodabidri Temple Town",
  "Mulki",
  "Mysore",
  "Mysore Ambari",
  "Mysore Brindavan",
  "Mysore East",
  "Mysore Elite",
  "Mysore Jayaprakash Nagar",
  "Mysore Metro",
  "Mysore Midtown",
  "Mysore North",
  "Mysore Royal",
  "Mysore Seva",
  "Mysore SouthEast",
  "Mysore Sreegandha",
  "Mysore Stars",
  "Mysore West",
  "Mysuru Diamond",
  "Nanjangud",
  "Panchasheel",
  "Periyapatna Icons",
  "Periyapatna Midtown",
  "Puttur",
  "Puttur Central",
  "Puttur City",
  "Puttur East",
  "Puttur Elite",
  "Puttur Swarna",
  "Puttur Yuva",
  "Shanivarashanthe",
  "Siddakatte",
  "Somarpete Hills",
  "Subramanya",
  "Sullia",
  "Sullia City",
  "Surathkal",
  "Uppinangdi",
  "Vijayanagara Mysore",
  "Virajpete",
  "Vittal",
  "Yelandur Greenway",
];

export default function RegistrationDetailsPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const router = useRouter();
  const type = (searchParams?.type || "").toString() as RegType | "";
  const option = useMemo(() => TYPES.find(t => t.key === type), [type]);
  const inr = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);

  // Form state
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [clubOpen, setClubOpen] = useState(false);
  const [clubQuery, setClubQuery] = useState("");
  const [meal, setMeal] = useState("Veg");
  const [spouseName, setSpouseName] = useState("");
  const [children, setChildren] = useState<number>(0);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const filteredClubs = useMemo(() => {
    const q = normalize(clubQuery.trim());
    const list = CLUBS.slice().sort((a, b) => a.localeCompare(b));
    if (!q) return list;
    return list.filter((c) => normalize(c).includes(q));
  }, [clubQuery]);

  const needsSpouseBlock = type === "rotarian_spouse";
  const isSponsor = type === "silver_sponsor" || type === "gold_sponsor" || type === "platinum_sponsor" || type === "patron_sponsor";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full Name is required";
    if (!/^\d{10}$/.test(mobile)) e.mobile = "Enter 10-digit mobile";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!club.trim() || !CLUBS.includes(club)) e.club = "Please select a club from the list";
    if (needsSpouseBlock && spouseName.trim().length === 0) e.spouseName = "Spouse Name required";
    if (isSponsor && !agree) e.agree = "Please acknowledge accommodation terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      const params = new URLSearchParams();
      if (option?.key) params.set("type", option.key);
      params.set("name", fullName);
      params.set("mobile", mobile);
      params.set("email", email);
      params.set("club", club);
      params.set("meal", meal);
      if (needsSpouseBlock) {
        params.set("spouseName", spouseName);
        params.set("children", String(children));
      }
      router.push(`/register/confirm?${params.toString()}`);
    }
  };

  const title = option ? `Registration Details — ${option.label}` : "Registration Details";

  return (
    <main className="min-h-screen">
      <PageHeader
        title={title}
        subtitle={option ? `Provide participant details for ${option.label}.` : "Provide participant details."}
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        {/* Selected type summary */}
        {option && (
          <div className="panel-border rounded-2xl p-[1.5px] has-sheen mb-6">
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
        )}

        {/* Details form */}
        <form onSubmit={onSubmit} className="panel-border rounded-2xl p-[1.5px] has-sheen">
          <div className="panel-surface rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-1">Full Name</label>
                <input value={fullName} onChange={e=>setFullName(e.target.value)} className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="Your full name" />
                {errors.fullName && <p className="text-red-300 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1">Mobile (10 digits)</label>
                <input
                  value={mobile}
                  onChange={(e)=>{
                    const digits = e.target.value.replace(/\D/g, "").slice(0,10);
                    setMobile(digits);
                  }}
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  placeholder="1234567890"
                />
                {errors.mobile && <p className="text-red-300 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="you@example.com" />
                {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <label className="block text-white/80 text-sm mb-1">Club Name</label>
                <button
                  type="button"
                  onClick={()=> setClubOpen((v)=>!v)}
                  className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-left text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  {club || "Select club…"}
                </button>
                {errors.club && <p className="text-red-300 text-xs mt-1">{errors.club}</p>}
                {clubOpen && (
                  <>
                    {/* Backdrop to capture outside clicks */}
                    <div
                      className="fixed inset-0 z-[99] bg-black/50"
                      onClick={()=>{ setClubOpen(false); }}
                    />
                    {/* Floating panel (modal-style) for full accessibility and scrolling */}
                    <div className="fixed z-[100] inset-x-4 top-24 sm:top-28 md:top-32 mx-auto max-w-xl panel-border rounded-2xl p-[1.5px]">
                      <div className="panel-surface rounded-2xl p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <input
                            autoFocus
                            value={clubQuery}
                            onChange={(e)=>setClubQuery(e.target.value)}
                            placeholder="Search club…"
                            className="flex-1 rounded-md bg-white/10 border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          />
                          <button
                            type="button"
                            onClick={()=> setClubOpen(false)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white/80 hover:bg-white/10"
                            aria-label="Close"
                          >
                            ✕
                          </button>
                        </div>
                        <ul className="mt-3 max-h-[60vh] overflow-auto divide-y divide-white/5">
                          {filteredClubs.length === 0 && (
                            <li className="px-3 py-2 text-white/60 text-sm">No matches</li>
                          )}
                          {filteredClubs.map((c)=> (
                            <li key={c}>
                              <button
                                type="button"
                                onClick={()=>{ setClub(c); setClubOpen(false); setClubQuery(""); setErrors((e)=> ({...e, club: ""})); }}
                                className={`w-full text-left px-3 py-2 hover:bg-white/10 rounded-md text-white ${club===c? 'bg-white/10 ring-1 ring-white/10':''}`}
                              >
                                {c}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Meal preference */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Meal Preference</label>
              <div className="flex flex-wrap gap-3">
                {["Veg","Non-Veg"].map(m => (
                  <label key={m} className={`px-4 py-2 rounded-full border transition-all ${meal===m? (m==='Veg'?'bg-green-500 text-white border-green-500':'bg-red-500 text-white border-red-500'):'border-white/20 text-white/85 hover:border-white/40'} cursor-pointer` }>
                    <input type="radio" name="meal" value={m} checked={meal===m} onChange={()=>setMeal(m)} className="hidden" />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            {/* Rotarian with Spouse extras */}
            {needsSpouseBlock && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-1">Spouse Name</label>
                  <input value={spouseName} onChange={e=>setSpouseName(e.target.value)} className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300" placeholder="Spouse full name" />
                  {errors.spouseName && <p className="text-red-300 text-xs mt-1">{errors.spouseName}</p>}
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-1">Children below 12 (0–2)</label>
                  <input value={children} onChange={e=>setChildren(Number(e.target.value)||0)} type="number" min={0} max={2} className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
              </div>
            )}

            {/* Sponsor acknowledgement */}
            {isSponsor && (
              <label className="flex items-start gap-2 text-white/80">
                <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} className="mt-1" />
                <span>I acknowledge the accommodation entitlement stated in the selected sponsorship benefits (room type and no extra beds).</span>
                {errors.agree && <span className="text-red-300 text-xs mt-1 block">{errors.agree}</span>}
              </label>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Link href="/register/type" className="text-white/70 hover:text-white underline underline-offset-4">Back</Link>
              <button type="submit" className="vibrant-button">Review Details</button>
            </div>
          </div>
        </form>

        {/* Review moved to a dedicated page */}
      </section>
    </main>
  );
}
