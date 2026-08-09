import { ArrowLink } from '@/components/primitives/ArrowLink';
import { Figure } from '@/components/primitives/Figure';
import { Reveal } from '@/components/primitives/Reveal';
import { Label, Rule } from '@/components/primitives/Typography';

type HeroProps = {
  headline: string;
  supporting?: string;
  label?: string;
  cta?: { href: string; text: string };
  image: string;
  /** Empty string for decorative backdrops. */
  imageAlt: string;
};

/**
 * The one photographic opening on the site. It is used on the homepage only,
 * where the picture actually says something: a rooted, sheltering tree under
 * the headline "A permanent home". Interior pages use `PageOpening` below.
 */
export function Hero({ headline, supporting, label, cta, image, imageAlt }: HeroProps) {
  return (
    <section className="relative isolate flex flex-col justify-end overflow-hidden bg-surface-deep text-parchment">
      <Figure
        src={image}
        alt={imageAlt}
        priority
        scrim
        position="absolute"
        sizes="100vw"
        className="-z-10"
      />

      <div className="mx-auto flex min-h-[clamp(34rem,88svh,58rem)] w-full max-w-shell flex-col justify-end px-gutter pb-[clamp(3.5rem,7vw,6rem)] pt-40">
        {label && (
          <Label tone="onDeep" className="mb-7">
            {label}
          </Label>
        )}

        <h1 className="max-w-[17ch] text-display-xl text-parchment">{headline}</h1>

        {supporting && (
          <p className="mt-8 max-w-measure-wide text-lead text-parchment-soft/90">{supporting}</p>
        )}

        {cta && (
          <div className="mt-12">
            <ArrowLink href={cta.href} tone="onDeep">
              {cta.text}
            </ArrowLink>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Interior-page opening: type on the page ground, no photograph.
 *
 * The earlier version put a stock-feeling image behind every page heading — a
 * boardroom above "Who we are", a skyline above "Contact" — which was
 * decoration standing in for meaning. Removing it is what lets the headline
 * be the largest thing on the page, and it is how the reference sites open
 * their interior pages too.
 */
export function PageOpening({
  label,
  headline,
  supporting,
}: {
  label: string;
  headline: string;
  supporting?: string;
}) {
  return (
    <section className="bg-surface px-gutter pb-section pt-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-shell">
        <Reveal>
          <Label as="p">{label}</Label>
          <Rule accent className="mt-6" />
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-10 max-w-[15ch] text-display">{headline}</h1>
        </Reveal>

        {supporting && (
          <Reveal delay={150}>
            <p className="mt-8 max-w-measure-wide text-lead text-ink-soft">{supporting}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
