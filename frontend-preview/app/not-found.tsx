import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-6xl font-bold">404</h1>
      <p className="text-lg text-white/70">Ups — taka strona u nas nie skacze.</p>
      <Link
        href="/"
        className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
      >
        Wróć na stronę główną
      </Link>
    </main>
  );
}
