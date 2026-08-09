/**
 * Every string on the website.
 *
 * Source: `Cruxway_Website_Copy_v3.docx`, transcribed verbatim. Where v3 joins
 * a lead-in to its explanation with an em dash, the two halves are stored
 * separately so the lead-in can be styled — they are re-joined at render as
 * `{term} — {detail}`, exactly as v3 wrote them.
 *
 * The only region-dependent strings are marked `Region delta` and listed in
 * README.md. Everything else is identical for both regions, because v3 is
 * written without reference to any geography.
 */

import type { Region } from './site';

export type Pair = { term: string; detail: string };

// ---------------------------------------------------------------------------
// Page 1 — Home
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    headline: 'A permanent home for family- and founder-owned businesses.',
    supporting:
      'Built and backed by founders and families. We invest in and partner with owners of exceptional businesses for the long term — helping what they’ve built grow, and grow stronger.',
    cta: 'Start a conversation',
  },

  intro: {
    label: 'Who we are, in a few lines',
    body: 'Cruxway invests in and partners with family- and founder-owned businesses for the long term. We focus on essential service companies — the steady, needed businesses that quietly keep other businesses, buildings, and communities running. We’ve spent our careers investing in and working alongside owners like you, and we grew up inside a family business of our own — so we understand that a company is more than a balance sheet: it’s a team, a name, and a lifetime of work. We’re here to help what you built grow, and to be a lasting home for it.',
  },

  different: {
    label: 'What makes us different',
    intro:
      'We know these businesses. We’ve helped founders and families — including our own — realize the full potential of what they built, by investing in growth.',
    points: [
      {
        term: 'Focused',
        detail: 'A handful of essential service industries we know deeply — not a little of everything.',
      },
      {
        term: 'Long-term',
        detail: 'We invest, we stay, and we keep building.',
      },
      {
        term: 'A real partner',
        detail:
          'The people you talk to are the people who own the decision — and who answer the phone.',
      },
    ] satisfies Pair[],
  },

  closing:
    'The most important decision of your business life deserves a clear path, an honest conversation, and a partner who’s still there years from now. That’s what we’re for.',
} as const;

// ---------------------------------------------------------------------------
// Page 2 — Who we are
// ---------------------------------------------------------------------------

export const whoWeAre = {
  headline: 'We come from this.',

  opening: [
    'We’ve spent our careers investing in and working alongside founders, owner-operators, and family businesses — and we grew up inside a multigenerational family business of our own. We understand what a business like yours carries: the team that depends on it, the trust built over years, and the name on the door.',
    'That’s why we understand the founder who started with nothing, the owner-operator who wears every hat, the family stewarding a business across generations, and the team that keeps it all running. We built Cruxway to be the kind of partner we’d have wanted across the table.',
  ],

  people: { label: 'The people' },

  involvement: {
    label: 'Where we’ve been involved',
    body: 'Across our careers, we’ve been involved in building and growing technical, highly regulated service businesses — including board and advisory roles with companies in electrical testing and maintenance, cybersecurity and compliance, inspection services, facility maintenance, and security services.',
  },

  beliefs: {
    label: 'What we believe',
    intro: 'How we partner is guided by a few principles we don’t compromise on:',
    principles: [
      {
        term: 'Integrity and intellectual honesty',
        detail: 'we’re transparent, and we do the right thing, especially when it’s hard.',
      },
      {
        term: 'Servant leadership',
        detail:
          'we lead by example and lift the people around us, earning trust through service rather than authority.',
      },
      {
        term: 'The golden rule',
        detail:
          'we treat people the way we’d want to be treated: with respect, fairness, and compassion.',
      },
      {
        term: 'Humility and a growth mindset',
        detail: 'we stay humble, learn from everyone, and let the best idea win.',
      },
      {
        term: 'Grit and perseverance',
        detail: 'we do hard things, especially when they get hard.',
      },
      {
        term: 'Bias to action',
        detail: 'we act decisively, and we value doing over endless planning.',
      },
    ] satisfies Pair[],
  },

  why: {
    label: 'Why this matters',
    body: 'Plenty of firms invest in small businesses. What makes us a different kind of partner is that we’ve lived this from every side — as investors, as close advisors, and inside a family business of our own — and we stay focused on a few industries we understand deeply. That perspective, plus focus, is how we earn the right to be a good steward of what you built.',
  },
} as const;

// ---------------------------------------------------------------------------
// Page 3 — What we do
// ---------------------------------------------------------------------------

/**
 * Region delta. The US list is v3's own bracketed list, pending the client's
 * confirmation of which industries to name publicly. The India list is the
 * sector list already published on the current live site, carried across
 * unchanged apart from sentence casing.
 */
