import type { Database } from '@/lib/supabase/types';

export type Reservation = Database['public']['Tables']['reservations']['Row'];
export type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];
export type ReservationStatus = Database['public']['Enums']['reservation_status'];
