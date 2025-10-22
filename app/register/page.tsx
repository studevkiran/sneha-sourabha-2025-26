"use client";

import PageHeader from "../../components/PageHeader";

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Register"
        subtitle="Complete your registration in a few easy steps. UPI payments are recommended for quick confirmation."
      />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-8">
        <div className="vibrant-card">
          <p className="text-white/85">Start by choosing your registration type.</p>
          <div className="mt-4">
            <a className="vibrant-button" href="/register/type">Choose Registration Type</a>
          </div>
        </div>
      </section>
    </main>
  );
}
