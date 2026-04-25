import Link from 'next/link';
import { pricing, formatPriceGrosze } from '@/content/pricing';

/**
 * Sekcja "Mini cennik" — 3 najpopularniejsze opcje
 * (bilet standard 60 min, karnet 10 wejść, pakiet urodzinowy PREMIUM).
 */
export function PricingTeaserSection() {
  const featured = pricing.filter((p) =>
    ['standard-60', 'pass-10', 'birthday-premium'].includes(p.id),
  );

  return (
    <section
      aria-labelledby="pricing-title"
      className="bg-white py-20 md:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Cennik
          </p>
          <h2
            id="pricing-title"
            className="mt-2 font-display text-4xl font-extrabold text-ink md:text-5xl"
          >
            Najpopularniejsze opcje
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Wybierz wariant najlepszy dla Ciebie. Pełen cennik, karnety i
            pakiety urodzinowe znajdziesz na stronie cennika.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((item, idx) => (
            <article
              key={item.id}
              className={`relative flex flex-col rounded-3xl border-2 p-8 transition hover:-translate-y-1 hover:shadow-xl ${
                idx === 1
                  ? 'border-brand bg-brand text-white shadow-lg'
                  : 'border-ink/10 bg-white text-ink'
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Najpopularniejsze
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{item.name}</h3>
              <p className={`mt-2 text-sm ${idx === 1 ? 'text-white/85' : 'text-ink/70'}`}>
                {item.description}
              </p>
              <div className="mt-6">
                <span className="font-display text-5xl font-extrabold">
                  {formatPriceGrosze(item.priceGrosze)}
                </span>
                {item.durationLabel && (
                  <span
                    className={`ml-2 text-sm ${idx === 1 ? 'text-white/85' : 'text-ink/60'}`}
                  >
                    / {item.durationLabel}
                  </span>
                )}
              </div>
              <Link
                href="/rezerwacje"
                className={`mt-8 inline-block rounded-full px-6 py-3 text-center text-sm font-bold uppercase tracking-wide transition ${
                  idx === 1
                    ? 'bg-ink text-white hover:bg-ink-muted'
                    : 'bg-brand text-white hover:bg-brand-dark'
                }`}
              >
                Kup online
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/cennik"
            className="inline-flex items-center gap-2 text-base font-bold text-brand hover:underline"
          >
            Zobacz pełny cennik i karnety →
          </Link>
        </div>
      </div>
    </section>
  );
}
