import { RegionShell } from '@/components/layout/RegionShell';

/**
 * Route group — the parentheses keep `(us)` out of the URL, so these pages are
 * served from the domain root: `/`, `/who-we-are`, `/what-we-do`, `/contact`.
 */
export default function UsLayout({ children }: { children: React.ReactNode }) {
  return <RegionShell region="us">{children}</RegionShell>;
}
