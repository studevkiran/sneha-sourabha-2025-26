"use client";

import PageHeader from "../../components/PageHeader";

export default function SpeakersPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Speakers"
        subtitle="A curated lineup of leaders and changemakers. Speaker announcements coming soon."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/85">Stay tuned for speaker profiles and session details.</p>
        </div>
      </section>
    </main>
  );
}
