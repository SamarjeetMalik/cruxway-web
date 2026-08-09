import type { Metadata } from 'next';

import { WhoWeArePage } from '@/components/pages/WhoWeArePage';
import { whoWeAre } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Who we are',
  description: whoWeAre.opening[0],
  alternates: { canonical: '/who-we-are' },
};

export default function Page() {
  return <WhoWeArePage />;
}
