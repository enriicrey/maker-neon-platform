
import React, { useState, memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Share, Download, Star, Clock, ShoppingCart, Bell, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Countdown } from '@/components/ui/countdown';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  downloads: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  material: string;
  printTime: string;
  difficulty: string;
  stock: number;
  status: 'live' | 'coming-soon' | 'sold-out' | 'limited' | 'premium' | 'free';
  badges?: string[];
  featured: boolean;
  tags: string[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  dropDate?: Date;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
  id,
  title,
  description,
  price,
  originalPrice,
  currency,
  downloads,
  rating,
  reviews,
  image,
  category,
  material,
  printTime,
  difficulty,
  stock,
  status,
  badges = [],
  featured,
  tags,
  wishlist,
  onToggleWishlist,
  dropDate
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Memoize expensive calculations
  const isWishlisted = useMemo(() => wishlist.includes(id.toString()), [wishlist, id]);
  const slug = useMemo(() => 
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), 
    [title]
  );

  // Memoize expensive calculations
  const statusBadge = useMemo(() => {
    const statusConfig = {
      'live': { label: 'LIVE', className: 'bg-green-500/90 text-white animate-pulse' },
      'coming-soon': { label: 'DROPPING SOON', className: 'bg-yellow-500/90 text-black font-bold' },
      'sold-out': { label: 'SOLD OUT', className: 'bg-red-500/80 text-white' },
      'limited': { label: 'LIMITED', className: 'bg-orange-500/90 text-white' },
      'premium': { label: 'MEMBERS ONLY', className: 'bg-blue-500/90 text-white' },
      'free': { label: 'GRATIS', className: 'bg-primary/90 text-black font-bold' }
    };
    return statusConfig[status] || statusConfig.live;
  }, [status]);

  const stockIndicator = useMemo(() => {
    if (stock === 0) return { text: 'Agotado', className: 'text-red-400', urgent: false };
    if (stock <= 3) return { text: `¡Solo quedan ${stock}!`, className: 'text-red-400 animate-pulse', urgent: true };
    if (stock <= 10) return { text: 'Pocas unidades', className: 'text-yellow-400', urgent: false };
    return null;
  }, [stock]);

  const difficultyBars = useMemo(() => {
    const levels = { 'Fácil': 1, 'Intermedio': 3, 'Expert': 5 };
    const level = levels[difficulty as keyof typeof levels] || 1;
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-1 h-3 rounded-full ${
          i < level ? 'bg-primary' : 'bg-gray-600'
        }`}
      />
    ));
  }, [difficulty]);

  // Memoize event handlers
  const handleWishlistToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist(id.toString());
  }, [onToggleWishlist, id]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  return (
    <Link to={`/drops/${slug}`}>
      <div
        className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] cursor-pointer ${
          featured ? 'md:col-span-2 border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-primary/5' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className={`relative ${featured ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
          {/* Status Badges - Top Left */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <Badge className={statusBadge.className}>
              {statusBadge.label}
            </Badge>
            {badges.map((badge, i) => (
              <Badge key={i} className="bg-primary/90 text-black text-xs font-bold uppercase tracking-wide">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Featured Badge - Top Right */}
          {featured && (
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold animate-pulse">
                ✨ DESTACADO
              </Badge>
            </div>
          )}

          {/* Countdown Overlay for Coming Soon */}
          {status === 'coming-soon' && dropDate && (
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 text-center">
                <Countdown
                  targetDate={dropDate}
                  variant="overlay"
                  prefix="Disponible en:"
                  showLabels={false}
                  className="text-primary font-bold"
                />
              </div>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-white hover:text-red-400'
              }`} 
            />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full bg-gray-800">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Hover Actions Overlay */}
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button size="sm" variant="secondary" className="gap-2 backdrop-blur-sm">
              <Eye className="w-4 h-4" />
              Vista rápida
            </Button>
            <Button size="sm" className="gap-2 btn-neon">
              <ShoppingCart className="w-4 h-4" />
              Añadir
            </Button>
          </div>

          {/* Stock Status Overlay */}
          {status === 'sold-out' && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <p className="text-white font-bold text-lg mb-2">AGOTADO</p>
                <Button size="sm" variant="outline">
                  Notificar Restock
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded hover:bg-gray-700/50 hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded">
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>{downloads}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{printTime}</span>
            </div>
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>{rating} ({reviews})</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>Dificultad:</span>
              <div className="flex gap-0.5">
                {difficultyBars}
              </div>
            </div>
          </div>

          {/* Stock Indicator */}
          {stockIndicator && (
            <div className={`flex items-center gap-2 mb-4 ${stockIndicator.className}`}>
              {stockIndicator.urgent && <AlertTriangle className="w-4 h-4" />}
              <span className="text-sm font-medium">{stockIndicator.text}</span>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {price === 0 ? (
                <span className="text-2xl font-bold text-primary">GRATIS</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {currency}{price}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {currency}{originalPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex gap-2">
              {status === 'coming-soon' ? (
                <Button size="sm" variant="outline" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notificar
                </Button>
              ) : status === 'sold-out' ? (
                <Button size="sm" variant="outline" disabled>
                  Agotado
                </Button>
              ) : (
                <Button size="sm" className="btn-neon gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  {price === 0 ? 'Descargar' : 'Comprar'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Urgent Stock Animation */}
        {stockIndicator?.urgent && (
          <div className="absolute inset-0 pointer-events-none border-2 border-red-500/50 rounded-2xl animate-pulse" />
        )}
      </div>
    </Link>
  );
});

export default ProductCard;
