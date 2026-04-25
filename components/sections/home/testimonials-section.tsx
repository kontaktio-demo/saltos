const testimonials = [
  {
    name: 'Karolina',
    role: 'mama dwójki',
    text: 'Dzieci uwielbiają Pixel Games, a my mamy chwilę dla siebie w strefie fitness. Idealne miejsce dla całej rodziny!',
    rating: 5,
  },
  {
    name: 'Tomek',
    role: 'trener osiedlowej drużyny',
    text: 'Trampoline Dodgeball to nasza cotygodniowa tradycja. Świetna ekipa, profesjonalny sprzęt, jasne zasady.',
    rating: 5,
  },
  {
    name: 'Ola',
    role: 'studentka, karnet 10 wejść',
    text: 'Skaczę 2× w tygodniu po pracy. Lepsze niż siłownia — kardio, śmiech i wracam z głową na plus.',
    rating: 5,
  },
];

/**
 * Sekcja opinii — proste karty (na MVP). W przyszłości można podpiąć
 * Google Reviews API lub feed z Supabase.
 */
export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-white py-20 md:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Opinie
          </p>
          <h2
            id="testimonials-title"
            className="mt-2 font-display text-4xl font-extrabold text-ink md:text-5xl"
          >
            Tak mówią o nas goście
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-brand" aria-label={`${t.rating} z 5 gwiazdek`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} aria-hidden="true">★</span>
                ))}
              </div>
              <blockquote className="mt-4 text-base text-ink/85">
                „{t.text}"
              </blockquote>
              <figcaption className="mt-4 text-sm font-bold text-ink">
                {t.name}
                <span className="block text-xs font-normal text-ink/60">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
