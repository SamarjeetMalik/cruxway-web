/**
 * The three partners.
 *
 * v3 leaves the bios to be written and lists only "ideas to convey", so no
 * prose bio exists yet for any of them. The credential lines below are taken
 * verbatim from the LP deck (slides 3–4), which is the one source that covers
 * all three symmetrically — v3 asks explicitly that the three "read as equals".
 *
 * Roles follow the current live site for Harin and Vaibhav; the deck's "Partner"
 * for Benson, who does not appear on the live site at all.
 *
 * Portraits are the deck's 600px originals, not the 314px crops in the old
 * repo. Benson's is the only image of him in any source.
 */

export type Person = {
  name: string;
  role: string;
  portrait: string;
  /** Alt text describes the person, not the file. */
  portraitAlt: string;
  credentials: string[];
  /** Null where no source records one — never a placeholder link. */
  linkedIn: string | null;
};

export const people: Person[] = [
  {
    name: 'Harin Gupta',
    role: 'Managing Partner',
    portrait: '/images/portraits/harin-gupta.png',
    portraitAlt: 'Harin Gupta',
    credentials: [
      'Invested through the Business Services Group at Warburg Pincus, a global private equity firm with $85B+ AUM',
      'Served on the Board of Directors for RMS Energy, a provider of services for high-voltage electrical equipment',
      'Began his finance career at leading investment banks, including JP Morgan, Evercore, and Deutsche Bank',
      'Helped scale family’s restaurant chain to 125+ locations globally',
    ],
    linkedIn: 'https://www.linkedin.com/in/harin-gupta/',
  },
  {
    name: 'Benson Zhang',
    role: 'Partner',
    portrait: '/images/portraits/benson-zhang.png',
    portraitAlt: 'Benson Zhang',
    credentials: [
      'Over a decade of experience in finance and private equity investing across technology and services',
      'Invested through BlackRock’s direct private equity group; led sale of Authentic',
      'At HGGC, led investments in IDERA and RPX, serving as board observer',
      'Began career at Credit Suisse Technology Investment Banking; closed $30B+ deal value',
    ],
    linkedIn: null,
  },
  {
    name: 'Vaibhav Sharma',
    role: 'Partner, India',
    portrait: '/images/portraits/vaibhav-sharma.png',
    portraitAlt: 'Vaibhav Sharma',
    credentials: [
      'Led investments and due diligence across a venture fund and family office, spanning cleantech, deeptech, and manufacturing',
      'Co-founded 3 companies (1 exit) and scaled multiple ventures with direct P&L ownership',
      'Experience across fundraising and capital strategy spanning early-stage, growth, and private equity',
      'Recipient of Stanford Science Grant for low cost medical intervention',
    ],
    linkedIn: 'https://www.linkedin.com/in/vaibhavnabha/',
  },
];
