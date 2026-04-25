import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Supabase client for the **browser** (Client Components).
 * Uses the public anon key. Auth state is automatically synced via cookies.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
