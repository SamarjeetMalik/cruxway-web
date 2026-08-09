import type { Metadata } from 'next';

import { WhatWeDoPage } from '@/components/pages/WhatWeDoPage';
import { whatWeDo } from '@/content/copy';

export const metadata: Metadata = {
  title: 'What we do',
  description: whatWeDo.opening,
  alternates: { canonical: '/india/what-we-do' },
};

export default function Page() {
  return <WhatWeDoPage region="india" />;
}
