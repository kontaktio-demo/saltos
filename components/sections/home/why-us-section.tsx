const values = [
  {
    icon: '🛡️',
    title: 'Certyfikowane bezpieczeństwo',
    desc: 'Profesjonalne trampoliny olimpijskie, miękkie krawędzie, regularne przeglądy i animatorzy na każdej strefie.',
  },
  {
    icon: '👨‍🏫',
    title: 'Trenerzy z licencją',
    desc: 'Zajęcia akrobatyki, fitness i ninja prowadzą certyfikowani instruktorzy z wieloletnim doświadczeniem.',
  },
  {
    icon: '🎂',
    title: 'Niezapomniane urodziny',
    desc: 'Dedykowana sala, animator, tort, dekoracje. Pakiety BASIC, PREMIUM i VIP — Ty się bawisz, my robimy resztę.',
  },
  {
    icon: '��',
    title: 'Lekcje WF i grupy szkolne',
    desc: 'Specjalne ceny dla szkół (Pon–Pt 10:00–14:00), własna strefa, scenariusze zajęć dostosowane do wieku.',
  },
];

/**
 * Sekcja "Dlaczego my" — 4 wartości + krótki testimonial.
 */
export function WhyUsSection() {
  return (
    <section
      aria-labelledby="why-title"
      className="bg-ink py-20 text-white md:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">
            Dlaczego SALTOS
          </p>
          <h2
            id="why-title"
            className="mt-2 font-display text-4xl font-extrabold md:text-5xl"
          >
            4 powody, dla których wracają do nas tysiące osób
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl bg-ink-light/40 p-6 backdrop-blur-sm transition hover:bg-ink-light/60"
            >
              <div className="text-5xl" aria-hidden="true">
                {v.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-white/75">{v.desc}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/15 bg-ink-muted/60 p-8 text-center">
          <blockquote className="font-display text-xl text-white md:text-2xl">
            „Najlepsze urodziny mojego syna! Animator zajął się wszystkim, a my
            mogliśmy spokojnie poskakać razem z dziećmi. Wracamy regularnie.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-white/70">
            — Magda, mama 9-letniego Antka
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
