
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import DashboardLibrary from "./pages/DashboardLibrary";
import DashboardBiblioteca from "./pages/DashboardBiblioteca";
import DashboardWishlist from "./pages/DashboardWishlist";
import DashboardConfiguracion from "./pages/DashboardConfiguracion";
import Newsletter from "./pages/Newsletter";
import NewsletterDetail from "./pages/NewsletterDetail";
import Drops from "./pages/Drops";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Suscripcion from "./pages/Suscripcion";
import NotFound from "./pages/NotFound";
// Admin imports
import Admin from "./pages/Admin";
import AdminNewsletters from "./pages/AdminNewsletters";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <SubscriptionProvider>
                <Toaster />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/library" element={<DashboardLibrary />} />
                    <Route path="/dashboard/biblioteca" element={<DashboardBiblioteca />} />
                    <Route path="/dashboard/wishlist" element={<DashboardWishlist />} />
                    <Route path="/dashboard/configuracion" element={<DashboardConfiguracion />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/newsletter/:slug" element={<NewsletterDetail />} />
                    <Route path="/drops" element={<Drops />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/suscripcion" element={<Suscripcion />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/newsletters" element={<AdminNewsletters />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </SubscriptionProvider>
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
