
-- Create admin roles system
CREATE TYPE public.admin_role AS ENUM ('super_admin', 'admin', 'editor', 'moderator');

-- Create admin_users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  role admin_role NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users,
  is_active BOOLEAN DEFAULT true
);

-- Create newsletters table
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image_url TEXT,
  category_id UUID,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'archived', 'deleted')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  open_rate DECIMAL(5,2) DEFAULT 0,
  click_rate DECIMAL(5,2) DEFAULT 0,
  total_recipients INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter categories
CREATE TABLE public.newsletter_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents
  sku TEXT UNIQUE,
  category_id UUID,
  tags TEXT[] DEFAULT '{}',
  images JSONB DEFAULT '[]',
  featured_image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  allow_backorder BOOLEAN DEFAULT false,
  track_stock BOOLEAN DEFAULT true,
  is_drop BOOLEAN DEFAULT false,
  drop_date TIMESTAMP WITH TIME ZONE,
  is_member_exclusive BOOLEAN DEFAULT false,
  early_access_hours INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product categories
CREATE TABLE public.product_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.product_categories(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  total_amount INTEGER NOT NULL, -- Total in cents
  subtotal INTEGER NOT NULL,
  tax_amount INTEGER DEFAULT 0,
  shipping_amount INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  shipping_address JSONB,
  billing_address JSONB,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL, -- Price in cents
  total_price INTEGER NOT NULL -- quantity * unit_price
);

-- Create admin activity logs
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES public.admin_users(id) NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system settings
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES auth.users,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE public.newsletters ADD CONSTRAINT fk_newsletter_category 
  FOREIGN KEY (category_id) REFERENCES public.newsletter_categories(id);

ALTER TABLE public.products ADD CONSTRAINT fk_product_category 
  FOREIGN KEY (category_id) REFERENCES public.product_categories(id);

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
CREATE POLICY "Admin users can manage all records" ON public.admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage newsletters" ON public.newsletters
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage newsletter categories" ON public.newsletter_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage product categories" ON public.product_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can view all order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage activity logs" ON public.admin_activity_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true AND au.role IN ('super_admin', 'admin')
    )
  );

CREATE POLICY "Admins can manage system settings" ON public.system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true AND au.role IN ('super_admin', 'admin')
    )
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid AND is_active = true
  );
$$;

-- Create function to get admin role
CREATE OR REPLACE FUNCTION public.get_admin_role(user_uuid UUID)
RETURNS admin_role
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT role FROM public.admin_users 
  WHERE user_id = user_uuid AND is_active = true
  LIMIT 1;
$$;

-- Insert default categories
INSERT INTO public.newsletter_categories (name, slug, description, color) VALUES
  ('General', 'general', 'General announcements and updates', '#3B82F6'),
  ('Products', 'products', 'Product updates and launches', '#10B981'),
  ('Community', 'community', 'Community highlights and features', '#F59E0B'),
  ('Technical', 'technical', 'Technical updates and tutorials', '#8B5CF6');

INSERT INTO public.product_categories (name, slug, description) VALUES
  ('3D Models', '3d-models', 'Digital 3D model files'),
  ('Physical Products', 'physical-products', 'Physical merchandise and products'),
  ('Accessories', 'accessories', 'Product accessories and add-ons'),
  ('Limited Drops', 'limited-drops', 'Exclusive limited-time products');

-- Insert default system settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('site_name', '"Soy Maker 3D"', 'Site name displayed in admin and emails'),
  ('admin_email', '"admin@soymaker3d.com"', 'Main admin email address'),
  ('items_per_page', '20', 'Default items per page in admin lists'),
  ('low_stock_threshold', '5', 'Default low stock alert threshold'),
  ('email_notifications', '{"enabled": true, "daily_digest": true, "low_stock_alerts": true}', 'Email notification settings');
