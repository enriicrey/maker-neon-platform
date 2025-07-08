
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import { NotificationBell } from '@/components/notifications/NotificationBell';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
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
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors block py-2">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
