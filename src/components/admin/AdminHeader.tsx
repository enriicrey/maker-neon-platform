
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  isCollapsed: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="h-20 px-6 flex items-center justify-between bg-dark-surface border-b border-dark-border">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
            <DropdownMenuItem className="text-gray-300">
              <User className="mr-2 h-4 w-4" />
              <span>{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem onClick={handleSignOut} className="text-gray-300">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
