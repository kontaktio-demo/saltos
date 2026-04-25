import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oferta dla firm',
  description: 'Eventy firmowe i integracje w Saltos.',
};

/** TODO: compose sections from components/sections/* */
export default function Page() {
  return (
    <section className="container py-24">
      <h1 className="font-display text-4xl font-bold md:text-6xl">Oferta dla firm</h1>
      <p className="mt-4 max-w-2xl text-white/70">Eventy firmowe i integracje w Saltos.</p>
    </section>
  );
}
