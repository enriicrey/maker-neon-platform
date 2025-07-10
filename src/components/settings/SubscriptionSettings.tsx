
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Calendar, DollarSign, Gift, Crown, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const SubscriptionSettings = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSubscriptionData();
      loadBillingHistory();
    }
  }, [user]);

  const loadSubscriptionData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('get_user_subscription', { user_uuid: user.id });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setSubscription(data[0]);
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBillingHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('billing_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setBillingHistory(data || []);
    } catch (error) {
      console.error('Error loading billing history:', error);
    }
  };

  const handleUpgrade = () => {
    toast({
      title: "Función no disponible",
      description: "La funcionalidad de suscripción estará disponible pronto"
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Función no disponible",
      description: "Contacta con soporte para cancelar tu suscripción"
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Función no disponible",
      description: "La descarga de facturas estará disponible pronto"
    });
  };

  if (loading) {
    return <div className="text-gray-400">Cargando información de suscripción...</div>;
  }

  // Mock data for demonstration
  const mockSubscription = {
    plan_name: 'Plan Gratuito',
    plan_slug: 'free',
    status: 'active',
    billing_cycle: 'monthly',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancel_at_period_end: false
  };

  const currentSub = subscription || mockSubscription;

  const plans = [
    {
      name: 'Gratuito',
      slug: 'free',
      price: 0,
      features: [
        'Acceso limitado a newsletters',
        'Wishlist básica (max 10 items)',
        'Sin personalización',
        'Soporte por email'
      ],
      current: currentSub.plan_slug === 'free'
    },
    {
      name: 'Pro',
      slug: 'pro',
      price: 9.99,
      features: [
        'Acceso completo a newsletters',
        'Wishlist ilimitada',
        'Recomendaciones personalizadas',
        'Alertas de precio',
        'Acceso anticipado',
        'Soporte prioritario'
      ],
      current: currentSub.plan_slug === 'pro',
      popular: true
    },
    {
      name: 'Premium',
      slug: 'premium',
      price: 19.99,
      features: [
        'Todo lo de Pro',
        'Contenido exclusivo',
        'Análisis avanzado',
        'API access',
        'Soporte 24/7',
        'Badge VIP'
      ],
      current: currentSub.plan_slug === 'premium'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Suscripción actual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {currentSub.plan_name}
                {currentSub.plan_slug !== 'free' && (
                  <Badge className="bg-primary text-white">
                    {currentSub.plan_slug === 'premium' ? 'PREMIUM' : 'PRO'}
                  </Badge>
                )}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant={currentSub.status === 'active' ? 'default' : 'destructive'}>
                  {currentSub.status === 'active' ? 'Activa' : 'Inactiva'}
                </Badge>
                <span className="text-sm text-gray-400">
                  Facturación {currentSub.billing_cycle === 'monthly' ? 'mensual' : 'anual'}
                </span>
              </div>
            </div>
            {currentSub.plan_slug !== 'free' && (
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  €{currentSub.billing_cycle === 'monthly' ? '9.99' : '99.99'}
                  <span className="text-sm text-gray-400">
                    /{currentSub.billing_cycle === 'monthly' ? 'mes' : 'año'}
                  </span>
                </p>
              </div>
            )}
          </div>

          {currentSub.plan_slug !== 'free' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Próxima renovación</span>
                <span className="text-white">
                  {new Date(currentSub.current_period_end).toLocaleDateString('es-ES')}
                </span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="text-xs text-gray-400">
                Quedan 23 días hasta la renovación
              </div>
            </div>
          )}

          {currentSub.cancel_at_period_end && (
            <Alert className="bg-yellow-900/20 border-yellow-800">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-300">
                Tu suscripción será cancelada el {new Date(currentSub.current_period_end).toLocaleDateString('es-ES')}
              </AlertDescription>
            </Alert>
          )}

          {currentSub.plan_slug === 'free' && (
            <Alert className="bg-blue-900/20 border-blue-800">
              <Gift className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-300">
                Actualiza tu plan para acceder a funciones premium y contenido exclusivo.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Planes disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.slug}
                className={`relative p-6 rounded-lg border transition-all ${
                  plan.current
                    ? 'border-primary bg-primary/5'
                    : 'border-dark-border bg-dark-surface hover:border-primary/50'
                } ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    POPULAR
                  </Badge>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-white">
                      €{plan.price}
                    </span>
                    <span className="text-gray-400">/mes</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={plan.current ? undefined : handleUpgrade}
                  disabled={plan.current}
                  className={`w-full ${
                    plan.current
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-dark-border hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.current ? 'Plan actual' : plan.slug === 'free' ? 'Downgrade' : 'Actualizar'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Historial de facturación
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver todo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {billingHistory.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No hay historial de facturación disponible</p>
              <p className="text-sm text-gray-500 mt-2">
                Las facturas aparecerán aquí cuando realices pagos
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {billingHistory.map((invoice: any) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Factura #{invoice.id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(invoice.created_at).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-medium">
                        €{(invoice.amount / 100).toFixed(2)}
                      </p>
                      <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                        {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      Descargar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Actions */}
      {currentSub.plan_slug !== 'free' && (
        <Card className="bg-dark-bg border-red-900/50">
          <CardHeader>
            <CardTitle className="text-red-400">Gestión de suscripción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-red-900/20 border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                Al cancelar tu suscripción perderás el acceso a las funciones premium 
                al final del período actual.
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Pausar suscripción
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleCancelSubscription}
              >
                Cancelar suscripción
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionSettings;
