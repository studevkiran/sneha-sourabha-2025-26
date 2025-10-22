"use client";

import PageHeader from "../../components/PageHeader";

export default function FaqPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="FAQs"
        subtitle="Answers to common questions about registration, travel, and the conference experience."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8 space-y-4">
        {[
          { q: "What are the conference dates?", a: "30–31 January and 1 February 2026." },
          { q: "Where is the venue?", a: "Silent Shores Convention Hall, Hebbal, Mysore." },
          { q: "How do I pay?", a: "UPI is recommended; other options will be listed on the registration form." },
        ].map(({ q, a }) => (
          <div key={q} className="vibrant-card">
            <h3 className="text-white font-semibold">{q}</h3>
            <p className="text-white/85 mt-1">{a}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
