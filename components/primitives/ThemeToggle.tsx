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
    tone === 'onDeep' ? 'text-parchment-soft hover:text-parchment' : 'text-ink-soft hover:text-ink';

  return (
    <button
      type="button"
      onClick={toggle}
      // Rendered before the theme is known, so the label stays generic until then.
      aria-label={theme ? `Switch to ${theme === 'dark' ? 'day' : 'night'} theme` : 'Switch theme'}
      className={`inline-flex h-9 w-9 items-center justify-center transition-colors duration-500 ease-editorial ${colour}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      >
        {theme === 'dark' ? (
          // Sun — offers a return to day.
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.4v2.3M12 19.3v2.3M4.2 12H1.9M22.1 12h-2.3M6.5 6.5 4.9 4.9M19.1 19.1l-1.6-1.6M17.5 6.5l1.6-1.6M4.9 19.1l1.6-1.6" />
          </>
        ) : (
          // Moon — offers night.
          <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
        )}
      </svg>
    </button>
  );
}
