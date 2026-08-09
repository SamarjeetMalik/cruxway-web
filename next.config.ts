import type { NextConfig } from 'next';

const REGIONS = ['us', 'india'] as const;

/**
 * The previous site exposed five pages per region. The v3 structure folds
 * those into two, so every legacy URL is redirected rather than left to 404.
 */
const legacyPageMap: Record<string, string> = {
  focus: 'what-we-do',
  playbook: 'what-we-do',
  principles: 'who-we-are',
  team: 'who-we-are',
};

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
        // Emits `/us/index.html` rather than `/us.html`, which is what Pages serves.
        trailingSlash: true,
      }
    : {
        images: {
          formats: ['image/avif', 'image/webp'] as ('image/avif' | 'image/webp')[],
          deviceSizes: [640, 828, 1080, 1280, 1920, 2560],
          imageSizes: [200, 320, 420, 640],
        },
        async redirects() {
          const regionRedirects = REGIONS.flatMap((region) =>
            Object.entries(legacyPageMap).map(([from, to]) => ({
              source: `/${region}/${from}`,
              destination: `/${region}/${to}`,
              permanent: true,
            })),
          );

          return [
            ...regionRedirects,
            {
              source: '/investor-login',
              destination: '/investor-relations',
              permanent: true,
            },
          ];
        },
      }),
};

export default nextConfig;
