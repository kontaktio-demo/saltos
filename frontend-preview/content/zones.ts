/**
 * Statyczna treść stref parku trampolin SALTOS.
 * Używana przez sekcję `ParkZonesSection` na home + landing pages.
 */

export type ParkZone = {
  slug: string;
  name: string;
  short: string;
  description: string;
  emoji: string;
  color: 'brand' | 'accent' | 'teal' | 'ink';
};

export const parkZones: ParkZone[] = [
  {
    slug: 'free-jump',
    name: 'Strefa Free Jump',
    short: 'Połączone trampoliny — skacz w każdą stronę',
    description:
      'Dziesiątki połączonych trampolin, ścianki i wyskoki. Idealne na rozgrzewkę i pierwsze próby akrobatyki.',
    emoji: '🤸',
    color: 'brand',
  },
  {
    slug: 'foam-pit',
    name: 'Foam Pit & Ścianki',
    short: 'Skoki i salta z bezpiecznym lądowaniem w gąbkach',
    description:
      'Odbij się i wyląduj w basenie pełnym piankowych kostek. Bezpieczne miejsce na pierwsze salto.',
    emoji: '🌊',
    color: 'teal',
  },
  {
    slug: 'dodgeball',
    name: 'Trampoline Dodgeball',
    short: 'Dwa Ognie na trampolinach — turnieje co weekend',
    description:
      'Zbierz drużynę i zagraj w klasyczne dwa ognie, ale na trampolinach. Turnieje co weekend.',
    emoji: '🎯',
    color: 'accent',
  },
  {
    slug: 'ninja',
    name: 'Tor Ninja',
    short: 'Belki, monkey bars, ścianka wspinaczkowa',
    description:
      'Profesjonalny tor przeszkód inspirowany Ninja Warrior. Sprawdź swoją siłę i zwinność.',
    emoji: '🥷',
    color: 'ink',
  },
  {
    slug: 'pixel-games',
    name: 'Pixel Games',
    short: 'Interaktywne gry świetlne na podłodze',
    description:
      'Rozświetlone strefy reagujące na dotyk. Gry zespołowe i indywidualne, dla małych i dużych.',
    emoji: '🕹️',
    color: 'brand',
  },
  {
    slug: 'kids',
    name: 'Strefa dla najmłodszych',
    short: 'Bezpieczna strefa dla dzieci do 7 lat',
    description:
      'Mniejsze trampoliny, miękkie kształty, zabawki sensoryczne. Pod opieką trenera lub rodzica.',
    emoji: '🧸',
    color: 'teal',
  },
];
