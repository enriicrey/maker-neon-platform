import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import ScrollToTop from './utils/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Dashboard from './pages/Dashboard';
import Newsletters from './pages/Newsletters';
import Wishlist from './pages/Wishlist';
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
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />

                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/newsletters" element={<Newsletters />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                
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
