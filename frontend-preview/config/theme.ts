/**
 * Theme tokens mirrored from `tailwind.config.ts` for use in TS code
 * (e.g. Three.js scenes that need brand colors as hex).
 */
export const themeColors = {
  brand: '#F39200',
  brandDark: '#D97E00',
  brandLight: '#FFB13D',
  ink: '#1E2A5C',
  inkMuted: '#141B40',
  inkLight: '#2C3A75',
  accent: '#2FA84F',
  accentDark: '#1F8038',
  accentLight: '#5CC176',
  teal: '#1FA9A8',
  tealDark: '#16807F',
  tealLight: '#4FC2C1',
  white: '#FFFFFF',
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;
