
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Grid, List, Star, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Newsletter {
  id: string;
  title: string;
  category: string;
  readTime: string;
  isRead: boolean;
  isFavorite: boolean;
  publishDate: string;
  excerpt: string;
  image: string;
}

const mockNewsletters: Newsletter[] = [
  {
    id: '1',
    title: 'IA en Impresión 3D: El Futuro es Ahora',
    category: 'Tecnología',
    readTime: '8 min',
    isRead: true,
    isFavorite: true,
    publishDate: '2024-01-10',
    excerpt: 'Descubre cómo la inteligencia artificial está revolucionando la impresión 3D...',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Técnicas Avanzadas de Texturizado',
    category: 'Tutorial',
    readTime: '12 min',
    isRead: false,
    isFavorite: false,
    publishDate: '2024-01-08',
    excerpt: 'Aprende técnicas profesionales para crear texturas realistas en tus modelos 3D...',
    image: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Tendencias de Diseño 2024',
    category: 'Diseño',
    readTime: '6 min',
    isRead: true,
    isFavorite: true,
    publishDate: '2024-01-05',
    excerpt: 'Las tendencias de diseño que marcarán el año 2024 en el mundo del 3D...',
    image: '/placeholder.svg',
  },
];

const DashboardLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterRead, setFilterRead] = useState('all');

  const categories = ['all', 'Tecnología', 'Tutorial', 'Diseño', 'Noticias'];
  const readFilters = [
    { value: 'all', label: 'Todos' },
    { value: 'read', label: 'Leídos' },
    { value: 'unread', label: 'No leídos' },
    { value: 'favorites', label: 'Favoritos' },
  ];

  const filteredNewsletters = mockNewsletters.filter((newsletter) => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || newsletter.category === selectedCategory;
    const matchesRead = filterRead === 'all' ||
                       (filterRead === 'read' && newsletter.isRead) ||
                       (filterRead === 'unread' && !newsletter.isRead) ||
                       (filterRead === 'favorites' && newsletter.isFavorite);
    
    return matchesSearch && matchesCategory && matchesRead;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mi Biblioteca</h1>
            <p className="text-gray-400">Gestiona tus newsletters guardadas</p>
          </div>
          <div className="flex items-center gap-2">
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

        {/* Filters */}
        <div className="bg-dark-surface rounded-xl p-6 border border-dark-border">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar newsletters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>

            {/* Read Status Filter */}
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              {readFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Newsletter Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {filteredNewsletters.map((newsletter) => (
            <div key={newsletter.id} className={`
              bg-dark-surface rounded-xl border border-dark-border hover:border-gray-600 transition-colors
              ${viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center gap-4'}
            `}>
              {viewMode === 'grid' ? (
                <>
                  <div className="relative mb-4">
                    <img 
                      src={newsletter.image} 
                      alt={newsletter.title}
                      className="w-full h-40 rounded-lg object-cover bg-gray-700"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      {newsletter.isFavorite && (
                        <div className="bg-yellow-500 rounded-full p-1">
                          <Star className="w-4 h-4 fill-current text-white" />
                        </div>
                      )}
                      {!newsletter.isRead && (
                        <div className="bg-blue-500 rounded-full p-1">
                          <Bookmark className="w-4 h-4 fill-current text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                        {newsletter.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {newsletter.readTime}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white">{newsletter.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{newsletter.excerpt}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">{newsletter.publishDate}</span>
                      <Button size="sm" variant="outline" className="text-xs">
                        {newsletter.isRead ? 'Leer de nuevo' : 'Leer ahora'}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img 
                    src={newsletter.image} 
                    alt={newsletter.title}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-700 flex-shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                        {newsletter.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {newsletter.readTime}
                      </div>
                      {newsletter.isFavorite && (
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                      )}
                    </div>
                    <h3 className="font-semibold text-white">{newsletter.title}</h3>
                    <p className="text-sm text-gray-400">{newsletter.excerpt}</p>
                    <span className="text-xs text-gray-500">{newsletter.publishDate}</span>
                  </div>
                  <div className="flex-shrink-0">
                    <Button size="sm" variant="outline" className="text-xs">
                      {newsletter.isRead ? 'Leer de nuevo' : 'Leer ahora'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredNewsletters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No se encontraron newsletters</p>
              <p className="text-sm">Prueba ajustando los filtros de búsqueda</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardLibrary;
