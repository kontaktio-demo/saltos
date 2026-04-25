import { createClient } from '../server';

export async function getPricingPlans() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('pricing_plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  if (error) throw error;
  return data;
}
