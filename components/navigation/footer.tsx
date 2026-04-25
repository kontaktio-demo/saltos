import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerNav } from '@/config/navigation';

/** Site footer — TODO: newsletter, social icons, payment badges. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-bold text-white">{siteConfig.name}</div>
          <p className="mt-4 max-w-xs text-sm text-white/70">{siteConfig.description}</p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 font-semibold uppercase tracking-wide text-white">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container text-center text-xs text-white/60">
          © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
