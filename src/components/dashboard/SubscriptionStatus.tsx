
import React from 'react';
import { Crown, Zap, Star, Calendar, CreditCard } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SubscriptionStatus: React.FC = () => {
  const { currentSubscription, isPremium, isVIP } = useSubscription();

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast.error('Error al abrir el portal de cliente: ' + error.message);
    }
  };

  const getIcon = () => {
    if (isVIP) return Crown;
    if (isPremium) return Zap;
    return Star;
  };

  const getStatusColor = () => {
    if (isVIP) return 'text-yellow-400';
    if (isPremium) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getBadgeColor = () => {
    if (isVIP) return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
    if (isPremium) return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
    return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  const Icon = getIcon();

  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-opacity-20 ${getBadgeColor().replace('border-', 'bg-').replace('/30', '/20')}`}>
            <Icon className={`w-5 h-5 ${getStatusColor()}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {currentSubscription?.plan_name || 'Plan Gratuito'}
            </h3>
            <span className={`text-sm px-2 py-1 rounded-full border ${getBadgeColor()}`}>
              {currentSubscription?.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
        
        {currentSubscription && (
          <Button
            onClick={handleManageSubscription}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <CreditCard className="w-3 h-3 mr-1" />
            Gestionar
          </Button>
        )}
      </div>

      {currentSubscription && (
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Ciclo de facturación:</span>
            <span className="text-white capitalize">
              {currentSubscription.billing_cycle === 'yearly' ? 'Anual' : 'Mensual'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Próxima renovación:</span>
            <div className="flex items-center gap-1 text-white">
              <Calendar className="w-3 h-3" />
              {new Date(currentSubscription.current_period_end).toLocaleDateString()}
            </div>
          </div>

          {currentSubscription.cancel_at_period_end && (
            <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-orange-400 text-xs">
                Tu suscripción se cancelará el {new Date(currentSubscription.current_period_end).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      )}

      {!currentSubscription && (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm mb-3">
            Actualiza tu plan para acceder a contenido premium
          </p>
          <Button
            onClick={() => window.location.href = '/suscripcion'}
            className="w-full"
            size="sm"
          >
            Ver Planes
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;
