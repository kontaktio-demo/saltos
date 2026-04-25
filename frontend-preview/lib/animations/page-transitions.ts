import type { Variants } from 'framer-motion';
import { easings } from './transitions';

/** Page-level transition variants used by `<PageTransition>` wrapper. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easings.out } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: easings.inOut } },
};
