'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { ThemeToggle } from '@/components/primitives/ThemeToggle';
import { Label, Rule } from '@/components/primitives/Typography';
import { contact, legal } from '@/content/site';

/**
 * Investor portal sign-in, matching the previous site's behaviour.
 *
 * There is no authentication behind this yet, so the form deliberately does
 * nothing with what is typed: the values live in component state for the life
 * of the keystroke and are never stored, logged, or sent anywhere. Submitting
 * returns the same "not registered" notice the previous site returned, and
 * points at a real person.
 *
 * When a real portal exists, replace `handleSubmit` — nothing else needs to
 * change.
 */
export function InvestorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setNotice(null);

    // Brief pause so the response reads as considered rather than canned.
    window.setTimeout(() => {
      setPending(false);
      setPassword('');
      setNotice(
        'This account is not registered. Please contact your relationship manager for access.',
      );
    }, 700);
  };

  const field =
    'mt-2.5 w-full border-b border-parchment/25 bg-transparent pb-3 font-sans text-body text-parchment placeholder:text-parchment-soft/40 focus:border-accent-deep focus:outline-none';

  return (
    <main
      id="main"
      className="flex min-h-svh flex-col justify-between bg-surface-deep px-gutter py-10 text-parchment"
    >
      <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-[1.6rem] leading-none tracking-[-0.03em] transition-colors duration-300 ease-editorial hover:text-accent-deep"
        >
          Cruxway
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/" className="link-draw font-sans text-label uppercase text-parchment-soft/75">
            Back to site
          </Link>
          <ThemeToggle tone="onDeep" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[26rem] py-16">
        <Label tone="onDeep">Investor portal</Label>
        <h1 className="mt-6 text-display text-parchment">Sign in</h1>
        <Rule accent tone="onDeep" className="mt-8" />

        <form onSubmit={handleSubmit} className="mt-12" noValidate>
          <div>
            <label htmlFor="email" className="font-sans text-label uppercase text-parchment-soft/70">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@firm.com"
              className={field}
            />
          </div>

          <div className="mt-10">
            <label
              htmlFor="password"
              className="font-sans text-label uppercase text-parchment-soft/70"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••••"
              className={field}
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="group mt-12 inline-flex items-center gap-4 border-b border-parchment/30 pb-2.5 font-sans text-label uppercase text-parchment transition-colors duration-300 ease-editorial hover:border-parchment disabled:opacity-55"
          >
            {pending ? 'Verifying' : 'Sign in'}
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
          </button>

          {/* Announced to screen readers when it appears, not on every render. */}
          <p role="status" aria-live="polite" className="mt-8 min-h-[1.5rem] text-small text-accent-deep">
            {notice}
          </p>
        </form>

        <p className="mt-10 border-t border-parchment/15 pt-8 text-small text-parchment-soft/65">
          Access is restricted to registered investors. Contact your relationship manager for
          credentials, or write to{' '}
          <a
            href={`mailto:${contact.us.email}`}
            className="link-draw text-parchment transition-colors duration-300 ease-editorial hover:text-accent-deep"
          >
            {contact.us.email}
          </a>
          .
        </p>
      </div>

      <div className="mx-auto w-full max-w-shell">
        <p className="font-sans text-label uppercase text-parchment-soft/45">
          Privileged &amp; confidential
        </p>
        <p className="mt-4 max-w-measure-wide font-sans text-[0.8rem] leading-relaxed text-parchment-soft/45">
          {legal.smallPrint}
        </p>
      </div>
    </main>
  );
}
