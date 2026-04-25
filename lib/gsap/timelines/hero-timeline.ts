import { gsap } from '../register';

/**
 * Hero timeline factory — creates the entrance animation for the hero section.
 * Caller is responsible for context cleanup (use `gsap.context` / `useGsap`).
 */
export function heroTimeline(scope: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from(scope.querySelectorAll('[data-hero-line]'), {
    yPercent: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
  })
    .from(scope.querySelectorAll('[data-hero-cta]'), { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from(scope.querySelectorAll('[data-hero-stat]'), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    }, '-=0.3');
  return tl;
}
