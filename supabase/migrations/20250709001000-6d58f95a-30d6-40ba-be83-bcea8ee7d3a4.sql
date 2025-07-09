
-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_monthly INTEGER NOT NULL, -- in cents
  price_yearly INTEGER NOT NULL, -- in cents
  features JSONB NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES subscription_plans(id) NOT NULL,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, past_due, unpaid
  billing_cycle TEXT NOT NULL DEFAULT 'monthly', -- monthly, yearly
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create billing history table
CREATE TABLE public.billing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'eur',
  status TEXT NOT NULL,
  invoice_url TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_history ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans (public read)
CREATE POLICY "subscription_plans_select_all" ON public.subscription_plans
  FOR SELECT USING (is_active = true);

-- Policies for user_subscriptions
CREATE POLICY "user_subscriptions_select_own" ON public.user_subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "user_subscriptions_insert_own" ON public.user_subscriptions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "user_subscriptions_update_own" ON public.user_subscriptions
  FOR UPDATE USING (user_id = auth.uid());

-- Policies for billing_history
CREATE POLICY "billing_history_select_own" ON public.billing_history
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "billing_history_insert_own" ON public.billing_history
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, slug, price_monthly, price_yearly, features, is_popular) VALUES
('Maker', 'free', 0, 0, '["Newsletter semanal", "Acceso a drops gratuitos", "Comunidad básica", "Tutoriales básicos", "Soporte por email"]', false),
('Pro Maker', 'premium', 1900, 19000, '["Todo lo del plan Maker", "Drops premium exclusivos", "Newsletter premium (3x/semana)", "Descuentos 15%", "Soporte prioritario", "Contenido exclusivo"]', true),
('Master Maker', 'vip', 4900, 49000, '["Todo lo de Pro Maker", "Consultoría 1-on-1 (1h/mes)", "Early access (24h antes)", "Descuentos 25%", "Beta access", "Soporte WhatsApp", "Eventos exclusivos"]', false);

-- Function to get user's current subscription
CREATE OR REPLACE FUNCTION public.get_user_subscription(user_uuid UUID)
RETURNS TABLE (
  plan_name TEXT,
  plan_slug TEXT,
  status TEXT,
  billing_cycle TEXT,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    sp.name,
    sp.slug,
    us.status,
    us.billing_cycle,
    us.current_period_end,
    us.cancel_at_period_end
  FROM user_subscriptions us
  JOIN subscription_plans sp ON us.plan_id = sp.id
  WHERE us.user_id = user_uuid
  AND us.status = 'active'
  ORDER BY us.created_at DESC
  LIMIT 1;
$$;
