import type { Metadata } from 'next';

import { InvestorLogin } from '@/components/pages/InvestorLogin';
import { investorRelations } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Investor login',
  description: investorRelations.body,
  alternates: { canonical: '/investor-login' },
  // Nothing here should be indexed or followed into.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <InvestorLogin />;
}
