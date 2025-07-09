
-- Create collections table for organizing newsletters
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create saved newsletters table
CREATE TABLE public.saved_newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  newsletter_id TEXT NOT NULL, -- Reference to external newsletter system
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  read_status TEXT DEFAULT 'unread', -- unread, reading, completed
  is_favorite BOOLEAN DEFAULT false,
  reading_progress INTEGER DEFAULT 0, -- percentage
  notes TEXT,
  tags TEXT[], -- array of custom tags
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_read_at TIMESTAMPTZ
);

-- Create wishlist categories table
CREATE TABLE public.wishlist_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#10B981',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create wishlist items table
CREATE TABLE public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES wishlist_categories(id) ON DELETE SET NULL,
  product_id TEXT NOT NULL, -- Reference to external product system
  title TEXT NOT NULL,
  description TEXT,
  price_current INTEGER, -- in cents
  price_original INTEGER, -- in cents
  image_url TEXT,
  product_url TEXT,
  priority TEXT DEFAULT 'medium', -- high, medium, low
  is_available BOOLEAN DEFAULT true,
  price_alert_target INTEGER, -- in cents
  stock_alert_enabled BOOLEAN DEFAULT true,
  notes TEXT,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create price history table for tracking
CREATE TABLE public.price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_item_id UUID REFERENCES wishlist_items(id) ON DELETE CASCADE NOT NULL,
  price INTEGER NOT NULL, -- in cents
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for collections
CREATE POLICY "collections_select_own" ON public.collections
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "collections_insert_own" ON public.collections
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "collections_update_own" ON public.collections
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "collections_delete_own" ON public.collections
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for saved_newsletters
CREATE POLICY "saved_newsletters_select_own" ON public.saved_newsletters
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "saved_newsletters_insert_own" ON public.saved_newsletters
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "saved_newsletters_update_own" ON public.saved_newsletters
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "saved_newsletters_delete_own" ON public.saved_newsletters
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for wishlist_categories
CREATE POLICY "wishlist_categories_select_own" ON public.wishlist_categories
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "wishlist_categories_insert_own" ON public.wishlist_categories
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "wishlist_categories_update_own" ON public.wishlist_categories
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "wishlist_categories_delete_own" ON public.wishlist_categories
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for wishlist_items
CREATE POLICY "wishlist_items_select_own" ON public.wishlist_items
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "wishlist_items_insert_own" ON public.wishlist_items
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "wishlist_items_update_own" ON public.wishlist_items
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "wishlist_items_delete_own" ON public.wishlist_items
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for price_history
CREATE POLICY "price_history_select_own" ON public.price_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM wishlist_items wi 
      WHERE wi.id = wishlist_item_id AND wi.user_id = auth.uid()
    )
  );
CREATE POLICY "price_history_insert_own" ON public.price_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM wishlist_items wi 
      WHERE wi.id = wishlist_item_id AND wi.user_id = auth.uid()
    )
  );
