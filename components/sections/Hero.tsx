import { ArrowLink } from '@/components/primitives/ArrowLink';
import { Figure } from '@/components/primitives/Figure';
import { Label } from '@/components/primitives/Typography';

type HeroProps = {
  headline: string;
  supporting?: string;
  label?: string;
  cta?: { href: string; text: string };
  image: string;
  /** Empty string for decorative backdrops. */
  imageAlt: string;
  /** Full-height opening hero vs. the shorter interior-page variant. */
  variant?: 'opening' | 'interior';
};

/**
 * The page opening. Type sits on the photograph rather than beside it, and the
 * measure is capped well short of the image width so the headline reads as a
 * composed block rather than a banner caption.
 */
export function Hero({
  headline,
  supporting,
  label,
  cta,
  image,
  imageAlt,
  variant = 'opening',
}: HeroProps) {
  const isOpening = variant === 'opening';

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

      <div
        className={`mx-auto flex w-full max-w-shell flex-col px-gutter ${
          isOpening
            ? 'min-h-[clamp(34rem,88svh,58rem)] justify-end pb-[clamp(3.5rem,7vw,6rem)] pt-40'
            : 'min-h-[clamp(22rem,58svh,34rem)] justify-end pb-[clamp(3rem,5vw,4.5rem)] pt-32'
        }`}
      >
        {label && (
          <Label tone="onDeep" className="mb-7">
            {label}
          </Label>
        )}

        <h1 className={`max-w-[18ch] text-parchment ${isOpening ? 'text-display-xl' : 'text-display'}`}>
          {headline}
        </h1>

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
