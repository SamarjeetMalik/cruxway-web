/**
 * Builds the Open Graph card at `public/og.jpg` (1200x630).
 *
 * Generated once, locally, and committed — rather than rendered on demand.
 * A static export has no server to render it, and building it in CI would mean
 * shipping a webfont to the runner just to set two lines of type.
 *
 * The type is set in Georgia, which is the serif Cruxway's own deck uses and
 * the closest widely-installed stand-in for EB Garamond.
 *
 *   node scripts/build-og-image.mjs
 */
import path from 'node:path';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

const NAVY = '#071633';
const IVORY = '#F7F5F0';
const BONE = '#DCD6C8';
const BRONZE = '#B8945F';

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${NAVY}" stop-opacity="0.82"/>
      <stop offset="55%"  stop-color="${NAVY}" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#scrim)"/>

  <text x="80" y="132" font-family="Georgia, 'Times New Roman', serif"
        font-size="46" fill="${IVORY}" letter-spacing="-1">Cruxway</text>

  <rect x="80" y="168" width="56" height="2" fill="${BRONZE}"/>

  <text x="80" y="330" font-family="Georgia, 'Times New Roman', serif"
        font-size="64" fill="${IVORY}" letter-spacing="-1.6">
    <tspan x="80" dy="0">${escape('A permanent home for')}</tspan>
    <tspan x="80" dy="78">${escape('family- and founder-')}</tspan>
    <tspan x="80" dy="78">${escape('owned businesses.')}</tspan>
  </text>

  <text x="80" y="566" font-family="Helvetica, Arial, sans-serif"
        font-size="23" fill="${BONE}" fill-opacity="0.88">
    ${escape('Built and backed by founders and families.')}
  </text>
</svg>`;

const source = path.join(process.cwd(), 'public', 'images', 'photos', 'oak-at-sunrise.jpg');
const target = path.join(process.cwd(), 'public', 'og.jpg');

await sharp(source)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .modulate({ saturation: 0.7 })
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 86, progressive: true, mozjpeg: true })
  .toFile(target);

console.log(`wrote ${target}`);
