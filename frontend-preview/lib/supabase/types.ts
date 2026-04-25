/**
 * Database types — placeholder until generated from Supabase.
 *
 * After running migrations, regenerate with:
 *   supabase gen types typescript --linked > lib/supabase/types.ts
 *
 * The hand-written types below mirror the schema in `supabase/migrations/`
 * and are good enough to compile the project before the CLI is wired up.
 *
 * NOTE: Insert / Update types are written as flat object literals (not as
 * `Omit<Row, ...>` shortcuts) because @supabase/postgrest-js' overloaded
 * `.insert()` signature can collapse the row type to `never` when the Insert
 * type is computed via a self-referencing utility type.
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  // Required by @supabase/postgrest-js v2.104+ to type-check queries.
  __InternalSupabase: {
    PostgrestVersion: '12';
  };
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
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'user' | 'staff' | 'admin';
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description?: string | null;
          description?: string | null;
          duration_minutes?: number;
          capacity?: number;
          min_age?: number | null;
          cover_image_url?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string | null;
          description?: string | null;
          duration_minutes?: number;
          capacity?: number;
          min_age?: number | null;
          cover_image_url?: string | null;
          is_active?: boolean;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          class_id: string;
          starts_at: string;
          ends_at: string;
          capacity_override?: number | null;
          is_cancelled?: boolean;
        };
        Update: {
          id?: string;
          class_id?: string;
          starts_at?: string;
          ends_at?: string;
          capacity_override?: number | null;
          is_cancelled?: boolean;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          price_grosze: number;
          type: 'single' | 'pack_5' | 'pack_10' | 'monthly' | 'yearly';
          entries?: number | null;
          stripe_price_id?: string | null;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          price_grosze?: number;
          type?: 'single' | 'pack_5' | 'pack_10' | 'monthly' | 'yearly';
          entries?: number | null;
          stripe_price_id?: string | null;
          is_active?: boolean;
          sort_order?: number;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          user_id?: string | null;
          guest_name?: string | null;
          guest_email?: string | null;
          guest_phone?: string | null;
          session_id: string;
          quantity: number;
          total_grosze?: number;
          status?: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          guest_name?: string | null;
          guest_email?: string | null;
          guest_phone?: string | null;
          session_id?: string;
          quantity?: number;
          total_grosze?: number;
          status?: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          notes?: string | null;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          user_id: string;
          pricing_plan_id: string;
          entries_remaining?: number;
          valid_from?: string;
          valid_until?: string | null;
          stripe_payment_intent_id?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          pricing_plan_id?: string;
          entries_remaining?: number;
          valid_from?: string;
          valid_until?: string | null;
          stripe_payment_intent_id?: string | null;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          category?: string;
          question: string;
          answer: string;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          id?: string;
          category?: string;
          question?: string;
          answer?: string;
          sort_order?: number;
          is_published?: boolean;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          title?: string | null;
          category?: string | null;
          type?: 'image' | 'video';
          storage_path: string;
          width?: number | null;
          height?: number | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: {
          id?: string;
          title?: string | null;
          category?: string | null;
          type?: 'image' | 'video';
          storage_path?: string;
          width?: number | null;
          height?: number | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          status?: 'new' | 'in_progress' | 'closed';
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          status?: 'new' | 'in_progress' | 'closed';
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          parent_name: string;
          email: string;
          phone: string;
          child_name?: string | null;
          child_age?: number | null;
          guests_count: number;
          preferred_date: string;
          package?: string | null;
          notes?: string | null;
          status?: 'new' | 'confirmed' | 'cancelled';
        };
        Update: {
          id?: string;
          parent_name?: string;
          email?: string;
          phone?: string;
          child_name?: string | null;
          child_age?: number | null;
          guests_count?: number;
          preferred_date?: string;
          package?: string | null;
          notes?: string | null;
          status?: 'new' | 'confirmed' | 'cancelled';
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
        };
        Update: {
          key?: string;
          value?: Json;
        };
        Relationships: [];
      };
      stripe_events: {
        Row: {
          id: string;
          type: string;
          payload: Json | null;
          processed_at: string;
        };
        Insert: {
          id: string;
          type: string;
          payload?: Json | null;
        };
        Update: {
          id?: string;
          type?: string;
          payload?: Json | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_reservation_atomic: {
        Args: {
          p_session_id: string;
          p_quantity: number;
          p_total_grosze: number;
          p_user_id?: string | null;
          p_guest_name?: string | null;
          p_guest_email?: string | null;
          p_guest_phone?: string | null;
          p_notes?: string | null;
        };
        Returns: {
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
      };
      consume_pass_entry: {
        Args: { p_pass_id: string };
        Returns: boolean;
      };
      cleanup_stale_reservations: {
        Args: Record<string, never>;
        Returns: number;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      reservation_status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
      user_role: 'user' | 'staff' | 'admin';
      pass_type: 'single' | 'pack_5' | 'pack_10' | 'monthly' | 'yearly';
    };
    CompositeTypes: Record<string, never>;
  };
};
