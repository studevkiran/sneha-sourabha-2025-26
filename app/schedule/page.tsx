"use client";

import PageHeader from "../../components/PageHeader";

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Schedule"
        subtitle="A crisp agenda across three inspiring days — keynotes, panels, showcases, and cultural evenings."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8 space-y-4">
        {["Day 1 • 30 Jan 2026", "Day 2 • 31 Jan 2026", "Day 3 • 1 Feb 2026"].map((day) => (
          <div key={day} className="vibrant-card">
            <h2 className="text-white/90 font-semibold">{day}</h2>
            <p className="text-white/80 text-sm mt-2">Detailed agenda will be published soon.</p>
          </div>
        ))}
      </section>
    </main>
  );
}
