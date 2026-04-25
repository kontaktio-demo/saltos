import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Register GSAP plugins exactly once. Must be called from a Client Component
 * (e.g. inside a `useEffect`).
 */
export function registerGsap(): typeof gsap {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
