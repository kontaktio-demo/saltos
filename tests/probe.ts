import { createClient } from '@/lib/supabase/server';

async function v1() {
  const sb = createClient();
  const { data } = await sb.from('classes').select('*');
  return data?.[0]?.slug;  // PROBE 1
}
async function v2() {
  const sb = createClient();
  const { data } = await sb.from('classes').select('*').order('title');
  return data?.[0]?.slug;  // PROBE 2
}
async function v3() {
  const sb = createClient();
  const { data } = await sb.from('classes').select('id, slug, title');
  return data?.[0]?.slug;  // PROBE 3
}
v1(); v2(); v3();
