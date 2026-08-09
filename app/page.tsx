import type { Metadata } from 'next';
import Link from 'next/link';

import { Figure } from '@/components/primitives/Figure';
import { ThemeToggle } from '@/components/primitives/ThemeToggle';
import { Label } from '@/components/primitives/Typography';
import { gate } from '@/content/copy';
import { gateImage } from '@/content/images';
import { orientation, REGIONS, regionNames } from '@/content/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * The region gate. Deliberately the quietest page on the site: a wordmark, the
 * orientation line, and two choices. No navigation, because there is nowhere
 * to go yet.
 */
export default function RegionGate() {
  return (
    <main
      id="main"
      className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden bg-surface-deep px-gutter py-14 text-parchment"
    >
      <Figure
        src={gateImage.src}
        alt={gateImage.alt}
        priority
        scrim
        position="absolute"
        sizes="100vw"
        className="-z-10"
      />

      <div className="flex items-center justify-between gap-6">
        <p className="font-serif text-[1.7rem] leading-none tracking-[-0.03em]">Cruxway</p>
        <ThemeToggle tone="onDeep" />
      </div>

      <div className="max-w-shell py-20">
        <h1 className="max-w-[16ch] text-display text-parchment">{orientation.descriptor}</h1>
        <p className="mt-7 max-w-measure text-lead text-parchment-soft/85">
          {orientation.supporting}
        </p>
      </div>

      <div>
        <Label tone="onDeep">{gate.prompt}</Label>
        <nav aria-label="Select region" className="mt-7 flex flex-col gap-px sm:flex-row sm:gap-12">
          {REGIONS.map((region) => (
            <Link
              key={region}
              href={`/${region}`}
              className="group flex items-baseline gap-4 border-t border-rule-deep/15 py-5 font-serif text-title text-parchment transition-colors duration-500 ease-editorial hover:text-accent-deep sm:border-t-0 sm:py-0"
            >
              {regionNames[region]}
              <svg
                aria-hidden
                viewBox="0 0 24 12"
                className="h-2.5 w-6 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M0 6h22M17 1l5 5-5 5" />
              </svg>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
