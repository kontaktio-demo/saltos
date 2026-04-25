import type { Metadata } from 'next';

/** ISR: regenerate from Supabase at most once per hour. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Zdjęcia i filmy z parku Saltos.',
};

/** TODO: compose sections from components/sections/* */
export default function Page() {
  return (
    <section className="container py-24">
      <h1 className="font-display text-4xl font-bold md:text-6xl">Galeria</h1>
      <p className="mt-4 max-w-2xl text-white/70">Zdjęcia i filmy z parku Saltos.</p>
    </section>
  );
}
