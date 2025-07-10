
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Target
} from 'lucide-react';
import { NewsletterMetrics, RevenueMetrics, UserMetrics } from '@/hooks/useAnalytics';

interface MetricsGridProps {
  newsletterMetrics: NewsletterMetrics | null;
  revenueMetrics: RevenueMetrics | null;
  userMetrics: UserMetrics | null;
  loading: boolean;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({
  newsletterMetrics,
  revenueMetrics,
  userMetrics,
  loading
}) => {
  const metrics = [
    // Newsletter Metrics
    {
      title: 'Suscriptores Totales',
      value: newsletterMetrics?.totalSubscribers?.toLocaleString() || '0',
      change: '+12.5%',
      positive: true,
      icon: Mail,
      color: 'text-blue-500',
      category: 'Newsletter'
    },
    {
      title: 'Tasa de Apertura',
      value: `${newsletterMetrics?.averageOpenRate?.toFixed(1) || '0'}%`,
      change: '+2.3%',
      positive: true,
      icon: Activity,
      color: 'text-green-500',
      category: 'Newsletter'
    },
    {
      title: 'Tasa de Click',
      value: `${newsletterMetrics?.averageClickRate?.toFixed(1) || '0'}%`,
      change: '+1.8%',
      positive: true,
      icon: Target,
      color: 'text-purple-500',
      category: 'Newsletter'
    },
    {
      title: 'Tasa de Baja',
      value: `${newsletterMetrics?.unsubscribeRate?.toFixed(1) || '0'}%`,
      change: '-0.5%',
      positive: true,
      icon: TrendingDown,
      color: 'text-orange-500',
      category: 'Newsletter'
    },
    
    // User Metrics
    {
      title: 'Nuevos Usuarios',
      value: userMetrics?.newUsers?.toLocaleString() || '0',
      change: '+18.2%',
      positive: true,
      icon: Users,
      color: 'text-blue-500',
      category: 'Usuarios'
    },
    {
      title: 'Usuarios Activos',
      value: userMetrics?.activeUsers?.toLocaleString() || '0',
      change: '+7.4%',
      positive: true,
      icon: Activity,
      color: 'text-green-500',
      category: 'Usuarios'
    },
    {
      title: 'Tasa de Retención',
      value: `${userMetrics?.retentionRate?.toFixed(1) || '0'}%`,
      change: '+3.1%',
      positive: true,
      icon: TrendingUp,
      color: 'text-purple-500',
      category: 'Usuarios'
    },
    {
      title: 'Tasa de Abandono',
      value: `${userMetrics?.churnRate?.toFixed(1) || '0'}%`,
      change: '-1.2%',
      positive: true,
      icon: TrendingDown,
      color: 'text-red-500',
      category: 'Usuarios'
    },

    // Revenue Metrics
    {
      title: 'Ingresos Totales',
      value: `€${revenueMetrics?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+24.8%',
      positive: true,
      icon: DollarSign,
      color: 'text-green-500',
      category: 'Ingresos'
    },
    {
      title: 'Pedidos Totales',
      value: revenueMetrics?.totalOrders?.toLocaleString() || '0',
      change: '+15.3%',
      positive: true,
      icon: ShoppingCart,
      color: 'text-blue-500',
      category: 'Ingresos'
    },
    {
      title: 'Valor Promedio Pedido',
      value: `€${revenueMetrics?.avgOrderValue?.toFixed(2) || '0'}`,
      change: '+8.7%',
      positive: true,
      icon: TrendingUp,
      color: 'text-purple-500',
      category: 'Ingresos'
    },
    {
      title: 'Tasa de Conversión',
      value: `${revenueMetrics?.conversionRate?.toFixed(1) || '0'}%`,
      change: '+2.1%',
      positive: true,
      icon: Target,
      color: 'text-orange-500',
      category: 'Ingresos'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="bg-dark-surface border-dark-border">
            <CardHeader className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Newsletter Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Métricas de Newsletter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.filter(m => m.category === 'Newsletter').map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.positive ? TrendingUp : TrendingDown;
            
            return (
              <Card key={index} className="bg-dark-surface border-dark-border hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <TrendIcon className={`mr-1 h-3 w-3 ${
                      metric.positive ? 'text-green-500' : 'text-red-500'
                    }`} />
                    {metric.change} vs período anterior
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* User Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Métricas de Usuarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.filter(m => m.category === 'Usuarios').map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.positive ? TrendingUp : TrendingDown;
            
            return (
              <Card key={index} className="bg-dark-surface border-dark-border hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <TrendIcon className={`mr-1 h-3 w-3 ${
                      metric.positive ? 'text-green-500' : 'text-red-500'
                    }`} />
                    {metric.change} vs período anterior
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Revenue Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Métricas de Ingresos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.filter(m => m.category === 'Ingresos').map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.positive ? TrendingUp : TrendingDown;
            
            return (
              <Card key={index} className="bg-dark-surface border-dark-border hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <TrendIcon className={`mr-1 h-3 w-3 ${
                      metric.positive ? 'text-green-500' : 'text-red-500'
                    }`} />
                    {metric.change} vs período anterior
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricsGrid;
