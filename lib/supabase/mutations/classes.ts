import { createClient } from '../server';
import type { Database } from '../types';

type ClassInsert = Database['public']['Tables']['classes']['Insert'];
type ClassUpdate = Database['public']['Tables']['classes']['Update'];

export async function createClass(input: ClassInsert) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('classes')
    .insert(input as never)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateClass(id: string, patch: ClassUpdate) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('classes')
    .update(patch as never)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteClass(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('classes').delete().eq('id', id);
  if (error) throw error;
}
