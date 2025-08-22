import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import AdminNewsletters from './pages/AdminNewsletters';
import AdminAnalyticsPage from './pages/AdminAnalytics';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <SubscriptionProvider>
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
              <Toaster />
              <ScrollToTop />
            </SubscriptionProvider>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
