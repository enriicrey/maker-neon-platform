
import React from 'react';
import { Menu, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar, isCollapsed }) => {
  const { user, signOut } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    return user?.email?.split('@')[0] || 'Usuario';
  };

  return (
    <header className="bg-dark-surface border-b border-dark-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-white">
              {getGreeting()}, {getUserName()}!
            </h1>
            <p className="text-sm text-gray-400">
              Bienvenido de vuelta a tu dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={getUserName()} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {getUserName().charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-white">{getUserName()}</p>
                  <p className="w-[200px] truncate text-sm text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 focus:bg-gray-700 focus:text-white">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 focus:bg-gray-700 focus:text-white">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem 
                onClick={signOut}
                className="text-gray-300 focus:bg-gray-700 focus:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
