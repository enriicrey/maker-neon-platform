
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Rocket } from 'lucide-react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import BenefitsAndSocialProof from '../components/BenefitsAndSocialProof';
import FinalCTA from '../components/FinalCTA';
import ScrollToTop from '../components/ScrollToTop';
import SEOHead from '../components/SEOHead';
import { useSEOAdvanced } from '../hooks/useSEOAdvanced';
import { useAnalyticsTracking } from '../hooks/useAnalyticsTracking';
import { generateWebsiteStructuredData, generateFAQStructuredData } from '../utils/seoAdvanced';

const Index = () => {
  // SEO and Analytics setup
  const { trackEvent, trackEngagement } = useAnalyticsTracking();
  
  // SEO data for home page
  useSEOAdvanced({
    title: 'Maker Neon Platform - Newsletters Curadas & Drops Exclusivos',
    description: 'Descubre la plataforma líder en newsletters curadas de tecnología maker y productos exclusivos. Únete a miles de makers que confían en nosotros.',
    keywords: ['newsletters curadas', 'drops exclusivos', 'tecnología maker', 'productos premium', 'comunidad maker', 'impresión 3D'],
    type: 'website',
    structuredData: generateWebsiteStructuredData(),
    breadcrumbs: false, // Homepage doesn't need breadcrumbs
  });

  // FAQ data for structured data
  const faqData = [
    {
      question: '¿Qué incluye la suscripción premium?',
      answer: 'Acceso completo a newsletters curadas, drops exclusivos, descuentos especiales y contenido premium para makers.'
    },
    {
      question: '¿Con qué frecuencia se publican las newsletters?',
      answer: 'Publicamos newsletters curadas semanalmente con el mejor contenido de tecnología maker, tendencias y novedades del sector.'
    },
    {
      question: '¿Qué son los drops exclusivos?',
      answer: 'Productos únicos y limitados seleccionados especialmente para nuestra comunidad, con acceso anticipado y precios especiales.'
    },
    {
      question: '¿Puedo cancelar mi suscripción en cualquier momento?',
      answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario sin compromisos.'
    }
  ];

  React.useEffect(() => {
    // Track page view
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: 'homepage'
    });

    // Track scroll engagement
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent >= 50) {
        trackEngagement('scroll', { percentage: 50 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent, trackEngagement]);
  const features = [
    {
      icon: Zap,
      title: 'Contenido Premium',
      description: 'Tutoriales exclusivos, técnicas avanzadas y recursos únicos para makers 3D profesionales.',
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Conecta con miles de makers, comparte proyectos y colabora en desafíos increíbles.',
    },
    {
      icon: Rocket,
      title: 'Últimas Tendencias',
      description: 'Mantente al día con las innovaciones más recientes en impresión 3D y diseño.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Makers Activos' },
    { number: '500+', label: 'Tutoriales' },
    { number: '1M+', label: 'Descargas' },
    { number: '50+', label: 'Países' },
  ];

  return (
    <>
      <SEOHead
        title="Maker Neon Platform - Newsletters Curadas & Drops Exclusivos"
        description="Descubre la plataforma líder en newsletters curadas de tecnología maker y productos exclusivos. Únete a miles de makers que confían en nosotros."
        keywords={['newsletters curadas', 'drops exclusivos', 'tecnología maker', 'productos premium', 'comunidad maker', 'impresión 3D']}
        type="website"
        structuredData={generateFAQStructuredData(faqData)}
      />
      <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits and Social Proof Section */}
      <BenefitsAndSocialProof />

      {/* Stats Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Por qué elegir <span className="text-gradient">Soy Maker 3D</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Una plataforma diseñada por makers, para makers. Todo lo que necesitas 
              para dominar el mundo de la impresión 3D.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-neon group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <FinalCTA />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </Layout>
    </>
  );
};

export default Index;
