import { createClient } from '../server';

/** Read-side queries for `classes` and related sessions. */

export async function getClasses(opts: { onlyActive?: boolean } = {}) {
  const supabase = await createClient();
  const query = supabase.from('classes').select('*').order('title');
  if (opts.onlyActive ?? true) query.eq('is_active', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getClassBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getUpcomingSessions(classId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('class_sessions')
    .select('*')
    .eq('class_id', classId)
    .eq('is_cancelled', false)
    .gte('starts_at', new Date().toISOString())
    .order('starts_at');
  if (error) throw error;
  return data;
}
