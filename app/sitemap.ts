import type { MetadataRoute } from 'next';

import { nav, regionHref, REGIONS, site } from '@/content/site';

/** Required for `output: export`, which cannot evaluate this per-request. */
export const dynamic = 'force-static';

/**
 * The eight public pages. `/investor-login` is deliberately absent — it is
 * marked noindex, so listing it would contradict its own robots directive.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return REGIONS.flatMap((region) =>
    nav.map((item) => {
      const path = regionHref(region, item.href);
      return {
        url: path === '/' ? site.url : `${site.url}${path}`,
        changeFrequency: 'yearly' as const,
        priority: item.href === '' ? (region === 'us' ? 1 : 0.9) : 0.7,
      };
    }),
  );
}
