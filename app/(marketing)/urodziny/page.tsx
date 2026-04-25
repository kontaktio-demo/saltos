import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Urodziny w Saltos',
  description: 'Niezapomniane urodziny w parku trampolin.',
};

/** TODO: compose sections from components/sections/* */
export default function Page() {
  return (
    <section className="container py-24">
      <h1 className="font-display text-4xl font-bold md:text-6xl">Urodziny w Saltos</h1>
      <p className="mt-4 max-w-2xl text-white/70">Niezapomniane urodziny w parku trampolin.</p>
    </section>
  );
}
