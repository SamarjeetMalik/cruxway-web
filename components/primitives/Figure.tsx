import Image from 'next/image';

import { assetPath } from '@/lib/assetPath';

type FigureProps = {
  src: string;
  /** Empty string marks the image as decorative; it is then hidden from AT. */
  alt: string;
  priority?: boolean;
  /** Applies the navy scrim — only for images carrying text on top. */
  scrim?: boolean;
  /**
   * `fill` images need a positioned ancestor. This is a prop rather than a
   * class passed in `className`, because `absolute` and the default `relative`
   * would both land in the class list and Tailwind's output order — not the
   * caller's intent — would decide the winner.
   */
  position?: 'relative' | 'absolute';
  className?: string;
  sizes?: string;
};

/**
 * All photography on the site passes through here, so the grade is applied
 * once and consistently. The supplied images are warm and saturated; the
 * grade pulls them toward the palette.
 */
export function Figure({
  src,
  alt,
  priority = false,
  scrim = false,
  position = 'relative',
  className = '',
  sizes = '100vw',
}: FigureProps) {
  const decorative = alt === '';

  return (
    <div
      className={`${position === 'absolute' ? 'absolute inset-0' : 'relative'} overflow-hidden bg-surface-deep ${
        scrim ? 'photo-scrim' : ''
      } ${className}`}
    >
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes}
        aria-hidden={decorative || undefined}
        className="photo-grade object-cover"
      />
    </div>
  );
}
