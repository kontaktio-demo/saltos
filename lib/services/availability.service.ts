import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type SessionRow = Database['public']['Tables']['class_sessions']['Row'];
type ClassRow = Database['public']['Tables']['classes']['Row'];

/**
 * Compute remaining capacity for a class session.
 * Sums confirmed reservations and subtracts from session capacity.
 */
export async function getSessionAvailability(sessionId: string) {
  const supabase = createClient();

  // Fetch session and parent class capacity in two queries (avoids depending on
  // generated relationship types which aren't present in the placeholder schema).
  const { data: session, error: sErr } = (await supabase
    .from('class_sessions')
    .select('*')
    .eq('id', sessionId)
    .maybeSingle()) as { data: SessionRow | null; error: unknown };
  if (sErr) throw sErr;
  if (!session) return null;

  const { data: cls, error: cErr } = (await supabase
    .from('classes')
    .select('capacity')
    .eq('id', session.class_id)
    .maybeSingle()) as { data: Pick<ClassRow, 'capacity'> | null; error: unknown };
  if (cErr) throw cErr;

  const { data: reservations, error: rErr } = await supabase
    .from('reservations')
    .select('quantity, status')
    .eq('session_id', sessionId)
    .in('status', ['paid', 'pending']);
  if (rErr) throw rErr;

  const taken = (reservations ?? []).reduce((sum, r) => sum + (r.quantity ?? 0), 0);
  const total = session.capacity_override ?? cls?.capacity ?? 0;

  return { total, taken, remaining: Math.max(0, total - taken) };
}
