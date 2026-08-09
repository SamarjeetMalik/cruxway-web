/**
 * Site-wide facts and navigation.
 *
 * Every value here traces to a source document. Nothing is authored.
 *   - Orientation lines, footer, small print .... Website Copy v3
 *   - Emails, locations ......................... the current live site
 *   - `[ADD CONTENT]` ........................... exists in no source
 */

export const REGIONS = ['us', 'india'] as const;
export type Region = (typeof REGIONS)[number];

export const isRegion = (value: string): value is Region =>
  (REGIONS as readonly string[]).includes(value);

export const regionNames: Record<Region, string> = {
  us: 'United States',
  india: 'India',
};

/** v3, "The orientation system (used site-wide)". */
export const orientation = {
  descriptor: 'A permanent home for family- and founder-owned businesses.',
  supporting: 'Built and backed by founders and families.',
  tagline: 'The clear way through your most important decision.',
} as const;

export const nav = [
  { href: '', label: 'Home' },
  { href: '/who-we-are', label: 'Who we are' },
  { href: '/what-we-do', label: 'What we do' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * The United States site is the root of the domain and India is nested under
 * `/india`, so there is no region-choosing page standing between a visitor and
 * the site. Region is switched from the header instead.
 */
export const regionHref = (region: Region, path: string): string =>
  region === 'us' ? path || '/' : `/india${path}`;

/** v3 sets investor access apart from the main navigation. */
export const investorNav = {
  href: '/investor-login',
  label: 'Investor login',
} as const;

type ContactDetails = {
  email: string;
  /** No phone number appears in any source document. */
  phone: string | null;
  location: string;
  mapUrl: string;
};

export const contact: Record<Region, ContactDetails> = {
  us: {
    email: 'us@cruxway.com',
    phone: null,
    location: 'San Diego, California',
    mapUrl: 'https://maps.google.com/?q=San+Diego+California',
  },
  india: {
    email: 'india@cruxway.com',
    phone: null,
    location: 'E-97, GK II, Delhi, India',
    mapUrl: 'https://maps.app.goo.gl/C4V6nKknHo7vPrrj9',
  },
};

export const legal = {
  entity: 'Cruxway LLC',
  /** v3, "Small print". */
  smallPrint:
    'Cruxway LLC. This site is for general information only and is not investment, legal, or tax advice. All conversations are treated as confidential.',
  /** v3, "Footer". */
  footerLine:
    'Cruxway — a permanent home for family- and founder-owned businesses. Built and backed by founders and families.',
} as const;

/**
 * Drives canonical URLs, the sitemap, and Open Graph. Overridden by
 * `NEXT_PUBLIC_SITE_URL` so a preview deployment describes itself correctly
 * instead of claiming to be the production domain.
 *
 * Trailing slash is stripped because GitHub's `configure-pages` action emits
 * one, and every use here appends a path.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cruxway.com').replace(/\/+$/, '');

export const site = {
  name: 'Cruxway',
  url: siteUrl,
  /**
   * Absolute, because `metadataBase` would resolve a root-relative path
   * against the origin and drop the `/cruxway-web` project-site prefix.
   * Rebuild with `node scripts/build-og-image.mjs` if the hero or headline
   * ever changes.
   */
  ogImage: `${siteUrl}/og.jpg`,
} as const;
