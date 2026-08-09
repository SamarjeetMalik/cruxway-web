import type { ElementType, ReactNode } from 'react';

const tones = {
  surface: 'bg-surface text-ink',
  alt: 'bg-surface-alt text-ink',
  deep: 'bg-surface-deep text-parchment',
} as const;

type SectionProps = {
  children: ReactNode;
  tone?: keyof typeof tones;
  /** Tighter vertical rhythm, for sections that continue a thought. */
  compact?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
  labelledBy?: string;
};

/**
 * The page's vertical rhythm and horizontal gutter. Padding is fluid rather
 * than stepped, so whitespace scales with the viewport instead of snapping at
 * breakpoints — the site should feel equally generous on a laptop and a wall.
 */
export function Section({
  children,
  tone = 'surface',
  compact = false,
  as: Tag = 'section',
  id,
  className = '',
  labelledBy,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} px-gutter ${compact ? 'py-section' : 'py-section-lg'} ${className}`}
    >
      <div className="mx-auto w-full max-w-shell">{children}</div>
    </Tag>
  );
}

/** The body-copy measure: roughly 62 characters, the comfortable reading width. */
export function Measure({
  children,
  wide = false,
  className = '',
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={`${wide ? 'max-w-measure-wide' : 'max-w-measure'} ${className}`}>{children}</div>
  );
}
