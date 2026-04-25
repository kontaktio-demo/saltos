/**
 * Statyczna lista zajęć / typów biletów (fallback / seed pre-Supabase).
 * W produkcji nadpisywane przez `lib/services/classes.service.ts`.
 */

export type ClassItem = {
  slug: string;
  title: string;
  short: string;
  durationMinutes: number;
  ageMin: number | null;
  ageMax: number | null;
  difficulty: 'łatwy' | 'średni' | 'wymagający';
  priceGrosze: number;
  zones: string[]; // slugs from content/zones
};

export const classes: ClassItem[] = [
  {
    slug: 'free-jump-60',
    title: 'Free Jump — bilet 60 minut',
    short: 'Pełen dostęp do wszystkich stref na 60 minut.',
    durationMinutes: 60,
    ageMin: 4,
    ageMax: null,
    difficulty: 'łatwy',
    priceGrosze: 3500,
    zones: ['free-jump', 'foam-pit', 'pixel-games'],
  },
  {
    slug: 'free-jump-90',
    title: 'Free Jump — bilet 90 minut',
    short: 'Pełen dostęp do wszystkich stref na 90 minut.',
    durationMinutes: 90,
    ageMin: 4,
    ageMax: null,
    difficulty: 'łatwy',
    priceGrosze: 4900,
    zones: ['free-jump', 'foam-pit', 'pixel-games'],
  },
  {
    slug: 'dodgeball',
    title: 'Trampoline Dodgeball',
    short: 'Turniej dwóch ogni na trampolinach. Drużyny 4–6 osób.',
    durationMinutes: 90,
    ageMin: 10,
    ageMax: null,
    difficulty: 'średni',
    priceGrosze: 4500,
    zones: ['dodgeball'],
  },
  {
    slug: 'ninja-warrior',
    title: 'Tor Ninja Warrior',
    short: 'Profesjonalny tor przeszkód z trenerem.',
    durationMinutes: 60,
    ageMin: 8,
    ageMax: null,
    difficulty: 'wymagający',
    priceGrosze: 5500,
    zones: ['ninja'],
  },
  {
    slug: 'fitness',
    title: 'Trampoline Fitness',
    short: 'Trening kardio na trampolinach z certyfikowanym trenerem.',
    durationMinutes: 50,
    ageMin: 16,
    ageMax: null,
    difficulty: 'średni',
    priceGrosze: 4000,
    zones: ['free-jump'],
  },
  {
    slug: 'kids-jump',
    title: 'Mini Saltos — dla dzieci 4–7 lat',
    short: 'Bezpieczna zabawa pod okiem animatora. Dla najmłodszych.',
    durationMinutes: 45,
    ageMin: 4,
    ageMax: 7,
    difficulty: 'łatwy',
    priceGrosze: 2900,
    zones: ['kids', 'pixel-games'],
  },
  {
    slug: 'pixel-games-session',
    title: 'Pixel Games — sesja 45 minut',
    short: 'Interaktywne gry świetlne. Idealne dla grup i znajomych.',
    durationMinutes: 45,
    ageMin: 6,
    ageMax: null,
    difficulty: 'łatwy',
    priceGrosze: 3200,
    zones: ['pixel-games'],
  },
];
