import { createClient } from '../server';
import type { Database } from '../types';

type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];

export async function createReservation(input: ReservationInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reservations')
    .insert(input as never)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateReservationStatus(
  id: string,
  status: Database['public']['Enums']['reservation_status'],
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reservations')
    .update({ status } as never)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
