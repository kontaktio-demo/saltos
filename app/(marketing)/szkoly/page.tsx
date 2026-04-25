import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oferta dla szkół',
  description: 'Wycieczki szkolne i grupy zorganizowane.',
};

/** TODO: compose sections from components/sections/* */
export default function Page() {
  return (
    <section className="container py-24">
      <h1 className="font-display text-4xl font-bold md:text-6xl">Oferta dla szkół</h1>
      <p className="mt-4 max-w-2xl text-white/70">Wycieczki szkolne i grupy zorganizowane.</p>
    </section>
  );
}
