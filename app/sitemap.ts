import type { MetadataRoute } from 'next';

import { nav, REGIONS, site } from '@/content/site';

/** Required for `output: export`, which cannot evaluate this per-request. */
export const dynamic = 'force-static';

/**
 * The nine public routes. `/investor-relations` is deliberately absent — it is
 * marked noindex, so listing it would contradict its own robots directive.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = REGIONS.flatMap((region) =>
    nav.map((item) => ({
      url: `${site.url}/${region}${item.href}`,
      changeFrequency: 'yearly' as const,
      priority: item.href === '' ? 0.9 : 0.7,
    })),
  );

  return [
    { url: site.url, changeFrequency: 'yearly', priority: 1 },
    ...pages,
  ];
}
