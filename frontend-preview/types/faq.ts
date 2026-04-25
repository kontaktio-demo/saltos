import type { Database } from '@/lib/supabase/types';

export type Faq = Database['public']['Tables']['faqs']['Row'];
