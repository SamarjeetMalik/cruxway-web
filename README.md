# Cruxway

Editorial marketing site. Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

---

## Where the words come from

**No copy on this site was written by the build.** Every string traces to one of
three client documents, and all of them live in `content/` — not inline in
components — so the site's text can be reviewed as a single diffable object.

| Content | Source |
|---|---|
| All page copy — hero, body, principles, growth model, contact | `Cruxway_Website_Copy_v3.docx`, verbatim |
| Partner credentials | `Cruxway_LP_Investor.pptx`, slides 3–4, verbatim |
| Emails, locations, LinkedIn URLs, legal entity | The previous cruxway site |
| India industry list | The previous cruxway site |

`content/copy.ts` is the authority. v3 joins a lead-in to its explanation with
an em dash (`Focused — A handful of…`); those halves are stored separately so
the lead-in can be styled, and re-joined at render exactly as v3 wrote them.

### Excluded on purpose

- **The six market statistics** on the previous site (`10M+`, `$10T+`, `70%+`,
  `63M+`, `<1%`, `$7T`). They carried no source citation anywhere in that
  codebase and v3 does not include them. Restoring them means attaching sources.
- **Everything else in the LP deck** — sector market data, India tailwinds, the
  Quanta / Quess / SIS / UDS case studies, and ~30 third-party company logos.
  The deck is stamped PRIVILEGED & CONFIDENTIAL and the logos are other
  companies' marks.
- **The Crux/Way naming story.** v3 records that the name idea was removed.

---

## Regions

`/us` and `/india` render from the same copy, because v3 is written without
reference to any geography. There are exactly five region-dependent values:

| # | What | Where |
|---|---|---|
| 1 | Contact email | `content/site.ts` |
| 2 | Location and map link | `content/site.ts` |
| 3 | Named industries | `content/copy.ts` → `industries` |
| 4 | Hero photography | `content/images.ts` |
| 5 | "every dollar" / "every rupee" | `content/copy.ts` → `growthSources()` |

Item 5 is the only word that changes inside a sentence. **Flagged for sign-off.**

Legacy URLs (`/{region}/focus`, `/playbook`, `/principles`, `/team`, and
`/investor-login`) are permanently redirected in `next.config.ts`.

---

## Open decisions

v3 flags six choices and leaves them to you. Defaults applied — each is a
one-line change in `content/`:

| Decision | Applied | File |
|---|---|---|
| "permanent" vs "long-term" home | **permanent** | `site.ts` → `orientation.descriptor` |
| Keep or cut the standing tagline | **kept** | `site.ts` → `orientation.tagline` |
| Which industries to name publicly | **v3's bracketed list** | `copy.ts` → `industries.us` |
| Optional revenue size range | **omitted** — v3 supplies no figures | — |
| Investor access | **v3's option (c)**, access on request | `app/investor-relations` |

### Needs your input before launch

1. **Confirm the named industries.** v3 asks this explicitly.
2. **Phone number** — currently `[ADD PHONE]` in the footer and on Contact, or
   confirm the site is email-only and I'll remove the field.
3. **Investor access** — the page routes to the two general addresses because no
   investor-specific address exists in any source. The gated portal is marked
   `[PENDING]`.
4. **Benson Zhang's portrait is 236×236** — a third the resolution of the other
   two, and the only image of him in any source. It is sized to hold at 144px,
   but a 1200px original would render properly on high-density displays.
5. **Benson Zhang's LinkedIn** — the other two partners link out; his is omitted
   rather than faked.
6. **A factual conflict to resolve:** the family hospitality business is
   "125+ locations" in the deck and "100+ locations" on the previous site. The
   deck's figure is used.
7. **Partner titles** — Managing Partner / Partner / Partner, India. The deck
   calls all three "Partner".
8. **"every dollar" → "every rupee"** on `/india` — confirm or revert.
9. **The six market statistics** — restore with sources, or leave out.

Anything unresolved renders as a visible `[ADD CONTENT]`-style marker
(`components/primitives/Typography.tsx` → `Placeholder`), styled so it can never
be mistaken for real information.

---

## Design system

Cruxway's own palette, taken from the LP deck. Five values, one accent.

```
ivory   #F7F5F0   ground          bone   #DCD6C8   rules, alternate surface
navy    #0A1F44   ink, dark bands bronze #B8945F   the only accent
slate   #5A5F6C   secondary text
```

Bronze is used only for hairlines, small-caps labels, and hover states — never
as a large fill. Two variants exist because one value cannot serve both grounds:
`bronze` (#B8945F) on navy, and `bronze.deep` (#89693D) wherever text sits on
ivory.

Measured contrast — every text pair clears WCAG AA, including the 11px labels:

| Pair | Ratio |
|---|---|
| navy on ivory | 14.91 |
| bone on navy | 12.37 |
| bronze on navy | 6.35 |
| slate on ivory | 5.86 |
| bronze.deep on ivory | 4.64 |

**Type:** EB Garamond (display) and Inter (everything else), both self-hosted at
build via `next/font`. Display sizes are fluid `clamp()`; the lower bound is the
mobile composition rather than a shrunken desktop one.

**Layout:** seven primitives in `components/primitives/` carry the whole site.
No component library — the site needs no dialogs, popovers, or form primitives,
and their absence is much of what keeps it from reading as a template.

---

## Motion and accessibility

Everything animated is scoped behind a `.js-motion` class on `<html>`, added by
a blocking script in `app/layout.tsx` **only** when JavaScript runs and the
visitor has not requested reduced motion.

The consequence is the important part: with JavaScript disabled, or motion
reduced, the resting state *is* the finished layout. Nothing is stranded at
`opacity: 0`. `MotionGate` keeps the class in sync afterwards, so toggling the
OS preference takes effect without a reload.

Also: semantic landmarks, one `<h1>` per page, a skip link, visible bronze focus
rings, and a mobile menu with a focus trap, Escape-to-close, and scroll lock.

## Images

All photography is the client's own, passed through `components/primitives/Figure.tsx`
so a single grade (`saturate(.72) contrast(1.02)`) applies everywhere — the
supplied set is warm and highly saturated, and the grade pulls it toward the
palette so it reads as one commission.

`hero-us-principles` is deliberately unused: its building frieze carries garbled
lettering that becomes legible as nonsense above roughly 600px.
