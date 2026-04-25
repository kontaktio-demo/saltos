import type Stripe from 'stripe';
import { stripe } from './server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Json } from '@/lib/supabase/types';

/**
 * Verify and parse an incoming Stripe webhook request body.
 * Throws if the signature is invalid.
 */
export function constructEvent(rawBody: string, signature: string): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}

/**
 * Top-level dispatcher for Stripe webhook events.
 *
 * Idempotent: every event id is recorded in `stripe_events` and re-deliveries
 * are short-circuited. Stripe retries failed webhooks for up to 3 days, so this
 * guard is mandatory at scale.
 */
export async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  const supabase = createAdminClient();

  // Idempotency check — return early on duplicate.
  const { data: existing } = await supabase
    .from('stripe_events')
    .select('id')
    .eq('id', event.id)
    .maybeSingle();
  if (existing) return;

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'checkout.session.expired':
      await handleCheckoutExpired(event.data.object);
      break;
    case 'charge.refunded':
      // TODO: mark reservation as refunded
      break;
    default:
      // Ignore unhandled events (Stripe sends many).
      break;
  }

  // Record event AFTER successful processing — failures are retried by Stripe.
  await supabase.from('stripe_events').insert({
    id: event.id,
    type: event.type,
    payload: event as unknown as Json,
  } as never);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const reservationId = session.metadata?.reservation_id;
  if (!reservationId) return;

  const supabase = createAdminClient();
  await supabase
    .from('reservations')
    .update({
      status: 'paid',
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === 'string' ? session.payment_intent : null,
    } as never)
    .eq('id', reservationId);
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const reservationId = session.metadata?.reservation_id;
  if (!reservationId) return;

  const supabase = createAdminClient();
  await supabase
    .from('reservations')
    .update({ status: 'cancelled' } as never)
    .eq('id', reservationId);
}
