/**
 * Prefixes a `public/` path with the deployment's base path.
 *
 * Next applies `basePath` automatically to `<Link>` hrefs and to its own
 * `_next/` assets, and normally to `next/image` too — but not when the image
 * optimiser is disabled, as it must be for a static export. Those `src` values
 * come through verbatim, so on a project site served from `/<repo>` every
 * photograph would 404. This puts the prefix back.
 *
 * The value is inlined at build time via `env` in `next.config.ts`, and is an
 * empty string for root-served deployments.
 */
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const assetPath = (path: string): string =>
  path.startsWith('/') ? `${prefix}${path}` : path;
