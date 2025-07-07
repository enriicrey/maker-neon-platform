
import { useState, useEffect } from 'react';
import { Package, Download, Star, Clock, Heart, Eye, Filter, Grid3X3, List, Search, ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';
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
  
  // Countdown timer state for next drop
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 14,
    minutes: 23,
    seconds: 15
  });

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      status: 'limited',
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
      status: 'live',
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
      status: 'free',
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
      status: 'premium',
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
      status: 'coming-soon',
      badges: ['DROPPING SOON'],
      featured: false,
      tags: ['Tools', 'Professional', 'Complete Kit']
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
      status: 'sold-out',
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

  const getStatusBadge = (status: string) => {
    const badges = {
      'live': { label: 'LIVE', className: 'bg-green-500/90 text-white animate-pulse' },
      'coming-soon': { label: 'DROPPING SOON', className: 'bg-yellow-500/90 text-black' },
      'sold-out': { label: 'SOLD OUT', className: 'bg-gray-500/90 text-white' },
      'limited': { label: 'LIMITED', className: 'bg-red-500/90 text-white' },
      'premium': { label: 'MEMBERS ONLY', className: 'bg-blue-500/90 text-white' },
      'free': { label: 'GRATIS', className: 'bg-primary/90 text-black' }
    };
    return badges[status as keyof typeof badges] || badges.live;
  };

  const getStockIndicator = (stock: number) => {
    if (stock === 0) return { text: 'Agotado', className: 'text-red-400' };
    if (stock <= 3) return { text: `¡Solo quedan ${stock}!`, className: 'text-red-400 animate-pulse' };
    if (stock <= 10) return { text: 'Pocas unidades', className: 'text-yellow-400' };
    return null;
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
            <h3 className="text-2xl font-bold mb-4">PRÓXIMO DROP EN:</h3>
            <div className="flex justify-center gap-4 mb-6">
              {[
                { value: countdown.days, label: 'DÍAS' },
                { value: countdown.hours, label: 'HORAS' },
                { value: countdown.minutes, label: 'MIN' },
                { value: countdown.seconds, label: 'SEG' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-dark-surface border border-primary/30 rounded-lg px-4 py-3 mb-2">
                    <span className="text-2xl font-bold text-primary">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <Button className="btn-neon">
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
            {filteredDrops.map((drop, index) => {
              const statusBadge = getStatusBadge(drop.status);
              const stockIndicator = getStockIndicator(drop.stock);
              const isWishlisted = wishlist.includes(drop.id.toString());
              
              return (
                <Card
                  key={drop.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 ${
                    drop.featured 
                      ? 'md:col-span-2 md:row-span-2 border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-primary/5' 
                      : 'hover:border-primary/30'
                  } ${viewMode === 'list' ? 'flex-row' : ''}`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1">
                      <Badge className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                      {drop.badges?.map((badge, i) => (
                        <Badge key={i} className="bg-primary/90 text-black text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(drop.id.toString())}
                      className="absolute top-3 right-3 z-10 p-2 bg-black/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    {/* Product Image */}
                    <div className={`bg-dark-surface rounded-lg overflow-hidden ${drop.featured ? 'aspect-square' : 'aspect-video'}`}>
                      <img
                        src={drop.image}
                        alt={drop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center gap-3">
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Vista rápida
                      </Button>
                    </div>
                  </div>

                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {drop.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {drop.description}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {drop.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-dark-surface px-2 py-1 rounded border border-dark-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                      <div>Material: {drop.material}</div>
                      <div>Tiempo: {drop.printTime}</div>
                      <div>Dificultad: {drop.difficulty}</div>
                      <div>Categoría: {drop.category}</div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{drop.downloads}</span>
                      </div>
                      {drop.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{drop.rating}</span>
                          <span>({drop.reviews})</span>
                        </div>
                      )}
                    </div>

                    {/* Stock Indicator */}
                    {stockIndicator && (
                      <div className={`text-sm font-medium mb-3 ${stockIndicator.className}`}>
                        {stockIndicator.text}
                      </div>
                    )}

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {drop.price === 0 ? (
                          <span className="text-2xl font-bold text-primary">GRATIS</span>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-primary">
                              {drop.currency}{drop.price}
                            </span>
                            {drop.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {drop.currency}{drop.originalPrice}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {drop.status === 'coming-soon' ? (
                          <Button size="sm" variant="outline">
                            Notificar
                          </Button>
                        ) : drop.status === 'sold-out' ? (
                          <Button size="sm" variant="outline" disabled>
                            Agotado
                          </Button>
                        ) : (
                          <Button size="sm" className="btn-neon">
                            {drop.price === 0 ? 'Descargar' : 'Comprar'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
