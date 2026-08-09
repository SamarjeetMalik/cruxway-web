'use client';

import { useEffect } from 'react';

/**
 * Everything animated on the site is scoped behind an `.js-motion` class on
 * <html>, so the default — no JavaScript, or reduced motion — is the finished
 * static layout rather than content stranded at opacity 0.
 *
 * That class is added by a blocking script in `app/layout.tsx` so it lands
 * before first paint. This component only keeps it in sync afterwards, so
 * toggling the OS preference takes effect without a reload.
 */
export function MotionGate() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      document.documentElement.classList.toggle('js-motion', !query.matches);
    };

    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return null;
}
