
import React from 'react';
import { BookOpen, Heart, ShoppingBag, Clock, TrendingUp, Star } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatCard[] = [
  {
    title: 'Newsletters Leídas',
    value: '12',
    change: '+3 este mes',
    positive: true,
    icon: BookOpen,
  },
  {
    title: 'Productos en Wishlist',
    value: '7',
    change: '+2 esta semana',
    positive: true,
    icon: Heart,
  },
  {
    title: 'Pedidos Realizados',
    value: '4',
    change: '€156 total',
    positive: true,
    icon: ShoppingBag,
  },
  {
    title: 'Tiempo de Lectura',
    value: '8.5h',
    change: '+2.3h este mes',
    positive: true,
    icon: Clock,
  },
];

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-dark-surface rounded-xl p-6 border border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-sm font-medium ${
                stat.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
