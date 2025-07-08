
import React from 'react';
import { Clock, BookOpen, Heart, ShoppingBag, Star } from 'lucide-react';

interface Activity {
  id: string;
  type: 'read' | 'wishlist' | 'order' | 'review';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'read',
    title: 'Newsletter: IA en Impresión 3D',
    description: 'Completaste la lectura',
    timestamp: 'Hace 2 horas',
    icon: BookOpen,
  },
  {
    id: '2',
    type: 'wishlist',
    title: 'Fantasy Miniatures Pack',
    description: 'Añadido a wishlist',
    timestamp: 'Hace 5 horas',
    icon: Heart,
  },
  {
    id: '3',
    type: 'order',
    title: 'Pedido #1234',
    description: 'Enviado - Llega mañana',
    timestamp: 'Hace 1 día',
    icon: ShoppingBag,
  },
  {
    id: '4',
    type: 'review',
    title: 'Architectural Elements Pro',
    description: 'Calificaste con 5 estrellas',
    timestamp: 'Hace 2 días',
    icon: Star,
  },
  {
    id: '5',
    type: 'read',
    title: 'Newsletter: Tendencias de Diseño',
    description: 'Completaste la lectura',
    timestamp: 'Hace 3 días',
    icon: BookOpen,
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todo
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{activity.title}</h4>
                <p className="text-sm text-gray-400">{activity.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {activity.timestamp}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
