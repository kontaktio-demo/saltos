import { gsap, ScrollTrigger } from '../register';

/**
 * Pinned-section timeline factory — pins a section while a timeline plays.
 * Use for "scrollytelling" sections (e.g. park zones tour).
 */
export function pinnedSectionTimeline(scope: HTMLElement) {
  return gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top top',
      end: '+=200%',
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });
}

export { ScrollTrigger };
