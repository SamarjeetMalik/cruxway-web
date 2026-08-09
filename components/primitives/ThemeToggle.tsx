'use client';

import { useEffect, useState } from 'react';

export const THEME_KEY = 'cruxway-theme';

type Theme = 'light' | 'dark';

/**
 * Day / night switch.
 *
 * The theme defaults to the visitor's operating-system preference and is only
 * pinned once they choose explicitly — so someone who has never touched it
 * keeps following their system as it changes through the day. The choice is
 * stored under `cruxway-theme`; the blocking script in `app/layout.tsx` reads
 * the same key before first paint so there is no flash of the wrong theme.
 *
 * The control is a bordered disc rather than a bare glyph: an 18px hairline
 * icon floating on its own was too easy to lose against the page.
 */
export function ThemeToggle({ tone = 'default' }: { tone?: 'default' | 'onDeep' }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

    // Keep following the system until the visitor makes an explicit choice.
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      const next: Theme = event.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTheme(next);
    };

    query.addEventListener('change', onSystemChange);
    return () => query.removeEventListener('change', onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private browsing can refuse storage; the theme still applies for this visit.
    }
    setTheme(next);
  };

  const colour =
    tone === 'onDeep'
      ? 'border-parchment/30 text-parchment hover:border-parchment hover:bg-parchment/10'
      : 'border-rule text-ink hover:border-accent hover:text-accent';

  return (
    <button
      type="button"
      onClick={toggle}
      // Rendered before the theme is known, so the label stays generic until then.
      aria-label={theme ? `Switch to ${theme === 'dark' ? 'day' : 'night'} theme` : 'Switch theme'}
      title={theme === 'dark' ? 'Day' : 'Night'}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ease-editorial ${colour}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {theme === 'dark' ? (
          // Sun — offers a return to day.
          <>
            <circle cx="12" cy="12" r="4.1" />
            <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
          </>
        ) : (
          // Moon — offers night.
          <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
        )}
      </svg>
    </button>
  );
}
