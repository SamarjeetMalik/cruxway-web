import { NumberedList } from '@/components/primitives/NumberedList';
import { Reveal } from '@/components/primitives/Reveal';
import { Measure, Section } from '@/components/primitives/Section';
import { Label, Rule } from '@/components/primitives/Typography';
import { PageOpening } from '@/components/sections/Hero';
import { PartnerGrid } from '@/components/sections/PartnerGrid';
import { whoWeAre } from '@/content/copy';

export function WhoWeArePage() {
  const [opening, ...rest] = whoWeAre.opening;

  return (
    <>
      <PageOpening label="Who we are" headline={whoWeAre.headline} supporting={opening} />

      <Section compact>
        <Measure wide className="space-y-6">
          {rest.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-body text-ink-soft">{paragraph}</p>
            </Reveal>
          ))}
        </Measure>
      </Section>

      <Section tone="alt" labelledBy="people">
        <Reveal>
          <div className="mb-16">
            <Label as="h2" id="people">
              {whoWeAre.people.label}
            </Label>
            <Rule accent className="mt-6" />
          </div>
        </Reveal>
        <PartnerGrid />
      </Section>

      <Section labelledBy="involvement">
        <div className="grid gap-y-10 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <Label as="h2" id="involvement">
              {whoWeAre.involvement.label}
            </Label>
          </Reveal>
          <Reveal delay={90}>
            <Measure wide>
              <p className="text-lead text-ink">{whoWeAre.involvement.body}</p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep" labelledBy="beliefs">
        <div className="grid gap-y-10 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <div>
              <Label as="h2" id="beliefs" tone="onDeep">
                {whoWeAre.beliefs.label}
              </Label>
              <Rule accent tone="onDeep" className="mt-6" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Measure wide>
                <p className="text-body text-parchment-soft/85">{whoWeAre.beliefs.intro}</p>
              </Measure>
            </Reveal>
            <div className="mt-14">
              <NumberedList items={whoWeAre.beliefs.principles} tone="onDeep" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt" compact labelledBy="why">
        <div className="grid gap-y-10 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <Label as="h2" id="why">
              {whoWeAre.why.label}
            </Label>
          </Reveal>
          <Reveal delay={90}>
            <Measure wide>
              <p className="text-lead text-ink">{whoWeAre.why.body}</p>
            </Measure>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
