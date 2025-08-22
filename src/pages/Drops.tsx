import { useState, useEffect } from 'react';
import { Package, Download, Star, Clock, Heart, Eye, Filter, Grid3X3, List, Search, ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/drops/ProductCard';
import { Countdown } from '@/components/ui/countdown';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Drops = () => {
  const [activeTab, setActiveTab] = useState('disponibles');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // Mock notifications
  const addNotification = (notification: any) => {};

  // Mock next drop date (2 days from now)
  const nextDropDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 23 * 60 * 1000);

  const handleNotifyMe = () => {
    addNotification({
      title: '🔔 Notificación Activada',
      message: 'Te avisaremos cuando el próximo drop esté disponible',
      type: 'general'
    });
  };

  const drops = [
    {
      id: 1,
      title: 'Lámpara Hexagonal Modular',
      description: 'Sistema de iluminación modular con patrones geométricos únicos. Edición limitada de 50 unidades.',
      price: 89.99,
      originalPrice: 129.99,
      currency: '€',
      downloads: '847',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
      category: 'Decoración',
      material: 'PLA Premium',
      printTime: '12h',
      difficulty: 'Intermedio',
      stock: 3,
      status: 'limited' as const,
      badges: ['LIMITED', 'TRENDING'],
      featured: true,
      tags: ['Modular', 'LED Compatible', 'Customizable']
    },
    {
      id: 2,
      title: 'Soporte Gaming RGB Elite',
      description: 'Soporte ergonómico para setup gaming con integración RGB y gestión de cables.',
      price: 67.50,
      currency: '€',
      downloads: '1.2K',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b',
      category: 'Gaming',
      material: 'PETG',
      printTime: '8h',
      difficulty: 'Fácil',
      stock: 15,
      status: 'live' as const,
      badges: ['LIVE'],
      featured: false,
      tags: ['RGB', 'Gaming', 'Ergonomic']
    },
    {
      id: 3,
      title: 'Organizador Minimalista Pro',
      description: 'Sistema de organización modular para escritorio. Diseño minimalista premium.',
      price: 0,
      currency: '€',
      downloads: '2.8K',
      rating: 4.7,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      category: 'Funcional',
      material: 'PLA',
      printTime: '6h',
      difficulty: 'Fácil',
      stock: 0,
      status: 'free' as const,
      badges: ['GRATIS', 'POPULAR'],
      featured: false,
      tags: ['Modular', 'Minimalist', 'Office']
    },
    {
      id: 4,
      title: 'Escultura Paramétrica Limitada',
      description: 'Pieza de arte generativa única. Solo 25 copias disponibles con certificado de autenticidad.',
      price: 199.99,
      currency: '€',
      downloads: '156',
      rating: 5.0,
      reviews: 43,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      category: 'Arte',
      material: 'Resin',
      printTime: '24h',
      difficulty: 'Expert',
      stock: 8,
      status: 'premium' as const,
      badges: ['MEMBERS ONLY', 'LIMITED'],
      featured: false,
      tags: ['Art', 'Parametric', 'Certificate']
    },
    {
      id: 5,
      title: 'Kit Herramientas Tech v2.0',
      description: 'Próximo lanzamiento: Set completo de herramientas especializadas para makers.',
      price: 45.00,
      currency: '€',
      downloads: '0',
      rating: 0,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      category: 'Tech',
      material: 'Multi-material',
      printTime: '10h',
      difficulty: 'Intermedio',
      stock: 100,
      status: 'coming-soon' as const,
      badges: ['DROPPING SOON'],
      featured: false,
      tags: ['Tools', 'Professional', 'Complete Kit'],
      dropDate: nextDropDate
    },
    {
      id: 6,
      title: 'Maceta Autoregante Smart',
      description: 'Sistema de riego automático integrado. Perfecto para plantas de interior.',
      price: 0,
      currency: '€',
      downloads: '934',
      rating: 0,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: 'Lifestyle',
      material: 'PETG',
      printTime: '4h',
      difficulty: 'Fácil',
      stock: 0,
      status: 'sold-out' as const,
      badges: ['SOLD OUT'],
      featured: false,
      tags: ['Smart', 'Plants', 'Automatic']
    }
  ];

  const categories = [
    'Todos',
    'Decoración',
    'Gaming', 
    'Funcional',
    'Arte',
    'Tech',
    'Lifestyle'
  ];

  const tabs = [
    { id: 'disponibles', label: 'Disponibles', count: drops.filter(d => d.status === 'live' || d.status === 'free').length },
    { id: 'proximos', label: 'Próximos', count: drops.filter(d => d.status === 'coming-soon').length },
    { id: 'agotados', label: 'Agotados', count: drops.filter(d => d.status === 'sold-out').length },
    { id: 'todos', label: 'Todos', count: drops.length }
  ];

  const filteredDrops = drops.filter(drop => {
    if (activeTab === 'disponibles') return drop.status === 'live' || drop.status === 'free';
    if (activeTab === 'proximos') return drop.status === 'coming-soon';
    if (activeTab === 'agotados') return drop.status === 'sold-out';
    return true;
  });

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                Drops Exclusivos
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              Productos únicos, stock limitado, disponibles solo para suscriptores
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <span>127 drops lanzados</span>
              <span>•</span>
              <span>2,847 makers satisfechos</span>
            </div>
          </div>

          {/* Next Drop Countdown */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-neon-cyan/10 border border-primary/20 rounded-2xl p-8 text-center">
            <Countdown
              targetDate={nextDropDate}
              variant="large"
              prefix="PRÓXIMO DROP EN:"
              onComplete={() => {
                addNotification({
                  title: '🔥 ¡Drop Disponible!',
                  message: 'Kit Herramientas Tech v2.0 ya está disponible. Stock limitado.',
                  type: 'drop-live',
                  productId: '5'
                });
              }}
            />
            <Button onClick={handleNotifyMe} className="btn-neon">
              Avisar cuando esté disponible
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-dark-surface border-b border-dark-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-black'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-dark-bg rounded-lg p-1 border border-dark-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-black' : 'text-muted-foreground hover:text-primary'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-black' : 'text-muted-foreground hover:text-primary'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más nuevo</SelectItem>
                  <SelectItem value="price-low">Precio: Bajo a Alto</SelectItem>
                  <SelectItem value="price-high">Precio: Alto a Bajo</SelectItem>
                  <SelectItem value="popular">Más populares</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter Button */}
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Drops Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredDrops.map((drop) => (
              <ProductCard
                key={drop.id}
                {...drop}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más productos
            </Button>
          </div>
        </div>
      </section>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-dark-border p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">Comparar ({compareList.length})</span>
              <div className="flex gap-2">
                {compareList.map(id => (
                  <div key={id} className="w-12 h-12 bg-dark-bg rounded border border-dark-border"></div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCompareList([])}>
                Limpiar
              </Button>
              <Button className="btn-neon">
                Comparar productos
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Drops;
