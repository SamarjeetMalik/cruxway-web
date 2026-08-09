import { ArrowLink } from '@/components/primitives/ArrowLink';
import { NumberedList, PlainList } from '@/components/primitives/NumberedList';
import { Reveal } from '@/components/primitives/Reveal';
import { Measure, Section } from '@/components/primitives/Section';
import { Label, Rule } from '@/components/primitives/Typography';
import { PageOpening } from '@/components/sections/Hero';
import { growthSources, industries, whatWeDo } from '@/content/copy';
import { regionHref, type Region } from '@/content/site';

export function WhatWeDoPage({ region }: { region: Region }) {
  return (
    <>
      <PageOpening
        label="What we do"
        headline={whatWeDo.headline}
        supporting={whatWeDo.opening}
      />

      <Section tone="alt" labelledBy="businesses">
        <div className="grid gap-y-12 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <div>
              <Label as="h2" id="businesses">
                {whatWeDo.businesses.label}
              </Label>
              <Rule accent className="mt-6" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Measure wide>
                <p className="text-body text-ink-soft">{whatWeDo.businesses.lead}</p>
              </Measure>
            </Reveal>

            <div className="mt-12">
              <PlainList items={industries[region]} />
            </div>

            <Reveal>
              <Measure wide className="mt-12">
                <p className="text-body text-ink-soft">{whatWeDo.businesses.after}</p>
                <p className="mt-8 font-serif text-title text-ink">{whatWeDo.businesses.coda}</p>
              </Measure>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The un-conglomerate idea — the single strongest composition on the site. */}
      <Section tone="deep" labelledBy="model">
        <Reveal>
          <Label tone="onDeep">{whatWeDo.model.label}</Label>
        </Reveal>

        <Reveal delay={70}>
          <h2 id="model" className="mt-8 max-w-[12ch] text-display text-parchment">
            {whatWeDo.model.heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-20 gap-y-8 lg:grid-cols-2">
          {whatWeDo.model.body.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 100}>
              <p className="text-body text-parchment-soft/85">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-20 max-w-[24ch] font-serif text-title text-accent-deep">
            {whatWeDo.model.coda}
          </p>
        </Reveal>
      </Section>

      <Section labelledBy="horizon" compact>
        <div className="grid gap-y-10 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <Label as="h2" id="horizon">
              {whatWeDo.horizon.label}
            </Label>
          </Reveal>
          <Reveal delay={90}>
            <Measure wide>
              <p className="text-lead text-ink">{whatWeDo.horizon.body}</p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" labelledBy="growth">
        <div className="grid gap-y-12 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <div>
              <Label as="h2" id="growth">
                {whatWeDo.growth.label}
              </Label>
              <Rule accent className="mt-6" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Measure wide>
                <p className="text-body text-ink-soft">{whatWeDo.growth.intro}</p>
              </Measure>
            </Reveal>

            <div className="mt-12">
              <NumberedList items={growthSources(region)} />
            </div>

            <Reveal>
              <Measure wide className="mt-12">
                <p className="text-body text-ink-soft">{whatWeDo.growth.closing}</p>
              </Measure>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="meaning">
        <div className="grid gap-y-12 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <div>
              <Label as="h2" id="meaning">
                {whatWeDo.meaning.label}
              </Label>
              <Rule accent className="mt-6" />
            </div>
          </Reveal>

          <div>
            <NumberedList items={whatWeDo.meaning.points} />
            <Reveal>
              <div className="mt-16">
                <ArrowLink href={regionHref(region, '/contact')}>{whatWeDo.cta}</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
