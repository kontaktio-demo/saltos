/**
 * Formatters for currency (PLN) and dates (pl-PL).
 * Centralized to ensure consistent display across the entire app.
 */

const PLN = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Format an amount given in *grosze* (Stripe convention) as PLN. */
export function formatPriceFromGrosze(grosze: number): string {
  return PLN.format(grosze / 100);
}

/** Format an amount already given in PLN. */
export function formatPrice(pln: number): string {
  return PLN.format(pln);
}

const DATE = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const DATE_TIME = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const TIME = new Intl.DateTimeFormat('pl-PL', {
  hour: '2-digit',
  minute: '2-digit',
});

export const formatDate = (d: Date | string) => DATE.format(new Date(d));
export const formatDateTime = (d: Date | string) => DATE_TIME.format(new Date(d));
export const formatTime = (d: Date | string) => TIME.format(new Date(d));
