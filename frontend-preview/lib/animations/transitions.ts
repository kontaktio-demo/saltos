import type { Transition } from 'framer-motion';

/** Easing curves and durations shared by all Framer Motion animations. */

export const easings = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  bounce: [0.34, 1.56, 0.64, 1],
} as const;

export const durations = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

export const baseTransition: Transition = {
  duration: durations.base,
  ease: easings.out,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 26,
};
