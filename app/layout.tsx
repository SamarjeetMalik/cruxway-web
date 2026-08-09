import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';

import { MotionGate } from '@/components/primitives/MotionGate';
import { contact, legal, orientation, site } from '@/content/site';

import './globals.css';

const garamond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-garamond',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${orientation.descriptor}`,
    template: `%s — ${site.name}`,
  },
  // v3's own orientation lines, not a marketing claim.
  description: `${orientation.descriptor} ${orientation.supporting}`,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${orientation.descriptor}`,
    description: `${orientation.descriptor} ${orientation.supporting}`,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

/**
 * Runs before first paint, so neither the theme nor the reveal styles can
 * flash the wrong state:
 *
 *  - `dark` follows an explicit stored choice, else the OS preference.
 *  - `js-motion` is added only when JS runs AND reduced motion is not
 *    requested; every animation is scoped behind it, so the no-JS and
 *    reduced-motion default is the finished, static layout.
 */
const bootstrapScript = `try{
var s=localStorage.getItem("cruxway-theme");
var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
if(d)document.documentElement.classList.add("dark");
if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js-motion");
}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: legal.entity,
    alternateName: site.name,
    url: site.url,
    description: orientation.descriptor,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: contact.us.email,
        areaServed: 'US',
        contactType: 'business enquiries',
      },
      {
        '@type': 'ContactPoint',
        email: contact.india.email,
        areaServed: 'IN',
        contactType: 'business enquiries',
      },
    ],
  };

  return (
    // The bootstrap script mutates <html> before hydration, which React would
    // otherwise report as a mismatch.
    <html
      lang="en"
      className={`${garamond.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <MotionGate />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:font-sans focus:text-label focus:uppercase focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
