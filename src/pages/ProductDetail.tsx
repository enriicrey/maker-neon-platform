import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Download, Clock, ShoppingCart, Heart, Share, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  downloads: string;
  rating: number;
  reviews: number;
  images: string[];
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
}

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { state: cartState, dispatch } = useCart();

  // Mock product data for demonstration
  const mockProduct: Product = {
    id: 1,
    title: 'Cyberpunk Mask',
    description: 'A futuristic mask for your cyberpunk adventures.',
    price: 49.99,
    originalPrice: 59.99,
    currency: '€',
    downloads: '1.2k',
    rating: 4.5,
    reviews: 240,
    images: [
      '/examples/cyberpunk-mask-01.webp',
      '/examples/cyberpunk-mask-02.webp',
      '/examples/cyberpunk-mask-03.webp',
    ],
    category: 'Wearables',
    material: 'PLA',
    printTime: '8 hrs',
    difficulty: 'Intermedio',
    stock: 5,
    status: 'live',
    badges: ['New Arrival', 'Popular'],
    featured: true,
    tags: ['cyberpunk', 'mask', 'wearable', 'futuristic'],
    wishlist: [],
  };

  const [currentImage, setCurrentImage] = useState(mockProduct.images[0]);

  const handleAddToCart = () => {
    if (mockProduct) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: mockProduct.id.toString(),
          title: mockProduct.title,
          price: mockProduct.price,
          image: mockProduct.images[0],
          stock: mockProduct.stock
        }
      });
      dispatch({ type: 'OPEN_CART' });
    }
  };

  const getStockIndicator = () => {
    if (!mockProduct) return null;
    if (mockProduct.stock === 0) return { text: 'Agotado', className: 'text-red-400', urgent: false };
    if (mockProduct.stock <= 3) return { text: `¡Solo quedan ${mockProduct.stock}!`, className: 'text-red-400 animate-pulse', urgent: true };
    if (mockProduct.stock <= 10) return { text: 'Pocas unidades', className: 'text-yellow-400', urgent: false };
    return null;
  };

  const stockIndicator = getStockIndicator();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-400">
          <a href="/" className="hover:text-primary">Inicio</a>
          <span className="mx-2">/</span>
          <a href="/drops" className="hover:text-primary">Drops</a>
          <span className="mx-2">/</span>
          <span>{mockProduct?.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <img
            src={currentImage}
            alt={mockProduct?.title}
            className="w-full rounded-2xl aspect-square object-cover"
          />
          <div className="grid grid-cols-4 gap-2">
            {mockProduct?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${mockProduct?.title} - ${index + 1}`}
                className="w-full rounded-lg aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white">{mockProduct?.title}</h1>
            <p className="text-gray-400">{mockProduct?.description}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>{mockProduct?.downloads}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{mockProduct?.printTime}</span>
            </div>
            {mockProduct?.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>{mockProduct?.rating} ({mockProduct?.reviews})</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>Dificultad:</span>
              {/* Difficulty bars would go here */}
            </div>
          </div>

          {/* Stock Indicator */}
          {stockIndicator && (
            <div className={`flex items-center gap-2 ${stockIndicator.className}`}>
              {stockIndicator.urgent && <AlertTriangle className="w-4 h-4" />}
              <span className="text-sm font-medium">{stockIndicator.text}</span>
            </div>
          )}
          
          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="btn-neon text-lg py-4"
                onClick={handleAddToCart}
                disabled={mockProduct?.status === 'sold-out'}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {mockProduct?.price === 0 ? 'Descargar Gratis' : `Añadir al Carrito €${mockProduct?.price}`}
              </Button>
              <Button 
                variant="outline" 
                className="text-lg py-4"
                disabled={mockProduct?.status === 'sold-out'}
              >
                Comprar Ahora
              </Button>
            </div>
            
            <div className="flex justify-between text-gray-400">
              <button className="hover:text-white transition-colors flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Añadir a la Wishlist
              </button>
              <button className="hover:text-white transition-colors flex items-center gap-2">
                <Share className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </div>
          
          {/* Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Detalles del Producto</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <h3 className="font-medium text-white">Categoría</h3>
                <p>{mockProduct?.category}</p>
              </div>
              <div>
                <h3 className="font-medium text-white">Material</h3>
                <p>{mockProduct?.material}</p>
              </div>
              <div>
                <h3 className="font-medium text-white">Tags</h3>
                <div className="flex gap-2">
                  {mockProduct?.tags.map((tag, index) => (
                    <Badge key={index} className="bg-gray-800/50 text-gray-300">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
