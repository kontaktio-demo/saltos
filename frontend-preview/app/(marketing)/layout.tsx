import type { ReactNode } from 'react';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';

/** Public marketing layout — Navbar + page content + Footer. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
