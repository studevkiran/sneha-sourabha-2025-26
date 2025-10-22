"use client";

import PageHeader from "../../components/PageHeader";
import Link from "next/link";

export default function VenuePage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Venue"
        subtitle="Silent Shores Convention Hall, Hebbal, Mysore — premium facilities with serene ambience."
        ctaHref="https://maps.app.goo.gl/y8xdiWCaKbsANWtc8"
        ctaLabel="Open in Google Maps"
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/85">
            The venue offers ample parking, comfortable seating, and state-of-the-art audio-visual support. Accommodation options are available nearby.
          </p>
          <div className="mt-4">
            <Link className="vibrant-button" href="/faq">Travel & Stay FAQs</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
