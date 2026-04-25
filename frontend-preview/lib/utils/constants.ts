/**
 * App-wide constants. Domain values that don't belong to a single module.
 */

export const RESERVATION_STATUSES = [
  'pending',
  'paid',
  'cancelled',
  'refunded',
  'completed',
] as const;
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export const PASS_TYPES = ['single', 'pack_5', 'pack_10', 'monthly', 'yearly'] as const;
export type PassType = (typeof PASS_TYPES)[number];

export const USER_ROLES = ['user', 'staff', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Park opening hours per weekday (0 = Sunday, 6 = Saturday). */
export const OPENING_HOURS: Record<number, { open: string; close: string } | null> = {
  0: { open: '10:00', close: '20:00' },
  1: { open: '14:00', close: '21:00' },
  2: { open: '14:00', close: '21:00' },
  3: { open: '14:00', close: '21:00' },
  4: { open: '14:00', close: '21:00' },
  5: { open: '12:00', close: '22:00' },
  6: { open: '10:00', close: '22:00' },
};

/** Default booking session duration (minutes). */
export const DEFAULT_SESSION_MINUTES = 60;

/** Minimum age allowed in the park (years). */
export const MIN_AGE = 4;
