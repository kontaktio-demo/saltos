import { NextResponse } from 'next/server';
import { constructEvent, handleStripeEvent } from '@/lib/stripe/webhooks';

/**
 * POST /api/stripe/webhook
 * Stripe webhook receiver. MUST run on Node runtime (not edge) because
 * we need the raw request body for signature verification.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const rawBody = await req.text();

  let event;
  try {
    event = constructEvent(rawBody, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    await handleStripeEvent(event);
    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook handler failed';
    console.error('Stripe webhook error', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
