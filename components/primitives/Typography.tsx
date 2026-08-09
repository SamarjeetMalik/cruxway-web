import type { ReactNode } from 'react';

/**
 * The small tracked eyebrow that names a section. Sans, uppercase, wide
 * letter-spacing — the counterweight that lets the serif display sizes sit as
 * large as they do without the page feeling shouty.
 */
export function Label({
  children,
  tone = 'accent',
  className = '',
  id,
  as: Tag = 'p',
}: {
  children: ReactNode;
  /** `onDeep` for labels sitting on a full-bleed dark band. */
  tone?: 'accent' | 'onDeep' | 'soft';
  className?: string;
  id?: string;
  /**
   * Section eyebrows are the only headings those sections have, so they render
   * as `h2` to give the page a real outline. The utility classes below beat the
   * base `h1,h2,h3` rule, so the visual result is identical either way.
   */
  as?: 'p' | 'h2';
}) {
  const tones = {
    accent: 'text-accent',
    onDeep: 'text-accent-deep',
    soft: 'text-ink-soft',
  } as const;

  return (
    <Tag
      id={id}
      className={`font-sans text-label font-medium uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** A hairline. `accent` draws it in bronze at a short fixed width. */
export function Rule({
  accent = false,
  tone = 'default',
  className = '',
}: {
  accent?: boolean;
  tone?: 'default' | 'onDeep';
  className?: string;
}) {
  if (accent) {
    return (
      <hr
        aria-hidden
        className={`h-px w-14 border-0 ${tone === 'onDeep' ? 'bg-accent-deep' : 'bg-accent'} ${className}`}
      />
    );
  }

  return (
    <hr
      aria-hidden
      className={`h-px border-0 ${tone === 'onDeep' ? 'bg-rule-deep/15' : 'bg-rule'} ${className}`}
    />
  );
}

/**
 * A gap in the source content, rendered so it can never be mistaken for real
 * information: bracketed, in a different face and colour from its neighbours,
 * and announced to screen readers as pending.
 */
export function Placeholder({ label = 'ADD CONTENT' }: { label?: string }) {
  return (
    <span
      role="note"
      aria-label={`Pending content: ${label}`}
      className="inline-block border border-dashed border-accent-deep/60 px-2 py-0.5 font-sans text-[0.7rem] uppercase tracking-[0.14em] text-accent-deep"
    >
      [{label}]
    </span>
  );
}

/**
 * v3 writes these as "lead-in — explanation" on one line. Set inline, the em
 * dash lands at a different place in every row and the two halves fight over
 * size, which read as sloppy. Stacking them drops the dash, gives every row a
 * single shared baseline, and lets the term and the explanation each keep one
 * consistent size. The wording is untouched.
 */
export function TermDetail({
  term,
  detail,
  tone = 'default',
}: {
  term: string;
  detail: string;
  tone?: 'default' | 'onDeep';
}) {
  return (
    <div>
      <h3
        className={`font-serif text-subtitle ${tone === 'onDeep' ? 'text-parchment' : 'text-ink'}`}
      >
        {term}
      </h3>
      <p
        className={`mt-3 max-w-measure text-body ${
          tone === 'onDeep' ? 'text-parchment-soft/80' : 'text-ink-soft'
        }`}
      >
        {/* The explanation follows an em dash in the source, so it begins
            lower-case; as its own sentence it takes a capital. */}
        {detail.charAt(0).toUpperCase() + detail.slice(1)}
      </p>
    </div>
  );
}
