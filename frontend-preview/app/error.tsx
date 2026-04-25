'use client';

import { useEffect } from 'react';

/**
 * Root error boundary — catches errors thrown anywhere in the tree.
 * Per Next.js convention, this MUST be a Client Component.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: wire to error tracking (Sentry, LogRocket, etc.)
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-4xl font-bold">Coś poszło nie tak</h1>
      <p className="text-white/70">Spróbuj ponownie lub wróć na stronę główną.</p>
      <button
        onClick={reset}
        className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
      >
        Spróbuj ponownie
      </button>
    </main>
  );
}
