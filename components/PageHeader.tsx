"use client";

import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function PageHeader({ title, subtitle, ctaHref, ctaLabel }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14">
      <div className="text-center animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-200 via-fuchsia-200 to-emerald-200 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        {ctaHref && ctaLabel && (
          <div className="mt-5">
            <Link href={ctaHref} className="vibrant-button">
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
