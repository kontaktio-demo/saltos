import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { mainNav } from '@/config/navigation';

/** Top navigation bar — TODO: add scroll behavior, mobile menu, animations. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-brand/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-white">
          {siteConfig.name}
        </Link>
        <nav className="hidden gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/rezerwacje"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-muted"
        >
          Kup bilet
        </Link>
      </div>
    </header>
  );
}
