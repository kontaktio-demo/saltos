import { createClient } from '../server';

export async function getReservationsByUser(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reservations')
    .select('*, session:class_sessions(*, class:classes(*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getReservationById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reservations')
    .select('*, session:class_sessions(*, class:classes(*))')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}
