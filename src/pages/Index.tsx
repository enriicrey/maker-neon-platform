
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Rocket, Star } from 'lucide-react';
import Layout from '../components/Layout';

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/90 to-dark-surface"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nueva plataforma disponible</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              El futuro del <br />
              <span className="text-gradient">Mundo Maker 3D</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre tutoriales exclusivos, conecta con la comunidad más innovadora 
              y lleva tus proyectos 3D al siguiente nivel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/suscripcion" className="btn-neon inline-flex items-center space-x-2">
                <span>Comenzar Ahora</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/newsletter" className="btn-outline-neon">
                Ver Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-neon-cyan/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </section>

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
