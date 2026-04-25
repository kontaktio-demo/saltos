import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Ustawienia konta', description: 'Zmień dane i hasło.' };

export default function Page() {
  return (
    <section className="container py-24">
      <h1 className="font-display text-4xl font-bold md:text-6xl">Ustawienia konta</h1>
      <p className="mt-4 max-w-2xl text-white/70">Zmień dane i hasło.</p>
    </section>
  );
}
