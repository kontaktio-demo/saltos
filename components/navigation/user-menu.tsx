'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { accountNav } from '@/config/navigation';
import { cn } from '@/lib/utils/cn';

/** Sidebar navigation for the user account area. */
export function UserMenu() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {accountNav.map((item) => {
        const isActive = pathname === item.href;
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
  );
}
