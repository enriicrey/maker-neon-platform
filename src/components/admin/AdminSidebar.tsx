
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mail, 
  Package, 
  Users, 
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  Shield,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const menuItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Newsletters',
    href: '/admin/newsletters',
    icon: Mail,
    badge: 3,
  },
  {
    title: 'Productos',
    href: '/admin/products',
    icon: Package,
    badge: 12,
  },
  {
    title: 'Usuarios',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Pedidos',
    href: '/admin/orders',
    icon: ShoppingCart,
    badge: 5,
  },
  {
    title: 'Configuración',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Logs',
    href: '/admin/logs',
    icon: FileText,
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-20 h-[calc(100vh-5rem)] bg-dark-surface border-r border-dark-border transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
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
                  <span className="font-medium flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default AdminSidebar;
