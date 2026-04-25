import { NextResponse } from 'next/server';
import { reservationSchema } from '@/lib/validators/reservation.schema';
import { createClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/utils/rate-limit';

/**
 * POST /api/reservations — create a pending reservation.
 *
 * Uses the `create_reservation_atomic` RPC which holds a row-level lock on the
 * target session and verifies remaining capacity in one transaction. This is
 * the only safe pattern at scale — a naive read-then-write check will oversell
 * seats under concurrent load.
 *
 * Rate limited per IP to prevent abuse.
 */
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const limited = rateLimit(`reservations:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Zbyt wiele prób — spróbuj ponownie za chwilę.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } },
    );
  }

  try {
    const input = reservationSchema.parse(await req.json());
    const supabase = createClient();

    // Resolve current user (if logged in) — guests are also allowed.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.rpc('create_reservation_atomic', {
      p_session_id: input.sessionId,
      p_quantity: input.quantity,
      p_total_grosze: 0, // filled by checkout API based on pricing
      p_user_id: user?.id ?? null,
      p_guest_name: input.guestName,
      p_guest_email: input.guestEmail,
      p_guest_phone: input.guestPhone || null,
      p_notes: input.notes ?? null,
    } as never);

    if (error) {
      // Translate well-known SQL exceptions to friendly messages.
      const map: Record<string, { status: number; message: string }> = {
        session_not_found: { status: 404, message: 'Sesja nie istnieje' },
        session_cancelled: { status: 410, message: 'Sesja została odwołana' },
        session_in_past: { status: 410, message: 'Sesja już się odbyła' },
        insufficient_capacity: { status: 409, message: 'Brak wolnych miejsc' },
        quantity_must_be_positive: { status: 400, message: 'Nieprawidłowa liczba osób' },
      };
      const matched = Object.entries(map).find(([key]) => error.message.includes(key));
      if (matched) {
        return NextResponse.json({ error: matched[1].message }, { status: matched[1].status });
      }
      throw error;
    }

    return NextResponse.json({ reservation: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
