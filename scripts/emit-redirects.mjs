/**
 * Static-export companion to the `redirects()` block in `next.config.ts`.
 *
 * Both read `content/redirects.json`, so the two can never drift. A file host
 * cannot issue a 301, so each retired URL gets a stub page carrying
 * `rel=canonical` for crawlers and a meta refresh plus an immediate
 * `location.replace` for people — `replace` rather than `assign`, so the stub
 * does not trap the back button.
 *
 * Runs after `next build` when GITHUB_PAGES=true.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'out');
const basePath = process.env.PAGES_BASE_PATH ?? '';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '');

const redirects = JSON.parse(
  await readFile(path.join(process.cwd(), 'content', 'redirects.json'), 'utf8'),
);

const page = (destination) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting</title>
<link rel="canonical" href="${siteUrl}${destination}">
<meta http-equiv="refresh" content="0; url=${basePath}${destination}">
<meta name="robots" content="noindex">
</head>
<body>
<p>This page has moved to <a href="${basePath}${destination}">${destination}</a>.</p>
<script>location.replace(${JSON.stringify(basePath + destination)});</script>
</body>
</html>
`;

for (const [from, to] of redirects) {
  // Trailing slash to match `trailingSlash: true` output.
  const destination = to === '/' ? '/' : `${to}/`;
  const dir = path.join(outDir, from);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), page(destination), 'utf8');
  console.log(`${from}/  ->  ${destination}`);
}
