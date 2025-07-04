
import { useState, useEffect } from 'react';
import { Menu, X, Search, Bell, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context
  const [notificationCount, setNotificationCount] = useState(3); // Mock notification count
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Newsletter', path: '/newsletter', hasDropdown: true },
    { name: 'Drops', path: '/drops' },
    { name: 'Consultoría', path: '/consultoria' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const newsletterDropdownItems = [
    { name: 'Archivo Completo', path: '/newsletter/archivo' },
    { name: 'Última Edición', path: '/newsletter/latest' },
    { name: 'Suscribirse', path: '/suscripcion' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      // Open search modal - would implement search functionality
      console.log('Search shortcut triggered');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-dark-border' 
            : 'bg-transparent border-b border-dark-border/50'
        } h-20 lg:h-20 md:h-16 sm:h-16`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-black font-bold text-lg">3D</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gradient font-sans tracking-tight">
                SOY MAKER 3D
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.hasDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 ${
                            isActive(item.path)
                              ? 'text-primary bg-primary/10 border border-primary/20'
                              : 'text-white'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        className="bg-dark-surface border border-primary/20 shadow-xl shadow-primary/10 animate-fade-in"
                        align="center"
                      >
                        {newsletterDropdownItems.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.path} asChild>
                            <Link
                              to={dropdownItem.path}
                              className="text-white hover:text-primary hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
                            >
                              {dropdownItem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/5 ${
                        isActive(item.path)
                          ? 'text-primary bg-primary/10 border border-primary/20'
                          : 'text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <button
                className="p-2 rounded-lg hover:bg-dark-surface transition-colors duration-300 text-white hover:text-primary"
                title="Buscar (Ctrl+K)"
              >
                <Search size={20} />
              </button>

              {/* Notifications (only when logged in) */}
              {isLoggedIn && (
                <button className="relative p-2 rounded-lg hover:bg-dark-surface transition-colors duration-300 text-white hover:text-primary">
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </button>
              )}

              {/* CTA Button */}
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 bg-primary text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:brightness-110"
                >
                  <User size={16} />
                  <span>Mi Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/suscripcion"
                  className="bg-primary text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:brightness-110"
                >
                  Suscríbete Gratis
                </Link>
              )}
            </div>

            {/* Mobile/Tablet Actions */}
            <div className="flex lg:hidden items-center space-x-3">
              {/* Search Icon */}
              <button
                className="p-2 rounded-lg hover:bg-dark-surface transition-colors duration-300 text-white"
                title="Buscar"
              >
                <Search size={20} />
              </button>

              {/* Mobile CTA */}
              {!isLoggedIn && (
                <Link
                  to="/suscripcion"
                  className="bg-primary text-black font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:brightness-110"
                >
                  Suscríbete
                </Link>
              )}

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-dark-surface transition-colors duration-300 text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Slide Menu */}
          <div className="absolute top-0 right-0 w-80 max-w-[80vw] h-full bg-dark-surface border-l border-dark-border shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <span className="text-lg font-bold text-gradient">Menú</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-dark-bg transition-colors duration-300 text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 py-6">
                <div className="px-6 space-y-2">
                  {navItems.map((item) => (
                    <div key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-primary bg-primary/10 border border-primary/20'
                            : 'text-white hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {item.name}
                      </Link>
                      
                      {/* Newsletter Dropdown Items */}
                      {item.hasDropdown && (
                        <div className="ml-4 mt-2 space-y-1">
                          {newsletterDropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 text-sm text-muted hover:text-primary transition-colors duration-200"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile CTA Section */}
                <div className="px-6 mt-8 pt-6 border-t border-dark-border">
                  {isLoggedIn ? (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 w-full bg-primary text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:brightness-110"
                    >
                      <User size={18} />
                      <span>Mi Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      to="/suscripcion"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-primary text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:brightness-110"
                    >
                      Suscríbete Gratis
                    </Link>
                  )}
                </div>
              </div>

              {/* Footer Info */}
              <div className="px-6 py-4 border-t border-dark-border">
                <p className="text-xs text-muted text-center">
                  © 2024 Soy Maker 3D. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
