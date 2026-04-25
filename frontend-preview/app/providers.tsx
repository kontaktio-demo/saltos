'use client';

import type { ReactNode } from 'react';

/**
 * Global client-side providers (theme, toaster, query client, etc.).
 * Keep this lean — heavy providers should be co-located with the layout
 * that actually needs them.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
