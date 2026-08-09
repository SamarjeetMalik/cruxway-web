import type { Metadata } from 'next';

import { Reveal } from '@/components/primitives/Reveal';
import { Measure, Section } from '@/components/primitives/Section';
import { Label, Placeholder, Rule } from '@/components/primitives/Typography';
import { Hero } from '@/components/sections/Hero';
import { contactPage } from '@/content/copy';
import { heroImages } from '@/content/images';
import { contact, type Region } from '@/content/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: Region }>;
}): Promise<Metadata> {
  const { region } = await params;
  return {
    title: 'Contact',
    description: contactPage.body[0],
    alternates: { canonical: `/${region}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ region: Region }> }) {
  const { region } = await params;
  const image = heroImages.contact[region];
  const details = contact[region];

  return (
    <>
      <Hero
        variant="interior"
        label="Contact"
        headline={contactPage.headline}
        image={image.src}
        imageAlt={image.alt}
      />

      <Section>
        <div className="grid gap-y-16 lg:grid-cols-[1.25fr_1fr] lg:gap-x-24">
          <Measure wide className="space-y-8">
            {contactPage.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 80}>
                <p className="text-lead text-ink">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <p className="font-serif text-subtitle text-ink">{contactPage.confidential}</p>
            </Reveal>
          </Measure>

          {/* Details are set as type, not boxed into cards. */}
          <Reveal delay={120}>
            <div>
              <Label as="h2">{contactPage.detailsLabel}</Label>
              <Rule accent className="mt-6" />

              <dl className="mt-10 space-y-9">
                <div>
                  <dt className="font-sans text-label uppercase text-ink-soft">Email</dt>
                  <dd className="mt-2.5">
                    <a
                      href={`mailto:${details.email}`}
                      className="link-draw font-serif text-subtitle text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                    >
                      {details.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="font-sans text-label uppercase text-ink-soft">Phone</dt>
                  <dd className="mt-2.5">
                    {details.phone ? (
                      <a
                        href={`tel:${details.phone.replace(/[^+\d]/g, '')}`}
                        className="link-draw font-serif text-subtitle text-ink"
                      >
                        {details.phone}
                      </a>
                    ) : (
                      <Placeholder label="ADD PHONE" />
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="font-sans text-label uppercase text-ink-soft">Location</dt>
                  <dd className="mt-2.5">
                    <a
                      href={details.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-draw font-serif text-subtitle text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                    >
                      {details.location}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
