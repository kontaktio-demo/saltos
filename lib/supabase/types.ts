/**
 * Database types — placeholder until generated from Supabase.
 *
 * After running migrations, regenerate with:
 *   supabase gen types typescript --project-id <your-project-id> > lib/supabase/types.ts
 *
 * The hand-written types below mirror the schema in `supabase/migrations/`
 * and are good enough to compile the project before the CLI is wired up.
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: 'user' | 'staff' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'user' | 'staff' | 'admin';
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      classes: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string | null;
          description: string | null;
          duration_minutes: number;
          capacity: number;
          min_age: number | null;
          cover_image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['classes']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['classes']['Insert']>;
      };
      class_sessions: {
        Row: {
          id: string;
          class_id: string;
          starts_at: string;
          ends_at: string;
          capacity_override: number | null;
          is_cancelled: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['class_sessions']['Row'],
          'id' | 'created_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['class_sessions']['Insert']>;
      };
      pricing_plans: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          price_grosze: number;
          type: 'single' | 'pack_5' | 'pack_10' | 'monthly' | 'yearly';
          entries: number | null;
          stripe_price_id: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['pricing_plans']['Row'],
          'id' | 'created_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['pricing_plans']['Insert']>;
      };
      reservations: {
        Row: {
          id: string;
          user_id: string | null;
          guest_name: string | null;
          guest_email: string | null;
          guest_phone: string | null;
          session_id: string;
          quantity: number;
          total_grosze: number;
          status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['reservations']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>;
      };
      passes: {
        Row: {
          id: string;
          user_id: string;
          pricing_plan_id: string;
          entries_remaining: number;
          valid_from: string;
          valid_until: string | null;
          stripe_payment_intent_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['passes']['Row'], 'id' | 'created_at'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['passes']['Insert']>;
      };
      faqs: {
        Row: {
          id: string;
          category: string;
          question: string;
          answer: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>;
      };
      gallery_items: {
        Row: {
          id: string;
          title: string | null;
          category: string | null;
          type: 'image' | 'video';
          storage_path: string;
          width: number | null;
          height: number | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['gallery_items']['Row'],
          'id' | 'created_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['gallery_items']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: 'new' | 'in_progress' | 'closed';
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['contact_messages']['Row'],
          'id' | 'created_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
      birthday_inquiries: {
        Row: {
          id: string;
          parent_name: string;
          email: string;
          phone: string;
          child_name: string | null;
          child_age: number | null;
          guests_count: number;
          preferred_date: string;
          package: string | null;
          notes: string | null;
          status: 'new' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['birthday_inquiries']['Row'],
          'id' | 'created_at'
        > & { id?: string };
        Update: Partial<Database['public']['Tables']['birthday_inquiries']['Insert']>;
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: { key: string; value: Json };
        Update: Partial<Database['public']['Tables']['settings']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      reservation_status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
      user_role: 'user' | 'staff' | 'admin';
      pass_type: 'single' | 'pack_5' | 'pack_10' | 'monthly' | 'yearly';
    };
  };
};
