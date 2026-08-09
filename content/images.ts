import type { Region } from './site';

/**
 * Photography, all of it the client's own.
 *
 * Two files are renamed from the previous repo, where the names described the
 * wrong pictures: `hero-forking-road` is a lone oak at sunrise, and the actual
 * fork in the road was filed as `cruxway-merge-v4`.
 *
 * The oak opens both region homepages — a rooted, sheltering tree under the
 * headline "A permanent home" — and the fork opens the region gate, where the
 * page genuinely is a choice between two ways. Neither carries rendered
 * signage. Interior pages take region-specific photography so the two sites
 * read as places rather than duplicates.
 *
 * Deliberately unused: `hero-us-principles`, whose building frieze carries
 * garbled lettering that becomes legible as nonsense above roughly 600px.
 *
 * Alt text is empty for backdrops that carry a headline — the heading already
 * conveys the meaning, and describing decorative scenery only adds noise for
 * screen-reader users.
 */

type PageImage = { src: string; alt: string };

/**
 * Sources are the 1920px JPG originals rather than the previous site's WebP
 * conversions, which had been downscaled to 1080px. Next re-encodes to AVIF and
 * WebP at the widths the layout actually requests, so the larger source costs
 * visitors nothing and keeps full-bleed heroes sharp on wide displays.
 */
const photo = (name: string): string => `/images/photos/${name}.jpg`;

export const heroImages: Record<string, Record<Region, PageImage>> = {
  home: {
    us: { src: photo('oak-at-sunrise'), alt: '' },
    india: { src: photo('oak-at-sunrise'), alt: '' },
  },
  whoWeAre: {
    us: { src: photo('hero-us-playbook'), alt: '' },
    india: { src: photo('hero-india-playbook'), alt: '' },
  },
  whatWeDo: {
    us: { src: photo('hero-us-criteria'), alt: '' },
    india: { src: photo('hero-india-criteria'), alt: '' },
  },
  contact: {
    us: { src: photo('hero-us-contact'), alt: '' },
    india: { src: photo('hero-india-contact'), alt: '' },
  },
};

/** The region gate: a fork in the road, under a choice of two regions. */
export const gateImage: PageImage = { src: photo('fork-in-the-road'), alt: '' };

export const investorImage: PageImage = { src: photo('hero-us-home'), alt: '' };
