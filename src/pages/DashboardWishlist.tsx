
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Grid, List, Plus, Heart, AlertCircle, TrendingDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WishlistItem {
  id: string;
  title: string;
  description: string;
  price_current: number;
  price_original: number;
  image_url: string;
  priority: 'high' | 'medium' | 'low';
  is_available: boolean;
  category: string;
  added_at: string;
  price_drop_percentage?: number;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    title: 'Prusa MINI+ 3D Printer',
    description: 'Impresora 3D compacta y confiable para makers',
    price_current: 42900,
    price_original: 45900,
    image_url: '/placeholder.svg',
    priority: 'high',
    is_available: true,
    category: 'Impresoras',
    added_at: '2024-01-10',
    price_drop_percentage: 6.5,
  },
  {
    id: '2',
    title: 'PLA+ Premium Filament 1kg',
    description: 'Filamento de alta calidad para impresión 3D',
    price_current: 2450,
    price_original: 2450,
    image_url: '/placeholder.svg',
    priority: 'medium',
    is_available: true,
    category: 'Materiales',
    added_at: '2024-01-08',
  },
];

const DashboardWishlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'Impresoras', 'Materiales', 'Herramientas', 'Accesorios'];
  const priorities = [
    { value: 'all', label: 'Todas las prioridades' },
    { value: 'high', label: 'Alta prioridad' },
    { value: 'medium', label: 'Media prioridad' },
    { value: 'low', label: 'Baja prioridad' },
  ];

  const totalValue = mockWishlistItems.reduce((sum, item) => sum + item.price_current, 0);
  const availableItems = mockWishlistItems.filter(item => item.is_available).length;
  const priceDrops = mockWishlistItems.filter(item => item.price_drop_percentage).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price: number) => {
    return `€${(price / 100).toFixed(2)}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mi Wishlist</h1>
            <p className="text-gray-400">Gestiona tus productos deseados</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Añadir Producto
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatPrice(totalValue)}</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{availableItems}</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">En Descuento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{priceDrops}</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockWishlistItems.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {mockWishlistItems.map((item) => (
            <div key={item.id} className={`
              bg-dark-surface rounded-xl border border-dark-border hover:border-gray-600 transition-colors
              ${viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center gap-4'}
            `}>
              {viewMode === 'grid' ? (
                <>
                  <div className="relative mb-4">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-40 rounded-lg object-cover bg-gray-700"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70">
                        <Heart className="w-4 h-4" />
                      </Button>
                      {item.price_drop_percentage && (
                        <Badge className="bg-green-500 text-white">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          -{item.price_drop_percentage}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                      <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                        {item.category}
                      </span>
                      {!item.is_available && (
                        <Badge variant="destructive">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Agotado
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-white">{formatPrice(item.price_current)}</div>
                        {item.price_original !== item.price_current && (
                          <div className="text-sm text-gray-400 line-through">{formatPrice(item.price_original)}</div>
                        )}
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Añadir al Carrito
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-700 flex-shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                      <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                        {item.category}
                      </span>
                      {item.price_drop_percentage && (
                        <Badge className="bg-green-500 text-white">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          -{item.price_drop_percentage}%
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{formatPrice(item.price_current)}</div>
                      {item.price_original !== item.price_current && (
                        <div className="text-sm text-gray-400 line-through">{formatPrice(item.price_original)}</div>
                      )}
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Añadir
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardWishlist;
