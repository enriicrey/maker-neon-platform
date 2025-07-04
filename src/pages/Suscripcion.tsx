
import { Check, Star, Zap, Crown } from 'lucide-react';
import Layout from '../components/Layout';

const Suscripcion = () => {
  const plans = [
    {
      name: 'Maker',
      price: 'Gratis',
      period: 'para siempre',
      description: 'Perfecto para comenzar tu viaje en el mundo 3D',
      features: [
        'Newsletter semanal',
        'Acceso a drops gratuitos',
        'Comunidad básica',
        'Tutoriales básicos',
        'Soporte por email',
      ],
      icon: Star,
      popular: false,
      cta: 'Comenzar Gratis',
    },
    {
      name: 'Pro Maker',
      price: '$12',
      period: '/mes',
      description: 'Para makers serios que quieren contenido premium',
      features: [
        'Todo lo del plan Maker',
        'Drops premium exclusivos',
        'Tutoriales avanzados',
        'Acceso anticipado',
        'Comunidad VIP',
        'Soporte prioritario',
        'Webinars exclusivos',
      ],
      icon: Zap,
      popular: true,
      cta: 'Suscribirse Ahora',
    },
    {
      name: 'Master Maker',
      price: '$25',
      period: '/mes',
      description: 'La experiencia completa para profesionales',
      features: [
        'Todo lo del plan Pro Maker',
        'Consultoría 1-on-1',
        'Drops comerciales',
        'Licencias extendidas',
        'Acceso beta',
        'Networking exclusivo',
        'Certificaciones',
        'API Access',
      ],
      icon: Crown,
      popular: false,
      cta: 'Ir Premium',
    },
  ];

  const faqs = [
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en el próximo ciclo de facturación.',
    },
    {
      question: '¿Hay descuentos para pagos anuales?',
      answer: 'Sí, ofrecemos un 20% de descuento para suscripciones anuales en todos los planes de pago.',
    },
    {
      question: '¿Qué incluyen los drops premium?',
      answer: 'Los drops premium incluyen modelos 3D de alta calidad, colecciones exclusivas, archivos fuente y licencias comerciales.',
    },
    {
      question: '¿Hay garantía de devolución?',
      answer: 'Ofrecemos una garantía de devolución de 30 días sin preguntas para todos los planes de pago.',
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Elige tu plan <span className="text-gradient">perfecto</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Desbloquea todo el potencial de la plataforma Soy Maker 3D 
              con nuestros planes diseñados para cada nivel de maker.
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">30 días de garantía</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card-neon relative ${
                  plan.popular ? 'border-primary/50 shadow-lg shadow-primary/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-black text-sm font-semibold px-4 py-2 rounded-full">
                      MÁS POPULAR
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'btn-neon'
                      : 'btn-outline-neon'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h2>
            <p className="text-muted-foreground">
              Resolvemos las dudas más comunes sobre nuestros planes de suscripción.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card-neon">
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Suscripcion;
