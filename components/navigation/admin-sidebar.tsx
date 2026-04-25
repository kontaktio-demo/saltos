'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/cn';

/** Admin panel sidebar navigation. */
export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-ink-muted p-6 md:block">
      <Link href="/admin" className="mb-8 block font-display text-xl font-bold text-brand">
        {siteConfig.name} · Admin
      </Link>
      <nav className="space-y-1">
        {adminNav.map((item) => {
          const isActive =
            item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block rounded-lg px-4 py-2 text-sm transition',
                isActive
                  ? 'bg-brand text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
