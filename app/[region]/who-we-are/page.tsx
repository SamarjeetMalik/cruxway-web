import type { Metadata } from 'next';

import { NumberedList } from '@/components/primitives/NumberedList';
import { Reveal } from '@/components/primitives/Reveal';
import { Measure, Section } from '@/components/primitives/Section';
import { Label, Rule } from '@/components/primitives/Typography';
import { Hero } from '@/components/sections/Hero';
import { PartnerGrid } from '@/components/sections/PartnerGrid';
import { whoWeAre } from '@/content/copy';
import { heroImages } from '@/content/images';
import type { Region } from '@/content/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: Region }>;
}): Promise<Metadata> {
  const { region } = await params;
  return {
    title: 'Who we are',
    description: whoWeAre.opening[0],
    alternates: { canonical: `/${region}/who-we-are` },
  };
}

export default async function WhoWeArePage({ params }: { params: Promise<{ region: Region }> }) {
  const { region } = await params;
  const image = heroImages.whoWeAre[region];

  return (
    <>
      <Hero
        variant="interior"
        label="Who we are"
        headline={whoWeAre.headline}
        image={image.src}
        imageAlt={image.alt}
      />

      <Section>
        <Measure wide className="space-y-8">
          {whoWeAre.opening.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 80}>
              <p className="text-lead text-ink">{paragraph}</p>
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
          <Reveal delay={80}>
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
                <p className="font-serif text-subtitle text-parchment">{whoWeAre.beliefs.intro}</p>
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
          <Reveal delay={80}>
            <Measure wide>
              <p className="text-lead text-ink">{whoWeAre.why.body}</p>
            </Measure>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
