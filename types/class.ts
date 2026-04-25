import type { Database } from '@/lib/supabase/types';

export type TrampolineClass = Database['public']['Tables']['classes']['Row'];
export type ClassSession = Database['public']['Tables']['class_sessions']['Row'];
