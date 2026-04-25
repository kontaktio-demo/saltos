'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap, registerGsap } from '@/lib/gsap/register';

/**
 * Run a GSAP setup function inside a `gsap.context` scoped to the returned ref.
 * Cleans up automatically on unmount or dependency change.
 */
export function useGsap<T extends HTMLElement = HTMLElement>(
  setup: (ctx: { scope: T }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T | null>(null);
  useLayoutEffect(() => {
    registerGsap();
    if (!ref.current) return;
    const ctx = gsap.context(() => setup({ scope: ref.current as T }), ref.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
