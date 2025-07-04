
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Rocket } from 'lucide-react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import BenefitsAndSocialProof from '../components/BenefitsAndSocialProof';

const Index = () => {
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-neon-cyan/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para comenzar tu <span className="text-gradient">viaje 3D</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de makers que ya están transformando sus ideas en realidad.
          </p>
          <Link to="/suscripcion" className="btn-neon inline-flex items-center space-x-2">
            <span>Suscríbete Ahora</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
