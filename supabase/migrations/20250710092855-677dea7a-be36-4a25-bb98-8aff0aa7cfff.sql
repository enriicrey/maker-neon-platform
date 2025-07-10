
-- Create analytics tracking tables
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter analytics
CREATE TABLE public.newsletter_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  newsletter_id UUID REFERENCES public.newsletters(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users,
  event_type TEXT NOT NULL CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'unsubscribed', 'bounced')),
  link_url TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product analytics
CREATE TABLE public.product_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users,
  event_type TEXT NOT NULL CHECK (event_type IN ('viewed', 'added_to_cart', 'removed_from_cart', 'purchased', 'reviewed')),
  properties JSONB DEFAULT '{}',
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscription analytics
CREATE TABLE public.subscription_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  subscription_id UUID REFERENCES public.user_subscriptions(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('subscribed', 'upgraded', 'downgraded', 'cancelled', 'reactivated', 'payment_failed', 'payment_recovered')),
  from_plan_id UUID REFERENCES public.subscription_plans(id),
  to_plan_id UUID REFERENCES public.subscription_plans(id),
  revenue_change INTEGER DEFAULT 0, -- Change in cents
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily metrics summary table for performance
CREATE TABLE public.daily_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_date DATE NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  metric_meta JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metric_date, metric_type)
);

-- Create cohort analysis table
CREATE TABLE public.user_cohorts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  cohort_month DATE NOT NULL, -- First day of signup month
  signup_date DATE NOT NULL,
  first_purchase_date DATE,
  subscription_start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics reports table
CREATE TABLE public.analytics_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly', 'custom')),
  configuration JSONB NOT NULL DEFAULT '{}',
  schedule_config JSONB DEFAULT '{}',
  recipients TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES auth.users NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on analytics tables
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
CREATE POLICY "Admins can manage analytics events" ON public.analytics_events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage newsletter analytics" ON public.newsletter_analytics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage product analytics" ON public.product_analytics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage subscription analytics" ON public.subscription_analytics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can view daily metrics" ON public.daily_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can view user cohorts" ON public.user_cohorts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can manage analytics reports" ON public.analytics_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

-- Create indexes for performance
CREATE INDEX idx_analytics_events_user_created ON public.analytics_events(user_id, created_at DESC);
CREATE INDEX idx_analytics_events_type_created ON public.analytics_events(event_type, created_at DESC);
CREATE INDEX idx_newsletter_analytics_newsletter_event ON public.newsletter_analytics(newsletter_id, event_type, created_at DESC);
CREATE INDEX idx_product_analytics_product_event ON public.product_analytics(product_id, event_type, created_at DESC);
CREATE INDEX idx_subscription_analytics_user_event ON public.subscription_analytics(user_id, event_type, created_at DESC);
CREATE INDEX idx_daily_metrics_date_type ON public.daily_metrics(metric_date DESC, metric_type);
CREATE INDEX idx_user_cohorts_month ON public.user_cohorts(cohort_month);

-- Create analytics functions
CREATE OR REPLACE FUNCTION public.get_newsletter_metrics(
  newsletter_id_param UUID DEFAULT NULL,
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_sent INTEGER,
  total_delivered INTEGER,
  total_opened INTEGER,
  total_clicked INTEGER,
  total_unsubscribed INTEGER,
  open_rate DECIMAL(5,2),
  click_rate DECIMAL(5,2),
  unsubscribe_rate DECIMAL(5,2)
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  WITH newsletter_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE event_type = 'sent') as sent_count,
      COUNT(*) FILTER (WHERE event_type = 'delivered') as delivered_count,
      COUNT(*) FILTER (WHERE event_type = 'opened') as opened_count,
      COUNT(*) FILTER (WHERE event_type = 'clicked') as clicked_count,
      COUNT(*) FILTER (WHERE event_type = 'unsubscribed') as unsubscribed_count
    FROM public.newsletter_analytics na
    WHERE (newsletter_id_param IS NULL OR na.newsletter_id = newsletter_id_param)
      AND na.created_at::date BETWEEN start_date AND end_date
  )
  SELECT 
    sent_count::INTEGER,
    delivered_count::INTEGER,
    opened_count::INTEGER,
    clicked_count::INTEGER,
    unsubscribed_count::INTEGER,
    CASE WHEN delivered_count > 0 THEN (opened_count::DECIMAL / delivered_count * 100) ELSE 0 END,
    CASE WHEN delivered_count > 0 THEN (clicked_count::DECIMAL / delivered_count * 100) ELSE 0 END,
    CASE WHEN sent_count > 0 THEN (unsubscribed_count::DECIMAL / sent_count * 100) ELSE 0 END
  FROM newsletter_stats;
