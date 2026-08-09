import type { NextConfig } from 'next';

/**
 * Retired URLs and where they now point — JSON so that `next.config.ts` and
 * `scripts/emit-redirects.mjs` can read the same list and never drift. It
 * covers the old five-page-per-region layout folding into v3's four pages, the
 * United States site moving from `/us/*` to the domain root, and the
 * region-choosing page at `/` being removed.
 */
import legacyRedirects from './content/redirects.json';

/**
 * `GITHUB_PAGES=true` switches to a fully static export served from a
 * repository subpath. Everything else — local dev, and any Node host — keeps
 * the optimising image pipeline and real HTTP redirects, neither of which a
 * static file host can provide.
 */
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Read by `lib/assetPath.ts` — see the note there on why images need this.
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? basePath : '' },

  ...(isPages
    ? {
        output: 'export' as const,
        basePath,
        // Static hosts cannot run the image optimiser.
        images: { unoptimized: true },
        // Emits `/contact/index.html` rather than `/contact.html`.
        trailingSlash: true,
      }
    : {
        images: {
          formats: ['image/avif', 'image/webp'] as ('image/avif' | 'image/webp')[],
          deviceSizes: [640, 828, 1080, 1280, 1920, 2560],
          imageSizes: [200, 320, 420, 640],
        },
        async redirects() {
          return legacyRedirects.map(([source, destination]) => ({
            source,
            destination,
            permanent: true,
          }));
        },
      }),
};

export default nextConfig;
