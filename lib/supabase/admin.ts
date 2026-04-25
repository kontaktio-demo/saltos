import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * **SERVER-ONLY** Supabase client using the service-role key.
 * Bypasses Row-Level Security. Use ONLY in trusted server contexts:
 *  - Stripe webhooks
 *  - Admin Server Actions
 *  - Cron jobs / background tasks
 *
 * NEVER import this in a Client Component.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