$$;

CREATE OR REPLACE FUNCTION public.get_revenue_metrics(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_revenue DECIMAL(15,2),
  total_orders INTEGER,
  avg_order_value DECIMAL(10,2),
  conversion_rate DECIMAL(5,2)
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  WITH order_stats AS (
    SELECT 
      SUM(total_amount) as revenue_cents,
      COUNT(*) as order_count
    FROM public.orders
    WHERE created_at::date BETWEEN start_date AND end_date
      AND payment_status = 'paid'
  ),
  visitor_stats AS (
    SELECT COUNT(DISTINCT session_id) as unique_visitors
    FROM public.analytics_events
    WHERE created_at::date BETWEEN start_date AND end_date
      AND event_type = 'page_view'
  )
  SELECT 
    (os.revenue_cents / 100.0)::DECIMAL(15,2),
    os.order_count::INTEGER,
    CASE WHEN os.order_count > 0 THEN (os.revenue_cents / 100.0 / os.order_count)::DECIMAL(10,2) ELSE 0 END,
    CASE WHEN vs.unique_visitors > 0 THEN (os.order_count::DECIMAL / vs.unique_visitors * 100) ELSE 0 END
  FROM order_stats os, visitor_stats vs;
$$;

CREATE OR REPLACE FUNCTION public.get_user_metrics(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  new_users INTEGER,
  active_users INTEGER,
  retention_rate DECIMAL(5,2),
  churn_rate DECIMAL(5,2)
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  WITH user_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE created_at::date BETWEEN start_date AND end_date) as new_user_count,
      COUNT(DISTINCT user_id) FILTER (WHERE created_at::date BETWEEN start_date AND end_date) as active_user_count
    FROM public.analytics_events
    WHERE user_id IS NOT NULL
  ),
  retention_stats AS (
    SELECT 
      COUNT(*) as total_subscriptions,
      COUNT(*) FILTER (WHERE sa.event_type = 'cancelled') as cancelled_subscriptions
    FROM public.subscription_analytics sa
    WHERE sa.created_at::date BETWEEN start_date - INTERVAL '30 days' AND end_date
  )
  SELECT 
    us.new_user_count::INTEGER,
    us.active_user_count::INTEGER,
    CASE WHEN rs.total_subscriptions > 0 THEN ((rs.total_subscriptions - rs.cancelled_subscriptions)::DECIMAL / rs.total_subscriptions * 100) ELSE 0 END,
    CASE WHEN rs.total_subscriptions > 0 THEN (rs.cancelled_subscriptions::DECIMAL / rs.total_subscriptions * 100) ELSE 0 END
  FROM user_stats us, retention_stats rs;
$$;

-- Create trigger to automatically populate user cohorts
CREATE OR REPLACE FUNCTION public.create_user_cohort()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_cohorts (user_id, cohort_month, signup_date)
  VALUES (
    NEW.id,
    DATE_TRUNC('month', NEW.created_at)::DATE,
    NEW.created_at::DATE
  );
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users (this will be handled by the auth system)
-- We'll need to manually populate cohorts for existing users
