import type { Pair } from '@/content/copy';
import { Reveal } from './Reveal';
import { TermDetail } from './Typography';

/**
 * The site's main structural device: a numbered editorial list. Rows are
 * separated by hairlines rather than boxed into cards, and the numeral sits in
 * its own column so the text block keeps a single clean left edge.
 *
 * On narrow viewports the numeral moves above the text rather than shrinking
 * the measure — the layout recomposes instead of scaling down.
 */
export function NumberedList({
  items,
  tone = 'default',
}: {
  items: readonly Pair[];
  tone?: 'default' | 'onDeep';
}) {
  const ruleColor = tone === 'onDeep' ? 'border-rule-deep/15' : 'border-rule';

  return (
    <ol className={`border-t ${ruleColor}`}>
      {items.map((item, index) => (
        <li key={item.term} className={`border-b ${ruleColor}`}>
          <Reveal delay={index * 60}>
            <div className="grid gap-x-10 gap-y-3 py-8 sm:grid-cols-[3.5rem_1fr] md:py-10">
              <span
                aria-hidden
                className={`font-serif text-numeral tabular-nums ${
                  tone === 'onDeep' ? 'text-accent-deep' : 'text-accent'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="max-w-measure-wide">
                <TermDetail term={item.term} detail={item.detail} tone={tone} />
              </div>
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
  const ruleColor = tone === 'onDeep' ? 'border-rule-deep/15' : 'border-rule';

  return (
    <ul className={`border-t ${ruleColor}`}>
      {items.map((item, index) => (
        <li key={item} className={`border-b ${ruleColor}`}>
          <Reveal delay={index * 45}>
            <p
              className={`py-5 font-serif text-subtitle ${
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
