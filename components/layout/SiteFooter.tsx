import Link from 'next/link';

import { Placeholder } from '@/components/primitives/Typography';
import {
  contact,
  investorNav,
  legal,
  nav,
  orientation,
  regionHref,
  REGIONS,
  regionNames,
  type Region,
} from '@/content/site';

export function SiteFooter({ region }: { region: Region }) {
  const details = contact[region];
  const otherRegion = REGIONS.find((candidate) => candidate !== region)!;

  return (
    <footer className="bg-surface-deep px-gutter pb-14 pt-section text-parchment">
      <div className="mx-auto w-full max-w-shell">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-[1.8rem] leading-none tracking-[-0.03em]">Cruxway</p>
            <p className="mt-6 max-w-measure text-body text-parchment-soft/80">{legal.footerLine}</p>
            <p className="mt-5 font-sans text-small text-parchment-soft/55">{orientation.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-sans text-label uppercase text-parchment-soft/50">Pages</p>
            <ul className="mt-6 space-y-3.5">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={regionHref(region, item.href)}
                    className="link-draw text-body text-parchment-soft/90 transition-colors duration-500 ease-editorial hover:text-parchment"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={investorNav.href}
                  className="link-draw text-body text-parchment-soft/90 transition-colors duration-500 ease-editorial hover:text-parchment"
                >
                  {investorNav.label}
                </Link>
              </li>
              <li>
                <Link
                  href={regionHref(otherRegion, '')}
                  className="link-draw text-body text-parchment-soft/60 transition-colors duration-500 ease-editorial hover:text-parchment"
                >
                  {regionNames[otherRegion]}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-sans text-label uppercase text-parchment-soft/50">Contact</p>
            <ul className="mt-6 space-y-3.5 text-body">
              <li>
                <a
                  href={`mailto:${details.email}`}
                  className="link-draw text-parchment-soft/90 transition-colors duration-500 ease-editorial hover:text-parchment"
                >
                  {details.email}
                </a>
              </li>
              <li>{details.phone ?? <Placeholder label="ADD PHONE" />}</li>
              <li>
                <a
                  href={details.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw text-parchment-soft/90 transition-colors duration-500 ease-editorial hover:text-parchment"
                >
                  {details.location}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-section border-0 border-t border-rule-deep/12" />

        <p className="mt-8 max-w-measure-wide font-sans text-[0.8rem] leading-relaxed text-parchment-soft/55">
          {legal.smallPrint}
        </p>
        <p className="mt-4 font-sans text-[0.8rem] text-parchment-soft/45">
          © {new Date().getFullYear()} {legal.entity}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
