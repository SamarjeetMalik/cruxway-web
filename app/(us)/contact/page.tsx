import type { Metadata } from 'next';

import { ContactPage } from '@/components/pages/ContactPage';
import { contactPage } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Contact',
  description: contactPage.body[0],
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactPage region="us" />;
}
