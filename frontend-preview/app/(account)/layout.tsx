import type { ReactNode } from 'react';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';
import { UserMenu } from '@/components/navigation/user-menu';

/** Authenticated user layout — Navbar + sidebar UserMenu. */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex-1 py-12">
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <aside><UserMenu /></aside>
          <div>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
