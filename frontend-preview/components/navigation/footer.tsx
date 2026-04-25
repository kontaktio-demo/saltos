import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerNav } from '@/config/navigation';
import { SaltosLogo } from '@/components/ui/saltos-logo';

/**
 * Footer + pasek kontaktowy w granacie (jak na saltos.pl Srebrzyńska):
 *  - Pasek na samej górze: nazwa parku, adres, godziny, e-mail, telefon, CTA rejestracja + kup bilet
 *  - Główny footer z linkami i social
 */
export function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Pasek kontaktowy (górna część footera) */}
      <div className="border-b border-white/10">
        <div className="container grid items-center gap-6 py-6 lg:grid-cols-6 lg:gap-4">
          <div className="lg:col-span-2">
            <p className="font-display text-base font-bold uppercase tracking-wide">
              SALTOS Srebrzyńska <span className="text-brand">POLESIE</span>
            </p>
          </div>
          <div className="text-sm text-white/85">
            <p className="font-medium">{siteConfig.contact.address.street}</p>
            <p>
              {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
            </p>
          </div>
          <div className="text-sm text-white/85">
            <p>{siteConfig.contact.hours.weekdays}</p>
            <p>{siteConfig.contact.hours.weekend}</p>
          </div>
          <div className="text-sm text-white/85">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block font-medium hover:text-white"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="hover:text-white"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
          <div className="flex gap-3 lg:justify-end">
            <Link
              href="/rejestracja"
              className="rounded-full border-2 border-white px-5 py-2 text-sm font-bold uppercase tracking-wide transition hover:bg-white hover:text-ink"
            >
              rejestracja
            </Link>
            <Link
              href="/rezerwacje"
              className="rounded-full bg-brand px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
            >
              kup bilet
            </Link>
          </div>
        </div>
      </div>

      {/* Główny footer */}
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <SaltosLogo className="h-9 w-9 text-white" />
            <span className="font-display text-xl font-bold tracking-wide">
              SALTOS
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex gap-3">
            {Object.entries(siteConfig.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/70 capitalize hover:text-brand"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 font-semibold uppercase tracking-wide text-white">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-2 text-center text-xs text-white/60 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.
          </p>
          <p>Zaprojektowane z myślą o bezpieczeństwie i dobrej zabawie 🤸</p>
        </div>
      </div>
    </footer>
  );
}
