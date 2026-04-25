import Link from 'next/link';
import { parkZones } from '@/content/zones';

const colorMap: Record<string, string> = {
  brand: 'bg-brand text-white',
  accent: 'bg-accent text-white',
  teal: 'bg-teal text-white',
  ink: 'bg-ink text-white',
};

/**
 * Sekcja "Strefy parku" — siatka kart z ikoną/emoji, krótkim opisem i CTA
 * "Zobacz zajęcia w strefie".
 */
export function ParkZonesSection() {
  return (
    <section
      id="strefy"
      aria-labelledby="zones-title"
      className="bg-white py-20 md:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Strefy parku
          </p>
          <h2
            id="zones-title"
            className="mt-2 font-display text-4xl font-extrabold text-ink md:text-5xl"
          >
            6 stref. Każda inna. Wszystkie pełne energii.
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Free Jump, Foam Pit, Dodgeball, Ninja, Pixel Games i strefa dla
            najmłodszych — wybierz swój sposób na wyskok.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parkZones.map((zone) => (
            <article
              key={zone.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-32 items-center justify-center text-6xl ${colorMap[zone.color]}`}
                aria-hidden="true"
              >
                {zone.emoji}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold text-ink">
                  {zone.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-ink/70">
                  {zone.short}
                </p>
                <p className="mt-3 flex-1 text-sm text-ink/60">
                  {zone.description}
                </p>
                <Link
                  href={`/zajecia#${zone.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand transition group-hover:gap-3"
                >
                  Zobacz zajęcia w strefie
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
