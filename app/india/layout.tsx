import { RegionShell } from '@/components/layout/RegionShell';

export default function IndiaLayout({ children }: { children: React.ReactNode }) {
  return <RegionShell region="india">{children}</RegionShell>;
}
