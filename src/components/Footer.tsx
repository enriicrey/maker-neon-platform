
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hola@soymaker3d.com', label: 'Email' },
  ];

  const footerSections = [
    {
      title: 'Newsletter',
      links: [
        { name: 'Archivo Completo', href: '/newsletter' },
        { name: 'Última Edición', href: '/newsletter' },
        { name: 'Suscripción Premium', href: '/suscripcion' },
        { name: 'Testimonios', href: '#testimonios' },
      ],
    },
    {
      title: 'Drops',
      links: [
        { name: 'Productos Disponibles', href: '/drops' },
        { name: 'Próximos Lanzamientos', href: '/drops' },
        { name: 'Sold Out Collection', href: '/drops' },
        { name: 'Cómo Funciona', href: '/drops#como-funciona' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
        { name: 'Consultoría', href: '/consultoria' },
        { name: 'Contacto', href: '/contacto' },
        { name: 'Colaboraciones', href: '/colaboraciones' },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-primary/20">
      {/* Footer Principal */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Columna 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">3D</span>
              </div>
              <span className="text-2xl font-bold text-gradient">
                SOY MAKER 3D
              </span>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-sm">
              La comunidad líder de drops en impresión 3D. Conectamos makers con oportunidades de negocio reales.
            </p>

            {/* Newsletter Signup Compacto */}
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Mantente al día"
                  className="flex-1 px-3 py-2 rounded-lg bg-dark-surface border border-dark-border focus:border-primary focus:outline-none text-white text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  {isSubscribed ? '✓' : '→'}
                </button>
              </div>
            </form>

            {/* Redes Sociales */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-dark-surface hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {/* Información de Contacto */}
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hola@soymaker3d.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Madrid, España</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Lun-Vie 9:00-18:00 CET</span>
              </div>
            </div>
          </div>

          {/* Columnas de Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Legal Bottom */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Soy Maker 3D. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacidad"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Privacidad
              </Link>
              <Link
                to="/terminos"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Términos
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
