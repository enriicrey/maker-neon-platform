
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingBag, 
  Heart, 
  Settings, 
  HelpCircle,
  User,
  Bell,
  Star,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Mi Biblioteca',
    href: '/dashboard/library',
    icon: BookOpen,
    badge: 3,
  },
  {
    title: 'Mis Pedidos',
    href: '/dashboard/orders',
    icon: ShoppingBag,
  },
  {
    title: 'Wishlist',
    href: '/dashboard/wishlist',
    icon: Heart,
    badge: 7,
  },
  {
    title: 'Mi Perfil',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Soporte',
    href: '/dashboard/support',
    icon: HelpCircle,
  },
];

interface DashboardSidebarProps {
  isCollapsed: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-20 h-[calc(100vh-5rem)] bg-dark-surface border-r border-dark-border transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group relative",
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.title}
                  {item.badge && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Gamification section */}
      {!isCollapsed && (
        <div className="p-4 mt-6 border-t border-dark-border">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Progreso</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Lector Activo</span>
                  <span className="text-gray-400">75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Coleccionista</span>
                  <span className="text-gray-400">45%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
