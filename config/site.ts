/**
 * Global site configuration. Single source of truth for site name, URL,
 * social handles, contact details. Imported by metadata, footer, JSON-LD.
 */
export const siteConfig = {
  name: 'Saltos',
  shortName: 'Saltos Park',
  description:
    'Saltos — premium park trampolin. Skacz, baw się, świętuj urodziny i trenuj w największej strefie aktywności w mieście.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saltos.example.com',
  locale: 'pl-PL',
  contact: {
    email: 'kontakt@saltos.example.com',
    phone: '+48 000 000 000',
    address: {
      street: 'ul. Skoczna 1',
      postalCode: '00-000',
      city: 'Warszawa',
      country: 'Polska',
    },
  },
  social: {
    instagram: 'https://instagram.com/saltos',
    facebook: 'https://facebook.com/saltos',
    tiktok: 'https://tiktok.com/@saltos',
    youtube: 'https://youtube.com/@saltos',
  },
} as const;

export type SiteConfig = typeof siteConfig;
