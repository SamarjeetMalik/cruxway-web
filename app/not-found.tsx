import Link from 'next/link';

import { Label } from '@/components/primitives/Typography';

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh flex-col justify-center bg-surface px-gutter">
      <div className="mx-auto w-full max-w-shell">
        <Label>404</Label>
        <h1 className="mt-6 max-w-[16ch] text-display">This page isn’t here.</h1>
        <p className="mt-6 max-w-measure text-lead text-ink-soft">
          The page you’re looking for may have moved.
        </p>
        <Link
          href="/"
          className="link-draw mt-10 inline-block font-sans text-label uppercase text-ink"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
