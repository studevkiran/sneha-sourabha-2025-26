"use client";

import PageHeader from "../../components/PageHeader";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Sponsors"
        subtitle="We are grateful to our partners and sponsors who make this conference possible."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/85">Sponsorship tiers and partner logos will appear here.</p>
        </div>
      </section>
    </main>
  );
}
