"use client";

import PageHeader from "../../components/PageHeader";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Contact"
        subtitle="Reach out to the organizing team for assistance or partnership opportunities."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/85">Email: support@snehasourabha.in</p>
          <p className="text-white/70 text-sm mt-1">You can also contact your Club coordinator for registration help.</p>
        </div>
      </section>
    </main>
  );
}
