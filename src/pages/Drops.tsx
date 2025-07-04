
import { Package, Download, Star, Clock } from 'lucide-react';
import Layout from '../components/Layout';

const Drops = () => {
  const drops = [
    {
      id: 1,
      title: 'Pack Miniatures Fantasy Vol.1',
      description: 'Colección exclusiva de 25 miniaturas fantasy listas para imprimir. Incluye héroes, criaturas y accesorios.',
      price: 'Gratis',
      downloads: '15.2K',
      rating: 4.9,
      image: '/api/placeholder/300/200',
      tags: ['Fantasy', 'Miniatures', 'RPG'],
      featured: true,
    },
    {
      id: 2,
      title: 'Architectural Elements Pro',
      description: 'Elementos arquitectónicos detallados para maquetas y dioramas profesionales.',
      price: '$12.99',
      downloads: '8.7K',
      rating: 4.8,
      image: '/api/placeholder/300/200',
      tags: ['Architecture', 'Professional', 'Detailed'],
      featured: false,
    },
    {
      id: 3,
      title: 'Functional Tools Collection',
      description: 'Herramientas funcionales diseñadas para uso real. Probadas y optimizadas.',
      price: '$8.99',
      downloads: '12.1K',
      rating: 4.7,
      image: '/api/placeholder/300/200',
      tags: ['Tools', 'Functional', 'Practical'],
      featured: false,
    },
    {
      id: 4,
      title: 'Sci-Fi Vehicle Pack',
      description: 'Vehículos futuristas y naves espaciales con detalles increíbles.',
      price: '$15.99',
      downloads: '6.3K',
      rating: 4.9,
      image: '/api/placeholder/300/200',
      tags: ['Sci-Fi', 'Vehicles', 'Detailed'],
      featured: false,
    },
  ];

  const categories = [
    'Todos',
    'Fantasy',
    'Sci-Fi',
    'Tools',
    'Architecture',
    'Miniatures',
    'Functional',
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Drops Exclusivos</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Drops</span> Premium
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Modelos 3D exclusivos, colecciones limitadas y contenido premium 
              creado especialmente para nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-dark-surface border-b border-dark-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  category === 'Todos'
                    ? 'bg-primary text-black'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Drops Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {drops.map((drop) => (
              <div
                key={drop.id}
                className={`card-neon group cursor-pointer ${
                  drop.featured ? 'border-primary/30' : ''
                }`}
              >
                {drop.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-black text-xs font-semibold px-2 py-1 rounded z-10">
                    DESTACADO
                  </div>
                )}
                
                <div className="aspect-video bg-dark-surface rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-neon-cyan/20 flex items-center justify-center">
                    <Package className="w-12 h-12 text-primary" />
                  </div>
                </div>
                
                <div className="p-1">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {drop.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {drop.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {drop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-dark-surface px-2 py-1 rounded border border-dark-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{drop.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{drop.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {drop.price}
                    </span>
                    <button className="btn-neon py-2 px-4 text-sm">
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-outline-neon">
              Cargar Más Drops
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Drops;
