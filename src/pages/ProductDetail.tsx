
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share, 
  Star, 
  Download, 
  Clock, 
  HardDrive,
  ChevronRight,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Eye,
  User,
  Shield,
  Truck,
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/drops/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('standard');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock product data - in real app this would come from API/database
  const product = {
    id: 1,
    title: 'Lámpara Hexagonal Modular Premium',
    slug: 'lampara-hexagonal-modular',
    description: 'Sistema de iluminación modular revolucionario con patrones geométricos únicos. Esta edición limitada de 50 unidades combina funcionalidad excepcional con diseño vanguardista. Cada módulo se conecta magnéticamente, permitiendo infinitas configuraciones personalizadas.',
    longDescription: `
      **Características Destacadas:**
      - Sistema modular magnético patentado
      - Compatible con LED RGB y blancos cálidos
      - Impresión sin soportes requeridos
      - Certificado de autenticidad incluido
      - Diseño paramétrico completamente personalizable
      
      **Casos de Uso:**
      - Iluminación ambiental para gaming setups
      - Decoración moderna para oficinas
      - Regalo premium para makers y diseñadores
      - Proyecto educativo para instituciones
    `,
    price: 89.99,
    originalPrice: 129.99,
    currency: '€',
    discount: 31,
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    ],
    downloads: 847,
    rating: 4.9,
    reviews: 127,
    category: 'Decoración',
    material: 'PLA Premium',
    printTime: '12h 30m',
    difficulty: 3,
    fileSize: '45.2 MB',
    stock: 3,
    status: 'limited' as const,
    tags: ['Modular', 'LED Compatible', 'Customizable', 'Premium'],
    designer: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      verified: true,
      products: 23,
      rating: 4.8,
      followers: 1205
    },
    specifications: {
      'Dimensiones': '200mm x 173mm x 25mm',
      'Material recomendado': 'PLA, PETG',
      'Resolución mínima': '0.2mm',
      'Soportes': 'No requeridos',
      'Relleno': '15-20%',
      'Velocidad': '50mm/s',
      'Temperatura extrusor': '210°C (PLA), 235°C (PETG)',
      'Temperatura cama': '60°C',
      'Compatibilidad': 'Todas las impresoras FDM'
    },
    files: [
      { name: 'hexagon_base.stl', size: '12.3 MB' },
      { name: 'hexagon_diffuser.stl', size: '8.7 MB' },
      { name: 'connector_male.stl', size: '2.1 MB' },
      { name: 'connector_female.stl', size: '2.1 MB' },
      { name: 'led_holder.stl', size: '5.2 MB' },
      { name: 'assembly_guide.pdf', size: '14.8 MB' }
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      title: 'Soporte Gaming RGB Elite',
      description: 'Soporte ergonómico para setup gaming',
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
      tags: ['RGB', 'Gaming', 'Ergonomic'],
      wishlist: [],
      onToggleWishlist: () => {}
    }
  ];

  const getDifficultyBars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-4 rounded-full ${
          i < product.difficulty ? 'bg-primary' : 'bg-gray-600'
        }`}
      />
    ));
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Agotado', className: 'text-red-400', canBuy: false };
    if (product.stock <= 3) return { text: `¡Solo quedan ${product.stock}!`, className: 'text-red-400 animate-pulse', canBuy: true };
    if (product.stock <= 10) return { text: 'Pocas unidades', className: 'text-yellow-400', canBuy: true };
    return { text: 'Disponible', className: 'text-green-400', canBuy: true };
  };

  const stockStatus = getStockStatus();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/drops" className="hover:text-primary">Drops</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-primary">{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Product Content */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Product Gallery - 60% */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden mb-4 cursor-zoom-in">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onClick={() => setShowLightbox(true)}
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-gray-500'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-center gap-8 mt-8 p-6 bg-gray-900/50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <RotateCcw className="w-4 h-4 text-green-400" />
                <span>30 días devolución</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Truck className="w-4 h-4 text-green-400" />
                <span>Envío 24-48h</span>
              </div>
            </div>
          </div>

          {/* Product Info - 40% */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-500/90 text-white">LIMITED</Badge>
                {product.discount > 0 && (
                  <Badge className="bg-green-500/90 text-black">-{product.discount}%</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.title}</h1>

              {/* Pricing */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-primary">
                  {product.currency}{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    {product.currency}{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Quick Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Download className="w-4 h-4" />
                  <span>{product.downloads.toLocaleString()} descargas</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{product.printTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <HardDrive className="w-4 h-4" />
                  <span>{product.fileSize}</span>
                </div>
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-gray-300">Dificultad:</span>
                <div className="flex gap-1">
                  {getDifficultyBars()}
                </div>
                <span className="text-sm text-gray-300 ml-2">Intermedio</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className={`flex items-center gap-2 mb-6 ${stockStatus.className}`}>
              {product.stock <= 3 && product.stock > 0 && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
              <span className="font-medium">{stockStatus.text}</span>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">Cantidad:</span>
                <div className="flex items-center bg-gray-800 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-700 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-700 rounded-r-lg transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Actions */}
              <div className="space-y-3">
                <Button 
                  className="w-full btn-neon h-12 text-lg" 
                  disabled={!stockStatus.canBuy}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Añadir al Carrito {product.currency}{(product.price * quantity).toFixed(2)}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    <Zap className="w-4 h-4 mr-2" />
                    Comprar Ahora
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12">
                      <Share className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Designer Info */}
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.designer.avatar}
                    alt={product.designer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{product.designer.name}</h3>
                      {product.designer.verified && (
                        <Badge className="bg-blue-500/90 text-white text-xs">✓</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      {product.designer.products} productos • {product.designer.rating}★
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Seguir
                </Button>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar Diseñador
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="files">Archivos</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="whitespace-pre-line text-gray-300">
                  {product.longDescription}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-700">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="files" className="mt-8">
              <div className="space-y-4">
                {product.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <HardDrive className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-400">{file.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="text-center py-12 text-gray-400">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p>Las reviews estarán disponibles próximamente</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">También te puede gustar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold text-primary">{product.currency}{product.price}</p>
            <p className={`text-sm ${stockStatus.className}`}>{stockStatus.text}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button size="icon" variant="outline">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button className="w-full btn-neon" disabled={!stockStatus.canBuy}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Añadir al Carrito
        </Button>
      </div>
    </Layout>
  );
};

export default ProductDetail;
