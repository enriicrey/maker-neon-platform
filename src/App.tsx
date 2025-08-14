import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "sonner";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/ui/loading-spinner';
import ErrorBoundary from './components/ErrorBoundary';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { setCSPHeaders } from './utils/security';
import InstallPrompt from './components/pwa/InstallPrompt';
import UpdateNotification from './components/pwa/UpdateNotification';
import OfflineIndicator from './components/pwa/OfflineIndicator';
import BottomNavigation from './components/mobile/BottomNavigation';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminNewsletters = lazy(() => import('./pages/AdminNewsletters'));
const AdminAnalyticsPage = lazy(() => import('./pages/AdminAnalytics'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in v5)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Performance monitoring component
const PerformanceMonitor: React.FC = () => {
  usePerformanceMonitor();
  return null;
};

function App() {
  useEffect(() => {
    // Set security headers
    setCSPHeaders();
    
    // Preload critical resources
    const preloadResources = [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
      { href: '/manifest.json', as: 'manifest' },
      { href: '/logo-192.png', as: 'image' }
    ];
    
    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
          <ErrorBoundary>
            <AuthProvider>
              <CartProvider>
                <NotificationProvider>
                  <SubscriptionProvider>
                    <PerformanceMonitor />
                    <GoogleAnalytics measurementId="GA_MEASUREMENT_ID" />
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />

                        {/* User Dashboard Routes */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/newsletters" element={<AdminNewsletters />} />
                        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                      </Routes>
                    </Suspense>
                    <Toaster />
                    <ScrollToTop />
                    <InstallPrompt />
                    <UpdateNotification />
                    <OfflineIndicator />
                    <BottomNavigation />
                  </SubscriptionProvider>
                </NotificationProvider>
              </CartProvider>
            </AuthProvider>
            </ErrorBoundary>
          </Router>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
