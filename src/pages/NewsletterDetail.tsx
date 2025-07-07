
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Clock, Eye, Share2, MessageCircle, Star, ArrowUp } from 'lucide-react';
import Layout from '../components/Layout';
import { Newsletter } from '@/types/newsletter';
import NewsletterCard from '../components/newsletter/NewsletterCard';
import ReadingProgress from '../components/newsletter/ReadingProgress';
import TableOfContents from '../components/newsletter/TableOfContents';
import ShareActions from '../components/newsletter/ShareActions';
import CommentsSection from '../components/newsletter/CommentsSection';

const NewsletterDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedNewsletters, setRelatedNewsletters] = useState<Newsletter[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Mock data - in real app, fetch based on slug
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockNewsletter: Newsletter = {
        id: 1,
        title: "Cómo Crear tu Primer SaaS: Guía Completa desde la Idea hasta el Lanzamiento",
        excerpt: "Una guía detallada paso a paso para construir y lanzar tu primer producto SaaS exitoso",
        content: `
          <p>Crear un SaaS exitoso no es solo sobre código. Es sobre entender un problema real, construir la solución correcta, y ejecutar un lanzamiento que genere tracción desde el día uno.</p>
          
          <h2>1. Validación de la Idea</h2>
          <p>Antes de escribir una sola línea de código, necesitas validar que tu idea resuelve un problema real que la gente está dispuesta a pagar por solucionar.</p>
          
          <blockquote>
            "La mayoría de startups fallan no porque el producto sea malo, sino porque resuelven un problema que nadie tiene o que nadie está dispuesto a pagar por resolver."
          </blockquote>
          
          <h3>Técnicas de Validación</h3>
          <ul>
            <li>Entrevistas con usuarios potenciales</li>
            <li>Landing page con pre-registros</li>
            <li>MVP con funcionalidad básica</li>
            <li>Análisis de competencia directa e indirecta</li>
          </ul>
          
          <h2>2. Arquitectura Técnica</h2>
          <p>La elección de tu stack tecnológico determinará la escalabilidad, mantenibilidad y velocidad de desarrollo de tu SaaS.</p>
          
          <h3>Stack Recomendado para Principiantes</h3>
          <ul>
            <li><strong>Frontend:</strong> React con TypeScript</li>
            <li><strong>Backend:</strong> Node.js con Express o Next.js</li>
            <li><strong>Base de datos:</strong> PostgreSQL</li>
            <li><strong>Hosting:</strong> Vercel, Railway o AWS</li>
          </ul>
          
          <h2>3. Modelo de Negocio</h2>
          <p>Define tu estrategia de monetización desde el principio. Los modelos más exitosos para SaaS incluyen:</p>
          
          <ol>
            <li>Freemium con límites claros</li>
            <li>Prueba gratuita por tiempo limitado</li>
            <li>Tiers de pricing basados en uso</li>
            <li>Plan empresarial con features premium</li>
          </ol>
        `,
        date: "15 Enero 2025",
        readTime: "12 min",
        views: "2.4k",
        category: "estrategias-negocio",
        tags: ["saas", "emprendimiento", "desarrollo"],
        featured: true,
        popularity: {
          reads: 2400,
          shares: 156,
          comments: 23
        }
      };
      
      setNewsletter(mockNewsletter);
      setIsLoading(false);
      
      // Mock related newsletters
      setRelatedNewsletters([
        {
          id: 2,
          title: "Stack Tecnológico para SaaS en 2025",
          excerpt: "Las mejores herramientas y frameworks para construir tu SaaS",
          date: "10 Enero 2025",
          readTime: "8 min",
          views: "1.8k",
          category: "tutoriales-tecnicos",
          tags: ["tecnologia", "desarrollo"],
          featured: false,
          popularity: { reads: 1800, shares: 89, comments: 12 }
        }
      ]);
    }, 1000);
  }, [slug]);

  // Handle scroll for progress and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setReadingProgress(Math.min(progress, 100));
      setShowScrollTop(scrolled > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryLabels = {
    'drops-exclusivos': '🔥 Drops Exclusivos',
    'tutoriales-tecnicos': '🛠️ Tutoriales Técnicos',
    'estrategias-negocio': '💰 Estrategias de Negocio',
    'tendencias-sector': '🌟 Tendencias del Sector',
    'casos-estudio': '📊 Casos de Estudio',
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 max-w-4xl py-8 lg:py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-dark-surface rounded w-64 mb-6"></div>
            <div className="h-12 bg-dark-surface rounded w-full mb-6"></div>
            <div className="h-6 bg-dark-surface rounded w-96 mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-dark-surface rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!newsletter) {
    return (
      <Layout>
        <div className="container mx-auto px-4 max-w-4xl py-8 lg:py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Newsletter no encontrada</h1>
          <Link to="/newsletter" className="btn-neon">
            Volver al archivo
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ReadingProgress progress={readingProgress} />
      
      <div className="container mx-auto px-4 max-w-7xl py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-6 flex items-center space-x-2">
              <Link to="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/newsletter" className="hover:text-primary transition-colors">
                Newsletter
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/newsletter?category=${newsletter.category}`} className="hover:text-primary transition-colors">
                {categoryLabels[newsletter.category]}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="truncate max-w-48">
                {newsletter.title.length > 30 ? newsletter.title.substring(0, 30) + '...' : newsletter.title}
              </span>
            </nav>

            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gradient">
                {newsletter.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{newsletter.date}</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{newsletter.readTime}</span>
                  </span>
                  <span>•</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {categoryLabels[newsletter.category]}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{newsletter.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{newsletter.popularity.shares}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{newsletter.popularity.comments}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-100 prose-p:leading-relaxed prose-p:mb-6 prose-blockquote:border-l-primary prose-blockquote:bg-gray-900/30 prose-blockquote:rounded-r-xl prose-blockquote:p-6 prose-blockquote:text-xl prose-blockquote:italic prose-ul:text-gray-100 prose-ol:text-gray-100 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: newsletter.content || newsletter.excerpt }}
            />

            {/* Engagement Section */}
            <div className="mt-12 pt-8 border-t border-dark-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center">
                  <p className="text-gray-400 mb-3">¿Te resultó útil este artículo?</p>
                  <div className="flex space-x-3">
                    <button className="btn-neon px-6 py-2 text-sm">
                      Sí, muy útil
                    </button>
                    <button className="btn-outline-neon px-6 py-2 text-sm">
                      Podría mejorar
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-400 mb-3">Califica este contenido</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-gray-400 hover:text-yellow-400 transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentsSection newsletterId={newsletter.id} />
          </article>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-64 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6">
              <TableOfContents />
              <ShareActions 
                title={newsletter.title}
                url={window.location.href}
              />
            </div>
          </aside>
        </div>

        {/* Related Newsletters */}
        {relatedNewsletters.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Te puede interesar también</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNewsletters.map((related) => (
                <NewsletterCard
                  key={related.id}
                  newsletter={related}
                  onClick={(newsletter) => {
                    // Navigate to newsletter detail
                    window.location.href = `/newsletter/${newsletter.id}`;
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Actions */}
      <div className="lg:hidden fixed bottom-4 right-4 flex flex-col space-y-3">
        <ShareActions 
          title={newsletter.title}
          url={window.location.href}
          variant="floating"
        />
        
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </Layout>
  );
};

export default NewsletterDetail;
