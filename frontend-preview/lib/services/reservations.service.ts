/**
 * Domain layer for reservations. Combines Supabase queries/mutations,
 * Stripe checkout, availability rules and email side-effects.
 *
 * Components & API routes should depend on this — never on Supabase/Stripe directly.
 */
export * from '@/lib/supabase/queries/reservations';
export * from '@/lib/supabase/mutations/reservations';
