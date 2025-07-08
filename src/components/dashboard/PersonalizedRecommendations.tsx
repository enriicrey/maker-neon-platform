
import React from 'react';
import { Sparkles, TrendingUp, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Recommendation {
  id: string;
  title: string;
  type: 'product' | 'newsletter' | 'collection';
  image: string;
  description: string;
  price?: string;
  rating: number;
  category: string;
  reason: string;
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Sci-Fi Weapons Master Pack',
    type: 'product',
    image: '/placeholder.svg',
    description: 'Colección completa de armas futuristas',
    price: '€34.99',
    rating: 4.8,
    category: 'Armas',
    reason: 'Basado en tu wishlist',
  },
  {
    id: '2',
    title: 'Newsletter: Técnicas de Texturizado',
    type: 'newsletter',
    image: '/placeholder.svg',
    description: 'Aprende las últimas técnicas de texturizado 3D',
    rating: 4.9,
    category: 'Tutorial',
    reason: 'Por tus categorías favoritas',
  },
  {
    id: '3',
    title: 'Architectural Mega Bundle',
    type: 'collection',
    image: '/placeholder.svg',
    description: 'Todo lo que necesitas para arquitectura',
    price: '€49.99',
    rating: 4.7,
    category: 'Arquitectura',
    reason: 'Usuarios similares compraron',
  },
];

const PersonalizedRecommendations: React.FC = () => {
  return (
    <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-white">Recomendado para Ti</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Actualizar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((item) => (
          <div key={item.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="relative mb-3">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-32 rounded-lg object-cover bg-gray-700"
              />
              <div className="absolute top-2 right-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                  {item.category}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-xs text-gray-400">{item.rating}</span>
                </div>
              </div>
              
              <h4 className="font-medium text-white text-sm">{item.title}</h4>
              <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                {item.price && (
                  <span className="text-sm font-semibold text-primary">{item.price}</span>
                )}
                <Button size="sm" variant="outline" className="text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Ver
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 italic">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
