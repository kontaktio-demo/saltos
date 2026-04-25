/**
 * Pełna baza FAQ podzielona na kategorie.
 * Używana przez `/faq` (akordeony per kategoria) oraz JSON-LD `FAQPage`.
 */

export type FaqCategory = 'bezpieczenstwo' | 'rezerwacje' | 'platnosci' | 'dzieci' | 'urodziny';

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: { slug: FaqCategory; name: string; emoji: string }[] = [
  { slug: 'bezpieczenstwo', name: 'Bezpieczeństwo', emoji: '🛡️' },
  { slug: 'rezerwacje', name: 'Rezerwacje', emoji: '📅' },
  { slug: 'platnosci', name: 'Płatności', emoji: '💳' },
  { slug: 'dzieci', name: 'Zasady dla dzieci', emoji: '👶' },
  { slug: 'urodziny', name: 'Urodziny i grupy', emoji: '🎂' },
];

export const faqItems: FaqItem[] = [
  // Bezpieczeństwo
  {
    id: 'safety-warmup',
    category: 'bezpieczenstwo',
    question: 'Czy rozgrzewka jest obowiązkowa?',
    answer:
      'Tak. Przed każdą sesją obowiązuje 5-minutowa rozgrzewka prowadzona przez instruktora. Zaczyna się równo o pełnej godzinie. Bez rozgrzewki nie można wejść na trampoliny.',
  },
  {
    id: 'safety-socks',
    category: 'bezpieczenstwo',
    question: 'Czy potrzebuję specjalnych skarpetek?',
    answer:
      'Tak — skarpetki antypoślizgowe są obowiązkowe w całym parku. Możesz przynieść własne lub kupić u nas (10 zł, można zabrać do domu i używać przy kolejnych wizytach).',
  },
  {
    id: 'safety-pregnancy',
    category: 'bezpieczenstwo',
    question: 'Czy mogę skakać w ciąży lub po kontuzji?',
    answer:
      'Nie zalecamy skakania w ciąży ani bezpośrednio po kontuzjach, operacjach lub chorobach kardiologicznych. Każdy uczestnik wchodzi na własną odpowiedzialność.',
  },
  {
    id: 'safety-late',
    category: 'bezpieczenstwo',
    question: 'Co jeśli się spóźnię?',
    answer:
      'Prosimy przyjechać 15 minut przed swoją sesją (rejestracja, przebranie, rozgrzewka). Spóźnienie powyżej 10 minut może skutkować skróceniem sesji bez zwrotu kosztów.',
  },
  // Rezerwacje
  {
    id: 'res-online',
    category: 'rezerwacje',
    question: 'Czy muszę rezerwować bilet online?',
    answer:
      'Nie musisz, ale online gwarantujesz miejsce — szczególnie w weekendy i wakacje park bywa pełny. Online rezerwujesz konkretną godzinę o pełnej godzinie zegarowej.',
  },
  {
    id: 'res-cancel',
    category: 'rezerwacje',
    question: 'Czy mogę anulować rezerwację?',
    answer:
      'Tak, do 24 godzin przed sesją — pełen zwrot na konto/kartę w ciągu 5 dni roboczych. Anulowanie poniżej 24h oznacza utratę środków, ale możesz przepisać rezerwację na inną osobę.',
  },
  {
    id: 'res-change',
    category: 'rezerwacje',
    question: 'Czy mogę zmienić termin rezerwacji?',
    answer:
      'Tak, raz, do 24 godzin przed sesją — bezpłatnie z poziomu konta lub mailowo. Po tym terminie zmiana nie jest możliwa.',
  },
  {
    id: 'res-group',
    category: 'rezerwacje',
    question: 'Jak zarezerwować dla większej grupy (10+ osób)?',
    answer:
      'Skorzystaj z formularza na podstronie /szkoly lub /firmy, albo zadzwoń pod +48 789 186 992. Gwarantujemy specjalną cenę i wydzieloną strefę.',
  },
  // Płatności
  {
    id: 'pay-methods',
    category: 'platnosci',
    question: 'Jakie formy płatności akceptujecie?',
    answer:
      'Online: BLIK, karty (Visa/Mastercard), Apple Pay, Google Pay. W parku: karty, BLIK, gotówka. Faktury VAT wystawiamy automatycznie po podaniu NIP-u w formularzu.',
  },
  {
    id: 'pay-invoice',
    category: 'platnosci',
    question: 'Czy dostanę fakturę VAT?',
    answer:
      'Tak — w trakcie zakupu zaznacz „chcę fakturę" i podaj dane firmy + NIP. Faktura zostanie wysłana mailem w ciągu 24 godzin. Możesz też pobrać ją z panelu /konto.',
  },
  {
    id: 'pay-pass',
    category: 'platnosci',
    question: 'Jak działają karnety?',
    answer:
      'Po zakupie karnetu otrzymujesz kod QR w mailu i w panelu /konto. Pokazujesz go w recepcji przy każdej wizycie — system odejmuje 1 wejście. Karnety mają datę ważności (5 wejść = 90 dni, 10 wejść = 180 dni, miesięczny = 30 dni od pierwszego użycia).',
  },
  // Zasady dla dzieci
  {
    id: 'kids-age',
    category: 'dzieci',
    question: 'Od jakiego wieku można skakać?',
    answer:
      'Od 4 lat (strefa Mini Saltos pod opieką rodzica). Strefa główna (Free Jump, Foam Pit) — od 6 lat. Tor Ninja — od 8 lat. Trampoline Fitness — od 16 lat.',
  },
  {
    id: 'kids-guardian',
    category: 'dzieci',
    question: 'Czy dziecko musi przyjść z opiekunem?',
    answer:
      'Dzieci do 13 lat muszą być pod opieką rodzica lub pełnoletniego opiekuna na terenie parku. Dla osób 13–18 lat wymagana jest rejestracja ze zgodą rodzica (możliwa SMS-em po zakupie biletu).',
  },
  {
    id: 'kids-form',
    category: 'dzieci',
    question: 'Co jeśli dziecko boi się skakać?',
    answer:
      'Animatorzy mają doświadczenie w pracy z dziećmi i pomogą oswoić się z trampolinami. Zaczynamy od strefy Mini Saltos i prostych skoków. Zawsze można też wejść z dzieckiem (jako opiekun masz wstęp gratis).',
  },
  // Urodziny i grupy
  {
    id: 'bday-when',
    category: 'urodziny',
    question: 'Z jakim wyprzedzeniem rezerwować urodziny?',
    answer:
      'Min. 7 dni przed planowaną datą. W weekendy i sezonie szkolnym — najlepiej 3–4 tygodnie wcześniej. Wymagana zaliczka 30% przy rezerwacji.',
  },
  {
    id: 'bday-cake',
    category: 'urodziny',
    question: 'Czy mogę przynieść własny tort?',
    answer:
      'Tak, w pakietach BASIC i VIP. Pakiet PREMIUM zawiera tort od nas (do wyboru: czekoladowy, owocowy, beza). Catering musisz zamówić u nas — nie wpuszczamy własnego jedzenia poza tortem.',
  },
  {
    id: 'bday-room',
    category: 'urodziny',
    question: 'Czy dostaję salę urodzinową na wyłączność?',
    answer:
      'Tak — sala urodzinowa jest tylko dla Twojej grupy przez cały czas trwania imprezy. Pakiet VIP daje dodatkowo całą strefę Pixel Games na wyłączność na 60 minut.',
  },
];
