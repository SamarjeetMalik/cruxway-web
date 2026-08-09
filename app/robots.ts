import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

/** Required for `output: export`, which cannot evaluate this per-request. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/investor-login',
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
