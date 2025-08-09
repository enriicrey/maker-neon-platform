import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export function usePerformanceMonitor() {
  const metricsRef = useRef<PerformanceMetrics>({});

  // Measure Largest Contentful Paint (LCP)
  const measureLCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metricsRef.current.lcp = lastEntry.startTime;
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);

  // Measure First Input Delay (FID)
  const measureFID = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          metricsRef.current.fid = entry.processingStart - entry.startTime;
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }, []);

  // Measure Cumulative Layout Shift (CLS)
  const measureCLS = useCallback(() => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metricsRef.current.cls = clsValue;
          }
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  // Measure First Contentful Paint (FCP)
  const measureFCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metricsRef.current.fcp = entry.startTime;
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
    }
  }, []);

  // Measure Time to First Byte (TTFB)
  const measureTTFB = useCallback(() => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metricsRef.current.ttfb = navigation.responseStart - navigation.requestStart;
      }
    }
  }, []);

  // Send metrics to analytics
  const sendMetrics = useCallback(() => {
    // In a real app, send to analytics service
    console.log('Performance Metrics:', metricsRef.current);
    
    // Example: Send to Google Analytics
    if (typeof (window as any).gtag !== 'undefined') {
      Object.entries(metricsRef.current).forEach(([metric, value]) => {
        if (value) {
          (window as any).gtag('event', metric, {
            value: Math.round(value),
            custom_parameter: 'performance_monitoring'
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    measureLCP();
    measureFID();
    measureCLS();
    measureFCP();
    measureTTFB();

    // Send metrics after page load
    const timer = setTimeout(sendMetrics, 5000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [measureLCP, measureFID, measureCLS, measureFCP, measureTTFB, sendMetrics]);

  return metricsRef.current;
}