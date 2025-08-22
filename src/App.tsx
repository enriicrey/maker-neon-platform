
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "@/contexts/CartContext"; // Temporarily disabled
// import { NotificationProvider } from "@/contexts/NotificationContext"; // Temporarily disabled
// import { AuthProvider } from "@/contexts/AuthContext"; // Temporarily disabled
import CartSlideout from "@/components/cart/CartSlideout";
import Index from "./pages/Index";
import Newsletter from "./pages/Newsletter";
import NewsletterDetail from "./pages/NewsletterDetail";
import Drops from "./pages/Drops";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Suscripcion from "./pages/Suscripcion";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/:slug" element={<NewsletterDetail />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/drops/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/suscripcion" element={<Suscripcion />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CartSlideout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
