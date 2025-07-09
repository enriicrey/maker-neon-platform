
import { useState, useEffect } from 'react';
import { Check, Star, Zap, Crown, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Layout from '../components/Layout';

interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
}

interface UserSubscription {
  plan_name: string;
  plan_slug: string;
  status: string;
  billing_cycle: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

const Suscripcion = () => {
  const { user } = useAuth();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });
      
      if (error) throw error;
      return data as SubscriptionPlan[];
    },
  });

  const { data: currentSubscription } = useQuery({
    queryKey: ['user-subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .rpc('get_user_subscription', { user_uuid: user.id });
      
      if (error) throw error;
      return data?.[0] as UserSubscription | null;
    },
    enabled: !!user,
  });

  const handleSubscribe = async (planSlug: string) => {
    if (!user) {
      toast.error('Debes iniciar sesión para suscribirte');
      return;
    }

    setLoadingPlan(planSlug);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planSlug, 
          billingCycle: isYearly ? 'yearly' : 'monthly' 
        }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast.error('Error al crear la suscripción: ' + error.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast.error('Error al abrir el portal de cliente: ' + error.message);
    }
  };

  const getIcon = (planSlug: string) => {
    switch (planSlug) {
      case 'free': return Star;
      case 'premium': return Zap;
      case 'vip': return Crown;
      default: return Star;
    }
  };

  const formatPrice = (priceInCents: number) => {
    return (priceInCents / 100).toFixed(0);
  };

  const faqs = [
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en el próximo ciclo de facturación.',
    },
    {
      question: '¿Hay descuentos para pagos anuales?',
      answer: 'Sí, los planes anuales incluyen descuentos significativos comparados con el pago mensual.',
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

  if (plansLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Únete a los <span className="text-gradient">2,847+ Makers</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Acceso exclusivo a drops, contenido premium y consultoría directa
              para llevar tu negocio 3D al siguiente nivel.
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">30 días de garantía</span>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
                Mensual
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                Anual
              </span>
              {isYearly && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Ahorra hasta 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans?.map((plan) => {
              const Icon = getIcon(plan.slug);
              const price = isYearly ? plan.price_yearly : plan.price_monthly;
              const isCurrentPlan = currentSubscription?.plan_slug === plan.slug;
              const isFree = plan.slug === 'free';
              
              return (
                <div
                  key={plan.id}
                  className={`card-neon relative ${
                    plan.is_popular ? 'border-primary/50 shadow-lg shadow-primary/20' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-black text-sm font-semibold px-4 py-2 rounded-full">
                        MÁS POPULAR
                      </div>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4">
                      <div className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        ACTUAL
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-4">
                      {isFree ? (
                        <span className="text-4xl font-bold text-primary">Gratis</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-primary">
                            €{formatPrice(price)}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            /{isYearly ? 'año' : 'mes'}
                          </span>
                        </>
                      )}
                    </div>
                    {!isFree && isYearly && (
                      <p className="text-sm text-green-400">
                        Ahorra €{formatPrice((plan.price_monthly * 12) - plan.price_yearly)} al año
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {isCurrentPlan ? (
                    <div className="space-y-2">
                      <Button
                        onClick={handleManageSubscription}
                        className="w-full"
                        variant="outline"
                      >
                        Gestionar Suscripción
                      </Button>
                      {currentSubscription?.cancel_at_period_end && (
                        <p className="text-sm text-orange-400 text-center">
                          Se cancela el {new Date(currentSubscription.current_period_end).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleSubscribe(plan.slug)}
                      disabled={loadingPlan === plan.slug || isFree}
                      className={`w-full ${
                        plan.is_popular ? 'btn-neon' : 'btn-outline-neon'
                      }`}
                    >
                      {loadingPlan === plan.slug ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Procesando...
                        </>
                      ) : isFree ? (
                        'Plan Actual'
                      ) : (
                        `Suscribirse a ${plan.name}`
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
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
