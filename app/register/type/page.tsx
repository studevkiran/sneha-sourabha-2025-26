"use client";

import PageHeader from "../../../components/PageHeader";
import { useMemo, useState } from "react";
import Link from "next/link";
import { User, Users, HeartHandshake, Sparkles, Shield, HandCoins, Award, Gem, Crown } from "lucide-react";

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

export default function RegistrationTypePage() {
  const [selected, setSelected] = useState<RegType | null>(null);
  const selectedOption = useMemo(() => TYPES.find(t => t.key === selected) || null, [selected]);
  const inr = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Choose Registration Type"
        subtitle="Select one option to continue to participant details."
      />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TYPES.map((t) => {
            const active = selected === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setSelected(t.key)}
                className={`vibrant-card has-sheen text-left transition-transform ${active ? 'ring-2 ring-amber-300 scale-[1.01]' : 'ring-0'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="vibrant-icon-ring">
                    {t.key === 'rotarian' && <User className="w-5 h-5 text-amber-300" />}
                    {t.key === 'rotarian_spouse' && <HeartHandshake className="w-5 h-5 text-amber-300" />}
                    {t.key === 'ann' && <Users className="w-5 h-5 text-amber-300" />}
                    {t.key === 'annet' && <Sparkles className="w-5 h-5 text-amber-300" />}
                    {t.key === 'guest' && <Shield className="w-5 h-5 text-amber-300" />}
                    {t.key === 'rotaractor' && <Users className="w-5 h-5 text-amber-300" />}
                    {t.key === 'silver_donor' && <HandCoins className="w-5 h-5 text-amber-300" />}
                    {t.key === 'silver_sponsor' && <Award className="w-5 h-5 text-amber-300" />}
                    {t.key === 'gold_sponsor' && <Gem className="w-5 h-5 text-amber-300" />}
                    {t.key === 'platinum_sponsor' && <Crown className="w-5 h-5 text-amber-300" />}
                    {t.key === 'patron_sponsor' && <Crown className="w-5 h-5 text-amber-300" />}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{t.label}</h3>
                    <p className="text-white/80 text-sm mt-1">{inr.format(t.amount)}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {/* Selected details panel */}
        <div className="mt-6">
          {selectedOption ? (
            <div className="panel-border rounded-2xl p-[1.5px] has-sheen">
              <div className="panel-surface rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{selectedOption.label}</h4>
                    <p className="text-white/80 text-sm mt-1">{selectedOption.benefits}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-amber-300">{inr.format(selectedOption.amount)}</div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <Link href="/register" className="text-white/70 hover:text-white underline underline-offset-4">Back</Link>
                  <Link
                    href={`/register/details?type=${selectedOption.key}`}
                    className="vibrant-button"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white/70 text-sm">Select one option above to see price and benefits.</div>
          )}
        </div>
      </section>
    </main>
  );
}
