
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DateRange {
  start: string;
  end: string;
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  comparison: 'previous' | 'year_ago' | 'none';
  segment: 'all' | 'free' | 'premium' | 'vip';
  geography: string;
  device: 'all' | 'desktop' | 'mobile' | 'tablet';
}

export interface NewsletterMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  averageOpenRate: number;
  averageClickRate: number;
  unsubscribeRate: number;
}

export interface RevenueMetrics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
}

export interface UserMetrics {
  newUsers: number;
  activeUsers: number;
  retentionRate: number;
  churnRate: number;
}

export const useAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    comparison: 'previous',
    segment: 'all',
    geography: 'all',
    device: 'all'
  });

  const [newsletterMetrics, setNewsletterMetrics] = useState<NewsletterMetrics | null>(null);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [userMetrics, setUserMetrics] = useState<UserMetrics | null>(null);

  const fetchNewsletterMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('get_newsletter_metrics', {
        start_date: filters.dateRange.start,
        end_date: filters.dateRange.end
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const metrics = data[0];
        setNewsletterMetrics({
          totalSubscribers: metrics.total_sent || 0,
          activeSubscribers: metrics.total_delivered || 0,
          averageOpenRate: metrics.open_rate || 0,
          averageClickRate: metrics.click_rate || 0,
          unsubscribeRate: metrics.unsubscribe_rate || 0
        });
      }
    } catch (err) {
      console.error('Error fetching newsletter metrics:', err);
      setError('Failed to fetch newsletter metrics');
    }
  };

  const fetchRevenueMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('get_revenue_metrics', {
        start_date: filters.dateRange.start,
        end_date: filters.dateRange.end
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const metrics = data[0];
        setRevenueMetrics({
          totalRevenue: metrics.total_revenue || 0,
          totalOrders: metrics.total_orders || 0,
          avgOrderValue: metrics.avg_order_value || 0,
          conversionRate: metrics.conversion_rate || 0
        });
      }
    } catch (err) {
      console.error('Error fetching revenue metrics:', err);
      setError('Failed to fetch revenue metrics');
    }
  };

  const fetchUserMetrics = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_metrics', {
        start_date: filters.dateRange.start,
        end_date: filters.dateRange.end
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const metrics = data[0];
        setUserMetrics({
          newUsers: metrics.new_users || 0,
          activeUsers: metrics.active_users || 0,
          retentionRate: metrics.retention_rate || 0,
          churnRate: metrics.churn_rate || 0
        });
      }
    } catch (err) {
      console.error('Error fetching user metrics:', err);
      setError('Failed to fetch user metrics');
    }
  };

  const fetchAllMetrics = async () => {
    setLoading(true);
    setError(null);
    
    await Promise.all([
      fetchNewsletterMetrics(),
      fetchRevenueMetrics(),
      fetchUserMetrics()
    ]);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchAllMetrics();
  }, [filters]);

  return {
    loading,
    error,
    filters,
    setFilters,
    newsletterMetrics,
    revenueMetrics,
    userMetrics,
    refetch: fetchAllMetrics
  };
};
