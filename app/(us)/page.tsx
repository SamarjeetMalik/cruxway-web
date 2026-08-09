import type { Metadata } from 'next';

import { HomePage } from '@/components/pages/HomePage';
import { orientation } from '@/content/site';

export const metadata: Metadata = {
  title: orientation.descriptor,
  description: orientation.supporting,
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomePage region="us" />;
}
