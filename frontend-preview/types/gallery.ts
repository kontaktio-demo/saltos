import type { Database } from '@/lib/supabase/types';

export type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];
