import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, Heart, User, Grid3X3 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { state: cartState } = useCart();
  const { wishlistItems } = useWishlist();

  if (!isMobile) return null;

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Inicio',
      icon: Home,
      path: '/'
    },
    {
      id: 'drops',
      label: 'Drops',
      icon: Package,
      path: '/drops'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Grid3X3,
      path: '/dashboard'
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      path: '/dashboard/wishlist',
      badge: wishlistItems?.length || 0
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      path: '/dashboard/configuracion'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <nav className="flex h-16 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors
                ${active 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${active ? 'fill-current' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center p-0 text-xs"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="truncate">{item.label}</span>
              
              {active && (
                <div className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-background" />
    </div>
  );
}

export default BottomNavigation;