import type { ReactNode } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

/** Minimal centered layout for login / register / reset. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center font-display text-3xl font-bold text-brand">
          {siteConfig.name}
        </Link>
        <div className="rounded-2xl bg-ink-muted p-8 shadow-2xl">{children}</div>
      </div>
    </div>
  );
}
