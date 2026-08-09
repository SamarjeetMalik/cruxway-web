import type { Metadata } from 'next';

import { HomePage } from '@/components/pages/HomePage';
import { orientation, regionNames } from '@/content/site';

export const metadata: Metadata = {
  title: orientation.descriptor,
  description: `${orientation.supporting} ${regionNames.india}.`,
  alternates: { canonical: '/india' },
};

export default function Page() {
  return <HomePage region="india" />;
}
