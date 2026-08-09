'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Milliseconds. Used to stagger siblings; keep under ~240ms total. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * The site's only motion primitive: a short fade and rise as an element
 * enters the viewport, once.
 *
 * The hidden state lives behind a `.js-motion` class that a blocking script in
 * `app/layout.tsx` adds only when JavaScript runs and the visitor has not
 * requested reduced motion. With JS off, or motion reduced, content renders in
 * its final position and this component is inert.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The gate is absent when motion is off — leave the element untouched.
    if (!document.documentElement.classList.contains('js-motion')) return;

    const show = () => {
      node.dataset.reveal = 'shown';
    };

    // Anything already on screen at mount is shown synchronously. Without this
    // it would wait on IntersectionObserver, whose callbacks are throttled
    // while a tab is in the background — so a page opened in a background tab,
    // or restored from bfcache, could sit with its content still hidden.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
