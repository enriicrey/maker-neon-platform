
import { Mail, Clock, Eye, Download } from 'lucide-react';
import Layout from '../components/Layout';

const Newsletter = () => {
  const newsletters = [
    {
      id: 1,
      title: 'Revolucionando la Impresión 3D con IA',
      excerpt: 'Descubre cómo la inteligencia artificial está transformando el diseño y fabricación 3D...',
      date: '15 Mar 2024',
      readTime: '8 min',
      views: '2.4K',
      image: '/api/placeholder/400/240',
      featured: true,
    },
    {
      id: 2,
      title: 'Materiales Avanzados: El Futuro Ya Está Aquí',
      excerpt: 'Exploramos los últimos materiales para impresión 3D que cambiarán tu forma de crear...',
      date: '10 Mar 2024',
      readTime: '6 min',
      views: '1.8K',
      image: '/api/placeholder/400/240',
      featured: false,
    },
    {
      id: 3,
      title: 'Tutorial: Optimización de Supports Avanzada',
      excerpt: 'Técnicas profesionales para reducir material de soporte y mejorar la calidad...',
      date: '5 Mar 2024',
      readTime: '12 min',
      views: '3.1K',
      image: '/api/placeholder/400/240',
      featured: false,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Newsletter Semanal</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Newsletter</span> Exclusivo
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Contenido premium, tutoriales avanzados y las últimas tendencias 
              del mundo maker 3D, directamente en tu bandeja de entrada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 bg-dark-surface rounded-lg px-6 py-3 border border-dark-border">
                <Mail className="w-5 h-5 text-primary" />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-transparent border-none outline-none text-white placeholder-muted-foreground flex-1"
                />
              </div>
              <button className="btn-neon">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Últimas Ediciones</h2>
            <p className="text-muted-foreground">
              Explora nuestro archivo de newsletters y no te pierdas ningún contenido valioso.
            </p>
          </div>

          <div className="grid gap-8">
            {newsletters.map((newsletter) => (
              <article
                key={newsletter.id}
                className={`card-neon group cursor-pointer ${
                  newsletter.featured ? 'border-primary/30' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-video bg-dark-surface rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-neon-cyan/20 flex items-center justify-center">
                        <Mail className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    {newsletter.featured && (
                      <div className="mb-3">
                        <span className="bg-primary text-black text-xs font-semibold px-2 py-1 rounded">
                          DESTACADO
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {newsletter.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {newsletter.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{newsletter.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{newsletter.views}</span>
                      </div>
                      <span>{newsletter.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline-neon inline-flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Ver Archivo Completo</span>
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Newsletter;
