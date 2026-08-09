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

/** v3 sets investor access apart from the main navigation. */
export const investorNav = {
  href: '/investor-relations',
  label: 'Investor relations',
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

export const site = {
  name: 'Cruxway',
  /**
   * Drives canonical URLs, the sitemap, and Open Graph. Overridden by
   * `NEXT_PUBLIC_SITE_URL` so a preview deployment describes itself correctly
   * instead of claiming to be the production domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cruxway.com',
} as const;
