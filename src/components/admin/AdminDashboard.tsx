
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Mail, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalUsers: number;
  newUsersThisMonth: number;
  totalNewsletters: number;
  newslettersThisMonth: number;
  totalProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalNewsletters: 0,
    newslettersThisMonth: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    monthlyRecurringRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user stats
        const { count: totalUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { count: newUsersThisMonth } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfMonth.toISOString());

        // Fetch newsletter stats
        const { count: totalNewsletters } = await supabase
          .from('newsletters')
          .select('*', { count: 'exact', head: true });

        const { count: newslettersThisMonth } = await supabase
          .from('newsletters')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfMonth.toISOString());

        // Fetch product stats
        const { count: totalProducts } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        const { count: lowStockProducts } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .lte('stock_quantity', 5);

        // Fetch order stats
        const { count: totalOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });

        const { count: pendingOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Calculate revenue (simplified)
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount')
          .eq('payment_status', 'paid');

        const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

        // Get active subscriptions for MRR
        const { data: subscriptions } = await supabase
          .from('user_subscriptions')
          .select('plan_id, subscription_plans(price_monthly)')
          .eq('status', 'active');

        const monthlyRecurringRevenue = subscriptions?.reduce((sum, sub) => {
          return sum + (sub.subscription_plans?.price_monthly || 0);
        }, 0) || 0;

        setStats({
          totalUsers: totalUsers || 0,
          newUsersThisMonth: newUsersThisMonth || 0,
          totalNewsletters: totalNewsletters || 0,
          newslettersThisMonth: newslettersThisMonth || 0,
          totalProducts: totalProducts || 0,
          lowStockProducts: lowStockProducts || 0,
          totalOrders: totalOrders || 0,
          pendingOrders: pendingOrders || 0,
          totalRevenue: totalRevenue / 100, // Convert from cents
          monthlyRecurringRevenue: monthlyRecurringRevenue / 100, // Convert from cents
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
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

  const statCards = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.newUsersThisMonth} este mes`,
      icon: Users,
      color: 'text-blue-500',
      trend: 'up' as const,
    },
    {
      title: 'Newsletters',
      value: stats.totalNewsletters.toLocaleString(),
      change: `${stats.newslettersThisMonth} enviadas este mes`,
      icon: Mail,
      color: 'text-green-500',
      trend: 'up' as const,
    },
    {
      title: 'Productos',
      value: stats.totalProducts.toLocaleString(),
      change: `${stats.lowStockProducts} con stock bajo`,
      icon: Package,
      color: 'text-yellow-500',
      trend: stats.lowStockProducts > 0 ? 'down' : 'neutral' as const,
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders.toLocaleString(),
      change: `${stats.pendingOrders} pendientes`,
      icon: ShoppingCart,
      color: 'text-purple-500',
      trend: 'neutral' as const,
    },
    {
      title: 'Revenue Total',
      value: `€${stats.totalRevenue.toLocaleString()}`,
      change: 'Todos los tiempos',
      icon: DollarSign,
      color: 'text-green-500',
      trend: 'up' as const,
    },
    {
      title: 'MRR',
      value: `€${stats.monthlyRecurringRevenue.toLocaleString()}`,
      change: 'Ingreso mensual recurrente',
      icon: TrendingUp,
      color: 'text-blue-500',
      trend: 'up' as const,
    },
    {
      title: 'Engagement',
      value: '78.5%',
      change: '+5.2% vs mes anterior',
      icon: Activity,
      color: 'text-green-500',
      trend: 'up' as const,
    },
    {
      title: 'Alertas',
      value: stats.lowStockProducts + stats.pendingOrders,
      change: 'Requieren atención',
      icon: AlertTriangle,
      color: 'text-red-500',
      trend: 'down' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Administrativo</h2>
        <p className="text-gray-400">Resumen general del estado de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Activity;
          
          return (
            <Card key={index} className="bg-dark-surface border-dark-border hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <TrendIcon className={`mr-1 h-3 w-3 ${
                    stat.trend === 'up' ? 'text-green-500' : 
                    stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                  }`} />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-dark-surface border-dark-border">
          <CardHeader>
            <CardTitle className="text-white">Actividad Reciente</CardTitle>
            <CardDescription className="text-gray-400">
              Últimas acciones en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Nueva newsletter publicada</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">5 nuevos usuarios registrados</p>
                  <p className="text-xs text-gray-500">Hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Producto con stock bajo</p>
                  <p className="text-xs text-gray-500">Hace 6 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-surface border-dark-border">
          <CardHeader>
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
            <CardDescription className="text-gray-400">
              Tareas comunes de administración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-primary/20 rounded-lg text-primary hover:bg-primary/30 transition-colors text-sm">
                Nueva Newsletter
              </button>
              <button className="p-3 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm">
                Añadir Producto
              </button>
              <button className="p-3 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors text-sm">
                Ver Pedidos
              </button>
              <button className="p-3 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors text-sm">
                Configuración
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
