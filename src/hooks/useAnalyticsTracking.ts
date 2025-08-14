import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, string | number>;
}

interface ConversionEvent {
  transactionId: string;
  value: number;
  currency: string;
  items: Array<{
    itemId: string;
    itemName: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

// Core Web Vitals tracking
interface WebVital {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  id: string;
}

export const useAnalyticsTracking = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // Track Core Web Vitals
    trackWebVitals();
  }, [location.pathname]);

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: event.customDimensions,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CustomEvent', {
        event_name: event.action,
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Send to our analytics API
    sendToCustomAnalytics(event);
  }, []);

  // Track conversions
  const trackConversion = useCallback((conversion: ConversionEvent) => {
    // Google Analytics 4 Enhanced E-commerce
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: conversion.transactionId,
        value: conversion.value,
        currency: conversion.currency,
        items: conversion.items.map(item => ({
          item_id: item.itemId,
          item_name: item.itemName,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }

    // Facebook Pixel Purchase Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: conversion.value,
        currency: conversion.currency,
        content_ids: conversion.items.map(item => item.itemId),
        content_type: 'product',
      });
    }
  }, []);

  // Track user engagement
  const trackEngagement = useCallback((type: 'scroll' | 'time' | 'click', data?: any) => {
    switch (type) {
      case 'scroll':
        trackEvent({
          action: 'scroll_depth',
          category: 'engagement',
          label: `${data.percentage}%`,
          value: data.percentage,
        });
        break;
      case 'time':
        trackEvent({
          action: 'time_on_page',
          category: 'engagement',
          label: data.page,
          value: data.seconds,
        });
        break;
      case 'click':
        trackEvent({
          action: 'element_click',
          category: 'engagement',
          label: data.element,
          customDimensions: {
            element_text: data.text,
            element_position: data.position,
          },
        });
        break;
    }
  }, [trackEvent]);

  // Track newsletter interactions
  const trackNewsletterEvent = useCallback((action: 'signup' | 'open' | 'click' | 'unsubscribe', data?: any) => {
    trackEvent({
      action: `newsletter_${action}`,
      category: 'newsletter',
      label: data?.newsletterId,
      customDimensions: {
        source: data?.source,
        campaign: data?.campaign,
      },
    });
  }, [trackEvent]);

  // Track product interactions
  const trackProductEvent = useCallback((action: 'view' | 'add_to_cart' | 'remove_from_cart' | 'add_to_wishlist', data?: any) => {
    trackEvent({
      action: `product_${action}`,
      category: 'ecommerce',
      label: data?.productId,
      value: data?.price,
      customDimensions: {
        product_name: data?.name,
        category: data?.category,
        brand: data?.brand,
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackConversion,
    trackEngagement,
    trackNewsletterEvent,
    trackProductEvent,
  };
};

// Track Core Web Vitals
const trackWebVitals = () => {
  if ('web-vitals' in window) {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = (window as any)['web-vitals'];
    
    const sendToAnalytics = ({ name, value, id }: WebVital) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(name === 'CLS' ? value * 1000 : value),
          non_interaction: true,
        });
      }
    };

    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }
};

// Send data to custom analytics endpoint
const sendToCustomAnalytics = async (event: AnalyticsEvent) => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        sessionId: getSessionId(),
      }),
    });
  } catch (error) {
    console.warn('Failed to send analytics event:', error);
  }
};

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};