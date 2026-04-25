'use client';
import { useSyncExternalStore } from 'react';

/**
 * SSR-safe media query hook (React 19 / Next 16).
 * Uses `useSyncExternalStore` so hydration matches initial server render
 * and we avoid the React 19 "setState in effect" warning.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window === 'undefined') return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => (typeof window === 'undefined' ? false : window.matchMedia(query).matches),
    () => false,
  );
}
