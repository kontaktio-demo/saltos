import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Szczegóły rezerwacji', description: 'Szczegóły rezerwacji.' };

export default function Page() {
  return (
    <section className="container py-24">
      <h1 className="font-display text-4xl font-bold md:text-6xl">Szczegóły rezerwacji</h1>
      <p className="mt-4 max-w-2xl text-white/70">Szczegóły rezerwacji.</p>
    </section>
  );
}
