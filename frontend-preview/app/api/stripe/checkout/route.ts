import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckoutSession } from '@/lib/stripe/checkout';
import { rateLimit } from '@/lib/utils/rate-limit';

const bodySchema = z.object({
  reservationId: z.string().uuid(),
  items: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        amount_grosze: z.number().int().min(100),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1),
  customerEmail: z.string().email().optional(),
});

/**
 * POST /api/stripe/checkout
 * Create a Stripe Checkout session for a pending reservation.
 * Rate limited per IP to keep abusive traffic away from Stripe.
 */
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const limited = rateLimit(`checkout:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Zbyt wiele prób — spróbuj ponownie za chwilę.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } },
    );
  }

  try {
    const body = bodySchema.parse(await req.json());
    const session = await createCheckoutSession({
      items: body.items,
      metadata: { reservation_id: body.reservationId },
      customerEmail: body.customerEmail,
    });
    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
