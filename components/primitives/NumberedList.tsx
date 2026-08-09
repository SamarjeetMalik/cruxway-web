import type { Pair } from '@/content/copy';
import { Reveal } from './Reveal';
import { TermDetail } from './Typography';

/**
 * The site's main structural device: a numbered editorial list. Rows are
 * separated by hairlines rather than boxed into cards, and the numeral sits in
 * a fixed column so every row shares one text edge — the alignment the inline
 * em-dash version could never hold.
 *
 * The whole row responds to hover, not just the text, so the list reads as
 * something you can move through rather than a static block.
 */
export function NumberedList({
  items,
  tone = 'default',
}: {
  items: readonly Pair[];
  tone?: 'default' | 'onDeep';
}) {
  const ruleColour = tone === 'onDeep' ? 'border-parchment/15' : 'border-rule';
  const numeralColour = tone === 'onDeep' ? 'text-accent-deep' : 'text-accent';

  return (
    <ol className={`border-t ${ruleColour}`}>
      {items.map((item, index) => (
        <li key={item.term} className={`group border-b ${ruleColour}`}>
          <Reveal delay={index * 70}>
            <div className="grid grid-cols-[2.75rem_1fr] gap-x-6 py-9 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5 sm:grid-cols-[4.5rem_1fr] sm:gap-x-10 md:py-11">
              <span
                aria-hidden
                className={`font-serif text-numeral leading-none tabular-nums ${numeralColour} opacity-55 transition-opacity duration-500 ease-editorial group-hover:opacity-100`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <TermDetail term={item.term} detail={item.detail} tone={tone} />
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/**
 * The same rhythm without numerals — used where the items are a set rather
 * than a sequence, so numbering would imply an order that isn't there.
 */
export function PlainList({
  items,
  tone = 'default',
}: {
  items: readonly string[];
  tone?: 'default' | 'onDeep';
}) {
  const ruleColour = tone === 'onDeep' ? 'border-parchment/15' : 'border-rule';

  return (
    <ul className={`border-t ${ruleColour}`}>
      {items.map((item, index) => (
        <li key={item} className={`group border-b ${ruleColour}`}>
          <Reveal delay={index * 50}>
            <p
              className={`py-6 font-serif text-subtitle transition-transform duration-500 ease-editorial group-hover:translate-x-1.5 ${
                tone === 'onDeep' ? 'text-parchment' : 'text-ink'
              }`}
            >
              {item}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
