import { createClient } from '@/lib/supabase/server';

/**
 * Compute remaining capacity for a class session.
 * Sums confirmed reservations and subtracts from session capacity.
 */
export async function getSessionAvailability(sessionId: string) {
  const supabase = createClient();

  const { data: session, error: sErr } = await supabase
    .from('class_sessions')
    .select('*, class:classes(capacity)')
    .eq('id', sessionId)
    .maybeSingle();
  if (sErr) throw sErr;
  if (!session) return null;

  const { data: reservations, error: rErr } = await supabase
    .from('reservations')
    .select('quantity, status')
    .eq('session_id', sessionId)
    .in('status', ['paid', 'pending']);
  if (rErr) throw rErr;

  const taken = (reservations ?? []).reduce((sum, r) => sum + r.quantity, 0);
  const total =
    session.capacity_override ??
    (session.class as { capacity: number } | null)?.capacity ??
    0;

  return { total, taken, remaining: Math.max(0, total - taken) };
}
