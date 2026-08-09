import Image from 'next/image';

import { Reveal } from '@/components/primitives/Reveal';
import { people } from '@/content/people';
import { assetPath } from '@/lib/assetPath';

/**
 * The three partners, given equal weight — v3 asks explicitly that they "read
 * as equals", so each column carries the same portrait size, the same heading
 * level, and the same number of credential lines.
 *
 * Portraits are kept small and set on the page ground rather than in cards.
 * The supplied images are cut-outs on a light field, so they sit directly on
 * the ivory without a visible frame.
 */
export function PartnerGrid() {
  return (
    <ul className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {people.map((person, index) => (
        <li key={person.name}>
          <Reveal delay={index * 90}>
            <article>
              <div className="relative h-36 w-36 overflow-hidden rounded-full bg-surface-alt ring-1 ring-rule">
                <Image
                  src={assetPath(person.portrait)}
                  alt={person.portraitAlt}
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </div>

              <h3 className="mt-8 text-subtitle">{person.name}</h3>
              <p className="mt-1.5 font-sans text-label uppercase text-accent">{person.role}</p>

              <ul className="mt-7 space-y-4 border-t border-rule pt-7">
                {person.credentials.map((credential) => (
                  <li key={credential} className="text-small text-ink-soft">
                    {credential}
                  </li>
                ))}
              </ul>

              {person.linkedIn && (
                <a
                  href={person.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw mt-7 inline-block font-sans text-label uppercase text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                >
                  LinkedIn
                  <span className="sr-only"> — {person.name}, opens in a new tab</span>
                </a>
              )}
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