export const industries: Record<Region, string[]> = {
  us: [
    'Electrical testing and field services',
    'Commercial insurance agencies',
    'Accounting and bookkeeping firms',
    'IT and managed services',
    'Route-based service businesses',
  ],
  india: [
    'Process and flow control',
    'Value-added distribution',
    'Industrial services',
    'Packaging and containers',
    'Facility and support services',
    'Testing and certification',
    'Infrastructure services',
    'Industrial technology',
  ],
};

export const whatWeDo = {
  headline: 'We partner with owners and invest in what they built.',

  opening:
    'Cruxway invests in and partners with owners of exceptional essential service businesses for the long term. We help them grow — while each business keeps its name, its team, and the way it runs, and gains the resources and support of something larger behind the scenes.',

  businesses: {
    label: 'The businesses we partner with',
    lead: 'We focus on essential service businesses — the steady, needed companies that keep other businesses, buildings, and communities running. We stay in a handful of industries we understand deeply rather than chasing everything, including:',
    after:
      'What matters most to us is the business and the people behind it: a good company, a fair owner, and a team worth backing.',
    coda: 'Essential businesses, exceptionally run.',
  },

  model: {
    label: 'How we partner',
    heading: 'Independent, together',
    body: [
      'We’re the opposite of a conglomerate — think of us as the un-conglomerate. We don’t fold the businesses we partner with into one machine, retire their names, or run them from a distance. Everything your customers and employees see and feel stays where it is — that’s where the value lives, and we don’t touch it.',
      'What changes is only the invisible weight: the back-office work — finance and accounting, HR, technology, banking, insurance — that we can carry and strengthen behind the scenes, so your team can spend its time on the work and the customers.',
    ],
    coda: 'Independent up front, stronger together behind the scenes.',
  },

  horizon: {
    label: 'We invest for the long term',
    body: 'We invest with a long-term horizon. There’s no clock forcing a sale — but we hold ourselves to one honest question: are we still the right stewards of this business? As long as the answer is yes, we keep building.',
  },

  growth: {
    label: 'We’re growth investors at heart',
    intro:
      'What excites us most is finding ways to help a business grow — and most of that has nothing to do with big spending. Growth comes from four places, and we look for it in all of them:',
    closing:
      'Most owners picture growth as buying equipment. It’s so much more than that — and some of the biggest gains are hiding in the business you already have.',
  },

  meaning: {
    label: 'What partnering with us means for you',
    points: [
      {
        term: 'A real partner',
        detail:
          'the people you talk to are the people who own the decision, and who pick up the phone.',
      },
      { term: 'Continuity', detail: 'your name, your team, and your customers stay.' },
      { term: 'Growth', detail: 'capital and support to build, not pressure to cut.' },
      { term: 'A home', detail: 'a long-term partner, invested in what comes next.' },
    ] satisfies Pair[],
  },

  cta: 'Start a conversation',
} as const;

/**
 * Region delta. v3 writes "every dollar"; the India site says "every rupee".
 * This is the only currency idiom in the copy and the only word that changes
 * between regions inside a sentence. Flagged for client sign-off.
 */
export const growthSources = (region: Region): Pair[] => [
  {
    term: 'Sell more',
    detail:
      'win new customers, open new markets or locations, and offer more of what your customers already want.',
  },
  {
    term: 'Earn more on what you sell',
    detail: `smarter pricing, healthier margins, and cutting the quiet waste, so more of every ${
      region === 'india' ? 'rupee' : 'dollar'
    } reaches the bottom line.`,
  },
  {
    term: 'Invest in the engine',
    detail:
      'the people, equipment, systems, and technology that let the business do more, and do it better.',
  },
  {
    term: 'Grow by addition',
    detail: 'bringing in complementary businesses when it makes the whole stronger.',
  },
];

// ---------------------------------------------------------------------------
// Page 4 — Contact
// ---------------------------------------------------------------------------

export const contactPage = {
  headline: 'Let’s have a conversation.',
  body: [
    'If you own a business and you’re thinking about what comes next — this year, or years from now — we’d welcome a conversation. There’s no pressure and nothing to sign. If we’re the right partner, we’ll show you what that could look like. If we’re not, we’ll tell you honestly — and whatever we talk through is yours to keep.',
    'If you’re an advisor, broker, or banker with a business that fits what we do, we’d welcome hearing from you too. We respond quickly, and we’ll tell you straight whether it’s a fit.',
  ],
  confidential: 'Everything you share with us stays confidential.',
  detailsLabel: 'Contact details',
} as const;

// ---------------------------------------------------------------------------
// Investor relations — v3's recommended option (c) for v1
// ---------------------------------------------------------------------------

export const investorRelations = {
  headline: 'Investor relations',
  body: 'For our investors and partners.',
  cta: 'Request access',
} as const;

// ---------------------------------------------------------------------------
// Region gate
// ---------------------------------------------------------------------------

export const gate = {
  prompt: 'Select region',
} as const;
