/**
 * Cennik (fallback przed integracją Supabase).
 * Wszystkie ceny w groszach (1 zł = 100 grosze).
 */

export type PricingItem = {
  id: string;
  category: 'jednorazowy' | 'karnet' | 'urodziny' | 'happy-hours' | 'dodatki';
  name: string;
  description: string;
  priceGrosze: number;
  audience: 'dziecko' | 'dorosły' | 'grupa' | 'wszyscy';
  durationLabel?: string;
  highlight?: boolean;
};

export const pricing: PricingItem[] = [
  // — Bilety jednorazowe
  {
    id: 'standard-60',
    category: 'jednorazowy',
    name: 'Bilet standard 60 min',
    description: 'Pełen dostęp do stref Free Jump, Foam Pit i Pixel Games.',
    priceGrosze: 3500,
    audience: 'wszyscy',
    durationLabel: '60 minut',
    highlight: true,
  },
  {
    id: 'standard-90',
    category: 'jednorazowy',
    name: 'Bilet standard 90 min',
    description: 'Najpopularniejsza opcja — więcej czasu na wszystkie atrakcje.',
    priceGrosze: 4900,
    audience: 'wszyscy',
    durationLabel: '90 minut',
  },
  {
    id: 'kids-45',
    category: 'jednorazowy',
    name: 'Bilet dziecięcy 45 min',
    description: 'Dla dzieci 4–10 lat. Strefa Mini Saltos + Pixel Games.',
    priceGrosze: 2900,
    audience: 'dziecko',
    durationLabel: '45 minut',
  },
  // — Karnety
  {
    id: 'pass-5',
    category: 'karnet',
    name: 'Karnet 5 wejść',
    description: '5 wejść po 60 minut. Ważny 90 dni od pierwszego użycia.',
    priceGrosze: 14900,
    audience: 'wszyscy',
    durationLabel: '5 × 60 min',
  },
  {
    id: 'pass-10',
    category: 'karnet',
    name: 'Karnet 10 wejść',
    description: '10 wejść po 60 minut. Ważny 180 dni. Oszczędzasz 60 zł.',
    priceGrosze: 27500,
    audience: 'wszyscy',
    durationLabel: '10 × 60 min',
    highlight: true,
  },
  {
    id: 'pass-monthly',
    category: 'karnet',
    name: 'Karnet miesięczny OPEN',
    description: 'Nielimitowane wejścia przez 30 dni. Idealne dla aktywnych.',
    priceGrosze: 24900,
    audience: 'wszyscy',
    durationLabel: '30 dni open',
  },
  // — Pakiety urodzinowe
  {
    id: 'birthday-basic',
    category: 'urodziny',
    name: 'Urodziny BASIC',
    description: 'Sala urodzinowa + bilet 90 min dla 8 osób + animator.',
    priceGrosze: 49900,
    audience: 'grupa',
    durationLabel: 'do 8 osób',
  },
  {
    id: 'birthday-premium',
    category: 'urodziny',
    name: 'Urodziny PREMIUM',
    description:
      'Sala + bilet 120 min dla 12 osób + animator + tort + napoje + dekoracje.',
    priceGrosze: 84900,
    audience: 'grupa',
    durationLabel: 'do 12 osób',
    highlight: true,
  },
  {
    id: 'birthday-vip',
    category: 'urodziny',
    name: 'Urodziny VIP',
    description:
      'Cała strefa Pixel Games na wyłączność + bilet 120 min dla 20 osób + pełny catering.',
    priceGrosze: 159900,
    audience: 'grupa',
    durationLabel: 'do 20 osób',
  },
  // — Happy Hours
  {
    id: 'happy-morning',
    category: 'happy-hours',
    name: 'Happy Morning (Pon–Pt 10:00–13:00)',
    description: 'Bilet 60 min taniej. Idealne dla emerytów i seniorów.',
    priceGrosze: 2500,
    audience: 'wszyscy',
    durationLabel: '60 minut',
  },
  {
    id: 'happy-school',
    category: 'happy-hours',
    name: 'Strefa szkolna (Pon–Pt 10:00–14:00)',
    description: 'Cena dla zorganizowanych grup szkolnych. Min. 15 osób.',
    priceGrosze: 1900,
    audience: 'grupa',
    durationLabel: '60 min / osoba',
  },
  // — Dodatki
  {
    id: 'socks',
    category: 'dodatki',
    name: 'Skarpetki antypoślizgowe',
    description: 'Obowiązkowe dla bezpieczeństwa. Możesz zabrać do domu.',
    priceGrosze: 1000,
    audience: 'wszyscy',
  },
  {
    id: 'training-1on1',
    category: 'dodatki',
    name: 'Trening indywidualny z trenerem (60 min)',
    description: 'Zajęcia 1-na-1 z certyfikowanym trenerem akrobatyki.',
    priceGrosze: 12900,
    audience: 'wszyscy',
    durationLabel: '60 minut',
  },
];

export const formatPriceGrosze = (grosze: number): string =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
    grosze / 100,
  );
