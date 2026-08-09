import { notFound } from 'next/navigation';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { isRegion, REGIONS } from '@/content/site';

export function generateStaticParams() {
  return REGIONS.map((region) => ({ region }));
}

/** Anything outside /us and /india is a 404, not a silent redirect. */
export const dynamicParams = false;

export default async function RegionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  if (!isRegion(region)) notFound();

  return (
    <>
      <SiteHeader region={region} />
      <main id="main">{children}</main>
      <SiteFooter region={region} />
    </>
  );
}
