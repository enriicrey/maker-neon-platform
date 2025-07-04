
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Plataforma',
      links: [
        { name: 'Newsletter', href: '/newsletter' },
        { name: 'Drops', href: '/drops' },
        { name: 'Dashboard', href: '/dashboard' },
      ],
    },
    {
      title: 'Comunidad',
      links: [
        { name: 'Discord', href: '#' },
        { name: 'Foro', href: '#' },
        { name: 'Eventos', href: '#' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Documentación', href: '#' },
        { name: 'API', href: '#' },
        { name: 'Tutoriales', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">3D</span>
              </div>
              <span className="text-xl font-bold text-gradient">
                Soy Maker 3D
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              La plataforma definitiva para makers 3D. Descubre las últimas tendencias, 
              tutoriales avanzados y conecta con la comunidad más innovadora del mundo 3D.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-dark-bg hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Soy Maker 3D. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacidad"
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Privacidad
            </Link>
            <Link
              to="/terminos"
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
