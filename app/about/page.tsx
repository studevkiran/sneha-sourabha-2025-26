"use client";

import PageHeader from "../../components/PageHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="About the Conference"
        subtitle="Learn about the vision, theme, and purpose of the Rotary District 3181 Conference — Sneha Sourabha 2025-26."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/90 leading-relaxed">
            Sneha Sourabha brings together Rotarians, spouses, Anns, Annets, and distinguished guests for three days of connection,
            inspiration, and service. Expect keynote talks, district showcases, cultural evenings, and meaningful fellowship.
          </p>
        </div>
      </section>
    </main>
  );
}
