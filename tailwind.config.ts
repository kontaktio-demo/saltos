import type { Config } from 'tailwindcss';

/**
 * Tailwind configuration for Saltos.
 * Brand colors and design tokens are defined here. CSS variables in
 * `app/globals.css` map to these tokens for runtime theming.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // SALTOS brand palette (z identyfikacji wizualnej parku).
        brand: {
          DEFAULT: '#F39200', // pomarańcz — główne tło, energia, ruch
          dark: '#D97E00',
          light: '#FFB13D',
        },
        // Granat — pasek kontaktowy, footer, ciemne sekcje, panel admina.
        ink: {
          DEFAULT: '#1E2A5C',
          muted: '#141B40',
          light: '#2C3A75',
        },
        // Akcenty z logo / hexagonu.
        accent: {
          DEFAULT: '#2FA84F', // zieleń
          dark: '#1F8038',
          light: '#5CC176',
        },
        teal: {
          DEFAULT: '#1FA9A8', // turkus
          dark: '#16807F',
          light: '#4FC2C1',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
