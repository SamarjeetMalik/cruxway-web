'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ThemeToggle } from '@/components/primitives/ThemeToggle';
import {
  investorNav,
  nav,
  orientation,
  regionHref,
  REGIONS,
  regionNames,
  type Region,
} from '@/content/site';

export function SiteHeader({ region }: { region: Region }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  /**
   * Reading-progress hairline. Cheap enough to run on scroll directly, and
   * skipped entirely for visitors who asked for reduced motion, for whom a
   * bar that tracks the scrollbar is noise.
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // While open: lock scroll, close on Escape, and keep focus inside the panel.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const otherRegion = REGIONS.find((candidate) => candidate !== region)!;
  const homeHref = regionHref(region, '');

  return (
    // Solid, not translucent. A previous `bg-surface/92` was not a valid
    // Tailwind opacity step, so the class was dropped and the header had no
    // background at all — page content scrolled visibly underneath it.
    <header className="sticky top-0 z-40 border-b border-rule bg-surface">
      <div className="mx-auto flex h-[68px] w-full max-w-shell items-center justify-between gap-6 px-gutter md:h-[76px]">
        <div className="flex items-baseline gap-5">
          <Link
            href={homeHref}
            className="font-serif text-[1.6rem] leading-none tracking-[-0.03em] text-ink transition-colors duration-300 ease-editorial hover:text-accent md:text-[1.8rem]"
          >
            Cruxway
          </Link>
          <span aria-hidden className="hidden h-3.5 w-px bg-rule 2xl:block" />
          <p className="hidden whitespace-nowrap font-sans text-small text-ink-soft 2xl:block">
            {orientation.tagline}
          </p>
        </div>

        <div className="hidden items-center gap-7 lg:flex xl:gap-9">
          <nav aria-label="Primary" className="flex items-center gap-7 xl:gap-9">
            {nav.map((item) => {
              const href = regionHref(region, item.href);
              const active = pathname === href || pathname === `${href}/`;
              return (
                <Link
                  key={item.label}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`link-draw whitespace-nowrap font-sans text-label uppercase transition-colors duration-300 ease-editorial ${
                    active ? 'text-accent' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span aria-hidden className="h-3.5 w-px bg-rule" />

            <Link
              href={investorNav.href}
              className="link-draw whitespace-nowrap font-sans text-label uppercase text-ink-soft transition-colors duration-300 ease-editorial hover:text-ink"
            >
              {investorNav.label}
            </Link>

            <Link
              href={regionHref(otherRegion, '')}
              className="link-draw whitespace-nowrap font-sans text-label uppercase text-ink-soft transition-colors duration-300 ease-editorial hover:text-ink"
            >
              {regionNames[otherRegion]}
            </Link>
          </nav>

          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex items-center gap-3 p-2 font-sans text-label uppercase text-ink"
          >
            {open ? 'Close' : 'Menu'}
            <span aria-hidden className="flex h-3 w-5 flex-col justify-between">
              <span
                className={`h-px w-full bg-ink transition-transform duration-300 ease-editorial ${
                  open ? 'translate-y-[5.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-px w-full bg-ink transition-transform duration-300 ease-editorial ${
                  open ? '-translate-y-[5.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className="h-px origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-rule bg-surface px-gutter pb-16 pt-10 lg:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={regionHref(region, item.href)}
                className="border-b border-rule py-5 font-serif text-title text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={investorNav.href}
              className="border-b border-rule py-5 font-serif text-subtitle text-ink"
            >
              {investorNav.label}
            </Link>
            <Link
              href={regionHref(otherRegion, '')}
              className="py-5 font-sans text-label uppercase text-ink-soft"
            >
              Switch to {regionNames[otherRegion]}
            </Link>
          </nav>

          <p className="mt-10 max-w-measure font-sans text-small text-ink-soft">
            {orientation.tagline}
          </p>
        </div>
      )}
    </header>
  );
}
