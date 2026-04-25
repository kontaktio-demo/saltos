import Link from 'next/link';
import { siteConfig } from '@/config/site';

/**
 * Sekcja HERO strony głównej — duże pomarańczowe tło (jak na saltos.pl),
 * mocny nagłówek, podtytuł USP, dwa CTA, mikrocopy z zasadą 15 min.
 *
 * 3D scena (`HeroScene`) jest doładowana lazy w wariancie z `next/dynamic`
 * — tutaj zostawiamy slot SSR-friendly z dekoracją i animowanymi konfetti.
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-brand text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-teal" />
        <span className="absolute right-[15%] top-[20%] h-2 w-2 rounded-full bg-ink" />
        <span className="absolute left-[20%] bottom-[15%] h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="absolute right-[10%] bottom-[10%] h-3 w-3 rounded-full bg-white" />
        <span className="absolute right-[25%] top-[60%] h-2 w-2 rounded-full bg-teal" />
        <span className="absolute left-[40%] top-[8%] h-2 w-2 rounded-full bg-accent" />
      </div>

      <div className="container relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28 lg:py-36">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white/85">
            {siteConfig.contact.address.city} · {siteConfig.contact.address.district}
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl"
          >
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/95 md:text-xl">
            Bezpieczne trampoliny, certyfikowani trenerzy, strefy na każdy wiek.
            Skacz, baw się, świętuj — i wracaj po więcej.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/rezerwacje"
              className="rounded-full bg-ink px-7 py-3 text-base font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-ink-muted"
            >
              Kup bilet
            </Link>
            <Link
              href="/zajecia"
              className="rounded-full border-2 border-white px-7 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand"
            >
              Zarezerwuj zajęcia
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/85">
            ⏱️ Przyjdź <strong>{siteConfig.rules.arriveEarlyMinutes} min wcześniej</strong>.
            Wejścia o pełnych godzinach. Skarpetki antypoślizgowe obowiązkowe (10 zł na miejscu).
          </p>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full animate-[fade-up_1s_ease-out]"
              aria-hidden="true"
            >
              <polygon
                points="100,10 180,55 180,145 100,190 20,145 20,55"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="3"
              />
              <polygon
                points="100,10 180,55 180,145"
                fill="var(--color-accent-DEFAULT)"
                opacity="0.85"
              />
              <polygon
                points="100,10 20,55 20,145"
                fill="var(--color-teal-DEFAULT)"
                opacity="0.85"
              />
              <polygon
                points="100,190 180,145 20,145"
                fill="white"
                opacity="0.95"
              />
              <text
                x="100"
                y="115"
                textAnchor="middle"
                className="font-display"
                fontSize="32"
                fontWeight="800"
                fill="var(--color-brand-DEFAULT)"
              >
                SALTOS
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
