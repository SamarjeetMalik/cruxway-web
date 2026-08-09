/**
 * One-off asset pass.
 *
 * The static GitHub Pages export cannot run Next's image optimiser, so the
 * files in `public/` are what visitors actually download. This re-encodes the
 * supplied photography at a sane quality and caps the portraits at the size
 * they are displayed, rather than shipping the originals untouched.
 *
 *   node scripts/compress-images.mjs
 */
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.join(process.cwd(), 'public', 'images');
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function reencode(dir, transform) {
  const files = await readdir(dir);
  for (const file of files) {
    if (file.endsWith('.tmp')) continue;
    const full = path.join(dir, file);
    const before = (await stat(full)).size;
    const tmp = `${full}.tmp`;

    await transform(sharp(full)).toFile(tmp);

    const after = (await stat(tmp)).size;
    if (after < before) {
      await unlink(full);
      await rename(tmp, full);
      console.log(`${file.padEnd(30)} ${kb(before)} -> ${kb(after)}`);
    } else {
      await unlink(tmp);
      console.log(`${file.padEnd(30)} ${kb(before)} (kept)`);
    }
  }
}

// Heroes are full-bleed, so they keep their width but drop to a sensible quality.
await reencode(path.join(root, 'photos'), (img) =>
  img.resize({ width: 1920, withoutEnlargement: true }).jpeg({
    quality: 74,
    progressive: true,
    mozjpeg: true,
  }),
);

// Portraits render at 144px; 576px covers a 4x display with room to spare.
await reencode(path.join(root, 'portraits'), (img) =>
  img.resize({ width: 576, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }),
);
