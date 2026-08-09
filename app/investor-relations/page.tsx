import type { Metadata } from 'next';
import Link from 'next/link';

import { Figure } from '@/components/primitives/Figure';
import { ThemeToggle } from '@/components/primitives/ThemeToggle';
import { Label, Placeholder, Rule } from '@/components/primitives/Typography';
import { investorRelations } from '@/content/copy';
import { investorImage } from '@/content/images';
import { contact, legal, REGIONS, regionNames } from '@/content/site';

export const metadata: Metadata = {
  title: investorRelations.headline,
  description: investorRelations.body,
  alternates: { canonical: '/investor-relations' },
  robots: { index: false, follow: true },
};

/**
 * v3's recommended option (c) for v1: an intentional "access on request" page
 * rather than a login that goes nowhere. The route into it is the two real
 * contact addresses — no investor-specific address exists in any source, so
 * the gated destination is marked pending rather than invented.
 */
export default function InvestorRelationsPage() {
  return (
    <main
      id="main"
      className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden bg-surface-deep px-gutter py-14 text-parchment"
    >
      <Figure
        src={investorImage.src}
        alt={investorImage.alt}
        priority
        scrim
        position="absolute"
        sizes="100vw"
        className="-z-10"
      />

      <div className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-[1.7rem] leading-none tracking-[-0.03em] transition-colors duration-500 ease-editorial hover:text-accent-deep"
        >
          Cruxway
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="link-draw font-sans text-label uppercase text-parchment-soft/75"
          >
            Back to site
          </Link>
          <ThemeToggle tone="onDeep" />
        </div>
      </div>

      <div className="max-w-shell py-20">
        <Label tone="onDeep">Investor access</Label>
        <h1 className="mt-7 text-display text-parchment">{investorRelations.headline}</h1>
        <p className="mt-7 max-w-measure text-lead text-parchment-soft/90">
          {investorRelations.body}
        </p>

        <Rule accent tone="onDeep" className="mt-14" />

        <h2 className="mt-10 font-sans text-label font-medium uppercase text-parchment-soft/65">
          {investorRelations.cta}
        </h2>

        <ul className="mt-6 flex flex-col gap-6 sm:flex-row sm:gap-16">
          {REGIONS.map((region) => (
            <li key={region}>
              <p className="font-sans text-label uppercase text-parchment-soft/60">
                {regionNames[region]}
              </p>
              <a
                href={`mailto:${contact[region].email}`}
                className="link-draw mt-2 inline-block font-serif text-subtitle text-parchment transition-colors duration-500 ease-editorial hover:text-accent-deep"
              >
                {contact[region].email}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12 flex flex-wrap items-center gap-3 text-small text-parchment-soft/60">
          <span>Gated reporting portal</span>
          <Placeholder label="PENDING" />
        </p>
      </div>

      <p className="max-w-measure-wide font-sans text-[0.8rem] leading-relaxed text-parchment-soft/55">
        {legal.smallPrint}
      </p>
    </main>
  );
}
