export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_activity_logs: {
        Row: {
          action: string
          admin_user_id: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          permissions: Json | null
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_name: string
          event_type: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          properties: Json | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_name: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_name?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          properties?: Json | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_reports: {
        Row: {
          configuration: Json
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          last_run_at: string | null
          name: string
          recipients: string[] | null
          report_type: string
          schedule_config: Json | null
          updated_at: string
        }
        Insert: {
          configuration?: Json
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name: string
          recipients?: string[] | null
          report_type: string
          schedule_config?: Json | null
          updated_at?: string
        }
        Update: {
          configuration?: Json
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name?: string
          recipients?: string[] | null
          report_type?: string
          schedule_config?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      billing_history: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          invoice_url: string | null
          paid_at: string | null
          status: string
          stripe_invoice_id: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          invoice_url?: string | null
          paid_at?: string | null
          status: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          invoice_url?: string | null
          paid_at?: string | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_metrics: {
        Row: {
          created_at: string
          id: string
          metric_date: string
          metric_meta: Json | null
          metric_type: string
          metric_value: number
        }
        Insert: {
          created_at?: string
          id?: string
          metric_date: string
          metric_meta?: Json | null
          metric_type: string
          metric_value: number
        }
        Update: {
          created_at?: string
          id?: string
          metric_date?: string
          metric_meta?: Json | null
          metric_type?: string
          metric_value?: number
        }
        Relationships: []
      }
      newsletter_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          link_url: string | null
          newsletter_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          link_url?: string | null
          newsletter_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          link_url?: string | null
          newsletter_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_analytics_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletters"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      newsletters: {
        Row: {
          author_id: string
          category_id: string | null
          click_rate: number | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          open_rate: number | null
          scheduled_at: string | null
          sent_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          total_recipients: number | null
          updated_at: string
        }
        Insert: {
          author_id: string
          category_id?: string | null
          click_rate?: number | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          open_rate?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          total_recipients?: number | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          category_id?: string | null
          click_rate?: number | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          open_rate?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          total_recipients?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_newsletter_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "newsletter_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          currency: string | null
          id: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string | null
          shipping_address: Json | null
          shipping_amount: number | null
          status: string | null
          stripe_payment_intent_id: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: Json | null
          shipping_amount?: number | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: Json | null
          shipping_amount?: number | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      price_history: {
        Row: {
          id: string
          price: number
          recorded_at: string
          wishlist_item_id: string
        }
        Insert: {
          id?: string
          price: number
          recorded_at?: string
          wishlist_item_id: string
        }
        Update: {
          id?: string
          price?: number
          recorded_at?: string
          wishlist_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_history_wishlist_item_id_fkey"
            columns: ["wishlist_item_id"]
            isOneToOne: false
            referencedRelation: "wishlist_items"
            referencedColumns: ["id"]
          },
        ]
      }
      product_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          product_id: string
          properties: Json | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          product_id: string
          properties?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          product_id?: string
          properties?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_analytics_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          allow_backorder: boolean | null
          category_id: string | null
          created_at: string
          description: string | null
          drop_date: string | null
          early_access_hours: number | null
          featured_image_url: string | null
          id: string
          images: Json | null
          is_drop: boolean | null
          is_member_exclusive: boolean | null
          low_stock_threshold: number | null
          name: string
          price: number
          sku: string | null
          slug: string
          status: string | null
          stock_quantity: number | null
          tags: string[] | null
          track_stock: boolean | null
          updated_at: string
        }
        Insert: {
          allow_backorder?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          drop_date?: string | null
          early_access_hours?: number | null
          featured_image_url?: string | null
          id?: string
          images?: Json | null
          is_drop?: boolean | null
          is_member_exclusive?: boolean | null
          low_stock_threshold?: number | null
          name: string
          price: number
          sku?: string | null
          slug: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          track_stock?: boolean | null
          updated_at?: string
        }
        Update: {
          allow_backorder?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          drop_date?: string | null
          early_access_hours?: number | null
          featured_image_url?: string | null
          id?: string
          images?: Json | null
          is_drop?: boolean | null
          is_member_exclusive?: boolean | null
          low_stock_threshold?: number | null
          name?: string
          price?: number
          sku?: string | null
          slug?: string
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          track_stock?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_product_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          experience_level: string | null
          full_name: string | null
          id: string
          interests: string[] | null
          location: string | null
          occupation: string | null
          phone: string | null
          timezone: string | null
          updated_at: string
          username: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          experience_level?: string | null
          full_name?: string | null
          id: string
          interests?: string[] | null
          location?: string | null
          occupation?: string | null
          phone?: string | null
          timezone?: string | null
          updated_at?: string
          username?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          experience_level?: string | null
          full_name?: string | null
          id?: string
          interests?: string[] | null
          location?: string | null
          occupation?: string | null
          phone?: string | null
          timezone?: string | null
          updated_at?: string
          username?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      saved_newsletters: {
        Row: {
          collection_id: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          is_favorite: boolean | null
          last_read_at: string | null
          newsletter_id: string
          notes: string | null
          read_status: string | null
          reading_progress: number | null
          saved_at: string
          tags: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          collection_id?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          last_read_at?: string | null
          newsletter_id: string
          notes?: string | null
          read_status?: string | null
          reading_progress?: number | null
          saved_at?: string
          tags?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          collection_id?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          last_read_at?: string | null
          newsletter_id?: string
          notes?: string | null
          read_status?: string | null
          reading_progress?: number | null
          saved_at?: string
          tags?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_newsletters_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_analytics: {
        Row: {
          created_at: string
          event_type: string
          from_plan_id: string | null
          id: string
          properties: Json | null
          revenue_change: number | null
          subscription_id: string | null
          to_plan_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          from_plan_id?: string | null
          id?: string
          properties?: Json | null
          revenue_change?: number | null
          subscription_id?: string | null
          to_plan_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          from_plan_id?: string | null
          id?: string
          properties?: Json | null
          revenue_change?: number | null
          subscription_id?: string | null
          to_plan_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_analytics_from_plan_id_fkey"
            columns: ["from_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_analytics_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_analytics_to_plan_id_fkey"
            columns: ["to_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          features: Json
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          price_monthly: number
          price_yearly: number
          slug: string
        }
        Insert: {
          created_at?: string
          features: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          price_monthly: number
          price_yearly: number
          slug: string
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          price_monthly?: number
          price_yearly?: number
          slug?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_cohorts: {
        Row: {
          cohort_month: string
          created_at: string
          first_purchase_date: string | null
          id: string
          signup_date: string
          subscription_start_date: string | null
          user_id: string
        }
        Insert: {
          cohort_month: string
          created_at?: string
          first_purchase_date?: string | null
          id?: string
          signup_date: string
          subscription_start_date?: string | null
          user_id: string
        }
        Update: {
          cohort_month?: string
          created_at?: string
          first_purchase_date?: string | null
          id?: string
          signup_date?: string
          subscription_start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          activity_visibility: boolean | null
          analytics_opt_out: boolean | null
          content_categories: string[] | null
          content_length_preference: string | null
          created_at: string
          currency: string | null
          date_format: string | null
          difficulty_level: string | null
          email_notifications: Json | null
          id: string
          language: string | null
          marketing_communications: boolean | null
          personalization_enabled: boolean | null
          profile_visibility: string | null
          push_notifications: Json | null
          quiet_hours: Json | null
          reading_activity_visible: boolean | null
          theme: string | null
          timezone_display: string | null
          update_frequency: string | null
          updated_at: string
          user_id: string
          wishlist_sharing: boolean | null
        }
        Insert: {
          activity_visibility?: boolean | null
          analytics_opt_out?: boolean | null
          content_categories?: string[] | null
          content_length_preference?: string | null
          created_at?: string
          currency?: string | null
          date_format?: string | null
          difficulty_level?: string | null
          email_notifications?: Json | null
          id?: string
          language?: string | null
          marketing_communications?: boolean | null
          personalization_enabled?: boolean | null
          profile_visibility?: string | null
          push_notifications?: Json | null
          quiet_hours?: Json | null
          reading_activity_visible?: boolean | null
          theme?: string | null
          timezone_display?: string | null
          update_frequency?: string | null
          updated_at?: string
          user_id: string
          wishlist_sharing?: boolean | null
        }
        Update: {
          activity_visibility?: boolean | null
          analytics_opt_out?: boolean | null
          content_categories?: string[] | null
          content_length_preference?: string | null
          created_at?: string
          currency?: string | null
          date_format?: string | null
          difficulty_level?: string | null
          email_notifications?: Json | null
          id?: string
          language?: string | null
          marketing_communications?: boolean | null
          personalization_enabled?: boolean | null
          profile_visibility?: string | null
          push_notifications?: Json | null
          quiet_hours?: Json | null
          reading_activity_visible?: boolean | null
          theme?: string | null
          timezone_display?: string | null
          update_frequency?: string | null
          updated_at?: string
          user_id?: string
          wishlist_sharing?: boolean | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device_info: Json | null
          id: string
          ip_address: string | null
          last_activity: string | null
          location: string | null
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          location?: string | null
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          location?: string | null
          session_token?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          billing_cycle: string
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_cycle?: string
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_cycle?: string
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_categories: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          added_at: string
          category_id: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          notes: string | null
          price_alert_target: number | null
          price_current: number | null
          price_original: number | null
          priority: string | null
          product_id: string
          product_url: string | null
          stock_alert_enabled: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          added_at?: string
          category_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          notes?: string | null
          price_alert_target?: number | null
          price_current?: number | null
          price_original?: number | null
          priority?: string | null
          product_id: string
          product_url?: string | null
          stock_alert_enabled?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          added_at?: string
          category_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          notes?: string | null
          price_alert_target?: number | null
          price_current?: number | null
          price_original?: number | null
          priority?: string | null
          product_id?: string
          product_url?: string | null
          stock_alert_enabled?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "wishlist_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["admin_role"]
      }
      get_newsletter_metrics: {
        Args: {
          newsletter_id_param?: string
          start_date?: string
          end_date?: string
        }
        Returns: {
          total_sent: number
          total_delivered: number
          total_opened: number
          total_clicked: number
          total_unsubscribed: number
          open_rate: number
          click_rate: number
          unsubscribe_rate: number
        }[]
      }
      get_revenue_metrics: {
        Args: { start_date?: string; end_date?: string }
        Returns: {
          total_revenue: number
          total_orders: number
          avg_order_value: number
          conversion_rate: number
        }[]
      }
      get_user_metrics: {
        Args: { start_date?: string; end_date?: string }
        Returns: {
          new_users: number
          active_users: number
          retention_rate: number
          churn_rate: number
        }[]
      }
      get_user_subscription: {
        Args: { user_uuid: string }
        Returns: {
          plan_name: string
          plan_slug: string
          status: string
          billing_cycle: string
          current_period_end: string
          cancel_at_period_end: boolean
        }[]
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "editor" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["super_admin", "admin", "editor", "moderator"],
    },
  },
} as const
