import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import type { Region } from '@/content/site';

/**
 * Chrome shared by both regional sites. The United States site lives at the
 * domain root and India under `/india`, so the region is fixed by the route
 * group rather than read from a URL segment.
 */
export function RegionShell({ region, children }: { region: Region; children: ReactNode }) {
  return (
    <>
      <SiteHeader region={region} />
      <main id="main">{children}</main>
      <SiteFooter region={region} />
    </>
  );
}
