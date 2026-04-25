import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  // Allow build to succeed without the key (e.g. CI) — runtime usage will throw.
  console.warn('STRIPE_SECRET_KEY is not set');
}

/** Server-side Stripe SDK singleton. */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia',
  typescript: true,
});
