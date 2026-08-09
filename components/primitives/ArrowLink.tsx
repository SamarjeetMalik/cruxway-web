import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * The site's one call to action. A rule beneath the label, and an arrow that
 * steps forward on hover — no filled buttons anywhere, which is most of what
 * keeps the page from reading as a product landing page.
 */
export function ArrowLink({
  href,
  children,
  tone = 'default',
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: 'default' | 'onDeep';
  external?: boolean;
}) {
  const colour =
    tone === 'onDeep'
      ? 'text-parchment border-parchment/30 hover:border-parchment'
      : 'text-ink border-ink/25 hover:border-ink';

  const content = (
    <>
      <span className="font-sans text-label uppercase">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 24 12"
        className="h-2.5 w-6 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M0 6h22M17 1l5 5-5 5" />
      </svg>
    </>
  );

  const className = `group inline-flex items-center gap-4 border-b pb-2.5 transition-colors duration-500 ease-editorial ${colour}`;

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
