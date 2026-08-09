/**
 * Static-export companion to the `redirects()` block in `next.config.ts`.
 *
 * A file host cannot issue a 301, so each legacy URL gets a tiny stub page
 * that carries `rel=canonical` for crawlers and a meta refresh plus an
 * immediate `location.replace` for people. `replace` rather than `assign`, so
 * the stub does not trap the back button.
 *
 * Runs after `next build` when GITHUB_PAGES=true.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'out');
const basePath = process.env.PAGES_BASE_PATH ?? '';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');

const regions = ['us', 'india'];
const legacy = {
  focus: 'what-we-do',
  playbook: 'what-we-do',
  principles: 'who-we-are',
  team: 'who-we-are',
};

const targets = [
  ...regions.flatMap((region) =>
    Object.entries(legacy).map(([from, to]) => [`${region}/${from}`, `${region}/${to}`]),
  ),
  ['investor-login', 'investor-relations'],
];

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

for (const [from, to] of targets) {
  const dir = path.join(outDir, from);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), page(`/${to}/`), 'utf8');
  console.log(`/${from}/  ->  /${to}/`);
}
