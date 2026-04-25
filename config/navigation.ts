/**
 * Centralized navigation links — used by Navbar, MobileMenu, Footer, Sitemap.
 * Update once, propagated everywhere.
 */
export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: 'Zajęcia', href: '/zajecia' },
  { label: 'Cennik', href: '/cennik' },
  { label: 'Rezerwacje', href: '/rezerwacje' },
  { label: 'Urodziny', href: '/urodziny' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Park',
    items: [
      { label: 'Zajęcia', href: '/zajecia' },
      { label: 'Cennik', href: '/cennik' },
      { label: 'Galeria', href: '/galeria' },
    ],
  },
  {
    title: 'Oferta',
    items: [
      { label: 'Urodziny', href: '/urodziny' },
      { label: 'Szkoły', href: '/szkoly' },
      { label: 'Firmy', href: '/firmy' },
    ],
  },
  {
    title: 'Pomoc',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Regulamin', href: '/regulamin' },
      { label: 'Regulamin rezerwacji', href: '/regulamin-rezerwacji' },
      { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
    ],
  },
];

export const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Rezerwacje', href: '/admin/rezerwacje' },
  { label: 'Zajęcia', href: '/admin/zajecia' },
  { label: 'Cennik', href: '/admin/cennik' },
  { label: 'Grafik', href: '/admin/grafik' },
  { label: 'Użytkownicy', href: '/admin/uzytkownicy' },
  { label: 'Galeria', href: '/admin/galeria' },
  { label: 'FAQ', href: '/admin/faq' },
  { label: 'Ustawienia', href: '/admin/ustawienia' },
];

export const accountNav: NavItem[] = [
  { label: 'Dashboard', href: '/konto' },
  { label: 'Moje rezerwacje', href: '/konto/rezerwacje' },
  { label: 'Karnety', href: '/konto/karnety' },
  { label: 'Ustawienia', href: '/konto/ustawienia' },
];
