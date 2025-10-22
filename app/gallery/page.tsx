"use client";

import PageHeader from "../../components/PageHeader";

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Gallery"
        subtitle="Highlights and memories from the conference — photos and videos will be published here."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/85">Gallery coming soon.</p>
        </div>
      </section>
    </main>
  );
}
