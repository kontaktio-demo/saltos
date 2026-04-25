import { createClient } from '@/lib/supabase/server';

/**
 * Aggregates for the admin dashboard:
 *  - reservations today
 *  - revenue (last 30 days)
 *  - top classes by occupancy
 */
export async function getAdminDashboardStats() {
  const supabase = await createClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [{ data: today }, { data: revenue }] = await Promise.all([
    supabase
      .from('reservations')
      .select('id, total_grosze, status')
      .gte('created_at', todayStart.toISOString()),
    supabase
      .from('reservations')
      .select('total_grosze')
      .eq('status', 'paid')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()),
  ]);

  const revenueRows = (revenue ?? []) as Array<{ total_grosze: number | null }>;

  return {
    reservationsToday: today?.length ?? 0,
    revenue30dGrosze: revenueRows.reduce((sum, r) => sum + (r.total_grosze ?? 0), 0),
  };
}
