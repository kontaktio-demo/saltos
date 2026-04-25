/**
 * Global site configuration. Single source of truth for site name, URL,
 * social handles, contact details. Imported by metadata, footer, JSON-LD.
 *
 * Dane realne z park trampolin SALTOS Srebrzyńska Polesie (Łódź).
 */
export const siteConfig = {
  name: 'Saltos Srebrzyńska',
  shortName: 'Saltos Park',
  tagline: 'Największy park trampolin w Łodzi',
  description:
    'Saltos Srebrzyńska — największy park trampolin w Łodzi. Skacz, baw się, organizuj urodziny i trenuj w bezpiecznej strefie aktywności z trenerami.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saltos.example.com',
  locale: 'pl-PL',
  contact: {
    email: 'srebrzynska@saltos.pl',
    phone: '+48 789 186 992',
    phoneDisplay: '+48 789 186 992',
    address: {
      street: 'ul. Srebrzyńska 4',
      postalCode: '91-074',
      city: 'Łódź',
      district: 'Polesie',
      country: 'Polska',
    },
    hours: {
      weekdays: 'Pon–Pt: 10:00–21:00',
      weekend: 'Sob–Nd: 10:00–21:00',
    },
    geo: {
      latitude: 51.7708,
      longitude: 19.4318,
    },
  },
  social: {
    instagram: 'https://instagram.com/saltos',
    facebook: 'https://facebook.com/saltos',
    tiktok: 'https://tiktok.com/@saltos',
    youtube: 'https://youtube.com/@saltos',
  },
  rules: {
    arriveEarlyMinutes: 15,
    socksPriceGrosze: 1000, // 10,00 zł
    minorAge: 18,
    requiresGuardianAge: 13,
  },
} as const;

export type SiteConfig = typeof siteConfig;
