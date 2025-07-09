
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_popular: boolean;
}

interface UserSubscription {
  plan_name: string;
  plan_slug: string;
  status: string;
  billing_cycle: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface SubscriptionContextType {
  currentSubscription: UserSubscription | null;
  availablePlans: SubscriptionPlan[];
  isLoading: boolean;
  hasAccess: (feature: string) => boolean;
  isPremium: boolean;
  isVIP: boolean;
  refetchSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const { data: currentSubscription, isLoading: subscriptionLoading, refetch: refetchSubscription } = useQuery({
    queryKey: ['user-subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .rpc('get_user_subscription', { user_uuid: user.id });
      
      if (error) throw error;
      return data?.[0] as UserSubscription | null;
    },
    enabled: !!user,
  });

  const { data: availablePlans = [], isLoading: plansLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });
      
      if (error) throw error;
      return data as SubscriptionPlan[];
    },
  });

  const hasAccess = (feature: string): boolean => {
    if (!currentSubscription) return false;
    
    const planSlug = currentSubscription.plan_slug;
    
    // Define feature access by plan
    const featureAccess: Record<string, string[]> = {
      'free': ['newsletter_basic', 'community_basic'],
      'premium': ['newsletter_basic', 'newsletter_premium', 'drops_premium', 'community_basic', 'community_premium', 'discount_15'],
      'vip': ['newsletter_basic', 'newsletter_premium', 'drops_premium', 'early_access', 'consultation', 'community_basic', 'community_premium', 'community_vip', 'discount_25', 'beta_access']
    };

    return featureAccess[planSlug]?.includes(feature) || false;
  };

  const isPremium = currentSubscription?.plan_slug === 'premium' || currentSubscription?.plan_slug === 'vip';
  const isVIP = currentSubscription?.plan_slug === 'vip';

  const value = {
    currentSubscription,
    availablePlans,
    isLoading: subscriptionLoading || plansLoading,
    hasAccess,
    isPremium,
    isVIP,
    refetchSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
