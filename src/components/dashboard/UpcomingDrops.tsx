
import React from 'react';
import { Clock, Bell, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Drop {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
  timeLeft: string;
  price: string;
  category: string;
  isNotified: boolean;
}

const upcomingDrops: Drop[] = [
  {
    id: '1',
    title: 'Cyberpunk Vehicle Pack',
    image: '/placeholder.svg',
    releaseDate: '2024-01-15',
    timeLeft: '2 días',
    price: '€24.99',
    category: 'Vehículos',
    isNotified: false,
  },
  {
    id: '2',
    title: 'Organic Textures Collection',
    image: '/placeholder.svg',
    releaseDate: '2024-01-20',
    timeLeft: '1 semana',
    price: '€19.99',
    category: 'Texturas',
    isNotified: true,
  },
  {
    id: '3',
    title: 'Medieval Weapons Arsenal',
    image: '/placeholder.svg',
    releaseDate: '2024-01-25',
    timeLeft: '2 semanas',
    price: '€29.99',
    category: 'Armas',
    isNotified: false,
  },
];

const UpcomingDrops: React.FC = () => {
  const handleNotifyToggle = (dropId: string) => {
    console.log(`Toggle notification for drop ${dropId}`);
  };

  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Próximos Drops de Interés</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todos
        </button>
      </div>
      
      <div className="space-y-4">
        {upcomingDrops.map((drop) => (
          <div key={drop.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <img 
              src={drop.image} 
              alt={drop.title}
              className="w-16 h-16 rounded-lg object-cover bg-gray-700"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-white">{drop.title}</h4>
                <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                  {drop.category}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{drop.price}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Disponible en {drop.timeLeft}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant={drop.isNotified ? "default" : "outline"}
                onClick={() => handleNotifyToggle(drop.id)}
                className="text-xs"
              >
                <Bell className="w-3 h-3 mr-1" />
                {drop.isNotified ? 'Notificando' : 'Notificar'}
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                Ver
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDrops;
