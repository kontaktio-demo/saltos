import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { mainNav } from '@/config/navigation';
import { SaltosLogo } from '@/components/ui/saltos-logo';

/**
 * Główna nawigacja parku — układ inspirowany saltos.pl Srebrzyńska:
 * pomarańczowe tło, biały logotyp z heksagonem, lowercase linki, biały button "ważne".
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-brand text-white shadow-sm">
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Logo + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-90"
          aria-label={`${siteConfig.name} – strona główna`}
        >
          <SaltosLogo className="h-10 w-10 text-white" />
          <span className="font-display text-2xl font-extrabold tracking-wide">
            SALTOS
          </span>
        </Link>

        {/* Główne linki — desktop */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Główna nawigacja"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide text-white/95 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA „ważne" — link do regulaminu / zasad */}
        <Link
          href="/faq"
          className="rounded-full border-2 border-white px-6 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand"
        >
          ważne
        </Link>
      </div>
    </header>
  );
}
