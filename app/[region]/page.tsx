import type { Metadata } from 'next';

import { NumberedList } from '@/components/primitives/NumberedList';
import { Reveal } from '@/components/primitives/Reveal';
import { Measure, Section } from '@/components/primitives/Section';
import { Label, Rule } from '@/components/primitives/Typography';
import { Hero } from '@/components/sections/Hero';
import { home } from '@/content/copy';
import { heroImages } from '@/content/images';
import { orientation, regionNames, type Region } from '@/content/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: Region }>;
}): Promise<Metadata> {
  const { region } = await params;
  return {
    title: orientation.descriptor,
    description: `${orientation.supporting} ${regionNames[region]}.`,
    alternates: { canonical: `/${region}` },
  };
}

export default async function HomePage({ params }: { params: Promise<{ region: Region }> }) {
  const { region } = await params;
  const image = heroImages.home[region];

  return (
    <>
      <Hero
        headline={home.hero.headline}
        supporting={home.hero.supporting}
        cta={{ href: `/${region}/contact`, text: home.hero.cta }}
        image={image.src}
        imageAlt={image.alt}
      />

      {/* Who we are, in a few lines — one paragraph, given the room to be read. */}
      <Section labelledBy="home-intro">
        <div className="grid gap-y-10 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <Label as="h2" id="home-intro">
              {home.intro.label}
            </Label>
          </Reveal>
          <Reveal delay={80}>
            <Measure wide>
              <p className="text-lead text-ink">{home.intro.body}</p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep" labelledBy="home-different">
        <div className="grid gap-y-10 lg:grid-cols-[14rem_1fr] lg:gap-x-20">
          <Reveal>
            <div>
              <Label as="h2" id="home-different" tone="onDeep">
                {home.different.label}
              </Label>
              <Rule accent tone="onDeep" className="mt-6" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Measure wide>
                <p className="font-serif text-subtitle text-parchment">{home.different.intro}</p>
              </Measure>
            </Reveal>
            <div className="mt-14">
              <NumberedList items={home.different.points} tone="onDeep" />
            </div>
          </div>
        </div>
      </Section>

      {/* The closing line, set as the largest type on the page after the hero. */}
      <Section tone="alt" compact>
        <Reveal>
          <Measure wide className="mx-auto text-center">
            <p className="font-serif text-title text-ink">{home.closing}</p>
          </Measure>
        </Reveal>
      </Section>
    </>
  );
}
