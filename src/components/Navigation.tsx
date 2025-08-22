
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, LogOut } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <header className="bg-dark-surface fixed top-0 left-0 w-full z-50 border-b border-dark-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Soy Maker 3D
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NotificationBell />
          <CartIcon />
          <Link to="/drops" className="text-gray-300 hover:text-white transition-colors">
            Drops
          </Link>
          <Link to="/newsletter" className="text-gray-300 hover:text-white transition-colors">
            Newsletter
          </Link>
          <Link to="/suscripcion" className="text-gray-300 hover:text-white transition-colors">
            Suscripción
          </Link>
          
          {/* Authentication section */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
                <DropdownMenuItem className="text-gray-300">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="text-gray-300 cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Registrarse
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button, only visible on small screens */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`fixed top-0 right-0 h-full w-72 bg-dark-surface border-l border-dark-border shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full animate-slide-out-right'}`}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-dark-border">
              <Link to="/" className="text-2xl font-bold text-white">
                Soy Maker 3D
              </Link>
              <div className="flex items-center gap-2">
                <NotificationBell />
                <CartIcon />
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Content */}
            <nav className="flex flex-col flex-1 px-6 py-4 space-y-4">
              <Link to="/drops" className="text-gray-300 hover:text-white transition-colors block py-2">
                Drops
              </Link>
              <Link to="/newsletter" className="text-gray-300 hover:text-white transition-colors block py-2">
                Newsletter
              </Link>
              <Link to="/suscripcion" className="text-gray-300 hover:text-white transition-colors block py-2">
                Suscripción
              </Link>

              {/* Mobile Authentication section */}
              <div className="border-t border-gray-700 pt-4 mt-4">
                {isLoading ? (
                  <div className="w-full h-8 rounded bg-gray-700 animate-pulse"></div>
                ) : user ? (
                  <div className="space-y-2">
                    <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors block py-2">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-300 hover:text-white transition-colors block py-2 w-full text-left"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block">
                      <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register" className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
