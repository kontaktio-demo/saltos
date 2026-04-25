import type { Database } from '@/lib/supabase/types';

export type PricingPlan = Database['public']['Tables']['pricing_plans']['Row'];
export type Pass = Database['public']['Tables']['passes']['Row'];
