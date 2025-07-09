
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Filter, Grid, List, Plus, Star, Clock, BookOpen, Tag, Collection } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface SavedNewsletter {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  read_status: 'unread' | 'reading' | 'completed';
  is_favorite: boolean;
  reading_progress: number;
  collection: string;
  tags: string[];
  saved_at: string;
  estimated_read_time: number;
}

const mockNewsletters: SavedNewsletter[] = [
  {
    id: '1',
    title: 'Técnicas Avanzadas de Supports en Impresión 3D',
    excerpt: 'Aprende a dominar los supports para conseguir impresiones perfectas sin marcas...',
    image_url: '/placeholder.svg',
    read_status: 'reading',
    is_favorite: true,
    reading_progress: 45,
    collection: 'Técnicas Avanzadas',
    tags: ['supports', 'técnica', 'impresión'],
    saved_at: '2024-01-10',
    estimated_read_time: 8,
  },
  {
    id: '2',
    title: 'Nuevos Materiales: PLA-CF Carbon Fiber',
    excerpt: 'Descubre las propiedades y aplicaciones del nuevo filamento con fibra de carbono...',
    image_url: '/placeholder.svg',
    read_status: 'unread',
    is_favorite: false,
    reading_progress: 0,
    collection: 'Materiales',
    tags: ['materiales', 'carbono', 'innovación'],
    saved_at: '2024-01-08',
    estimated_read_time: 12,
  },
  {
    id: '3',
    title: 'Case Study: Prótesis Impresas en 3D',
    excerpt: 'Análisis completo de un proyecto real de prótesis funcionales...',
    image_url: '/placeholder.svg',
    read_status: 'completed',
    is_favorite: true,
    reading_progress: 100,
    collection: 'Casos de Estudio',
    tags: ['médico', 'caso-estudio', 'social'],
    saved_at: '2024-01-05',
    estimated_read_time: 15,
  },
];

const DashboardBiblioteca = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const collections = ['all', 'Técnicas Avanzadas', 'Materiales', 'Casos de Estudio', 'Sin Clasificar'];
  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'unread', label: 'No leídos' },
    { value: 'reading', label: 'En progreso' },
    { value: 'completed', label: 'Completados' },
    { value: 'favorites', label: 'Favoritos' },
  ];

  // Stats calculation
  const totalNewsletters = mockNewsletters.length;
  const totalReadTime = mockNewsletters.reduce((sum, item) => sum + item.estimated_read_time, 0);
  const completedCount = mockNewsletters.filter(item => item.read_status === 'completed').length;
  const favoriteCount = mockNewsletters.filter(item => item.is_favorite).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reading': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'unread': return 'No leído';
      case 'reading': return 'En progreso';
      case 'completed': return 'Completado';
      default: return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mi Biblioteca Personal</h1>
            <p className="text-gray-400">Organiza y gestiona tu contenido guardado</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Colección
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
              <CardTitle className="text-sm text-gray-400">Newsletters Guardadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalNewsletters}</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Tiempo de Lectura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{totalReadTime}min</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Completados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{completedCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{favoriteCount}</div>
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
                  placeholder="Buscar en biblioteca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={selectedCollection} onValueChange={setSelectedCollection}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Colección" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((collection) => (
                  <SelectItem key={collection} value={collection}>
                    {collection === 'all' ? 'Todas las colecciones' : collection}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Newsletter Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {mockNewsletters.map((newsletter) => (
            <div key={newsletter.id} className={`
              bg-dark-surface rounded-xl border border-dark-border hover:border-gray-600 transition-colors
              ${viewMode === 'grid' ? 'p-6' : 'p-4 flex items-center gap-4'}
            `}>
              {viewMode === 'grid' ? (
                <>
                  <div className="relative mb-4">
                    <img 
                      src={newsletter.image_url} 
                      alt={newsletter.title}
                      className="w-full h-40 rounded-lg object-cover bg-gray-700"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      {newsletter.is_favorite && (
                        <div className="bg-yellow-500 rounded-full p-1">
                          <Star className="w-4 h-4 fill-current text-white" />
                        </div>
                      )}
                      {newsletter.read_status === 'unread' && (
                        <Badge className="bg-blue-500 text-white">NUEVO</Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(newsletter.read_status)}>
                        {getStatusLabel(newsletter.read_status)}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {newsletter.estimated_read_time}min
                      </div>
                    </div>
                    <h3 className="font-semibold text-white">{newsletter.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{newsletter.excerpt}</p>
                    
                    {newsletter.read_status === 'reading' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Progreso</span>
                          <span>{newsletter.reading_progress}%</span>
                        </div>
                        <Progress value={newsletter.reading_progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center gap-1 flex-wrap">
                      <Collection className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{newsletter.collection}</span>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap">
                      {newsletter.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">{newsletter.saved_at}</span>
                      <Button size="sm" variant="outline" className="text-xs">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {newsletter.read_status === 'completed' ? 'Leer de nuevo' : 'Continuar'}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img 
                    src={newsletter.image_url} 
                    alt={newsletter.title}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-700 flex-shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(newsletter.read_status)}>
                        {getStatusLabel(newsletter.read_status)}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {newsletter.estimated_read_time}min
                      </div>
                      {newsletter.is_favorite && (
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                      )}
                    </div>
                    <h3 className="font-semibold text-white">{newsletter.title}</h3>
                    <p className="text-sm text-gray-400">{newsletter.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{newsletter.collection}</span>
                      <span>•</span>
                      <span>{newsletter.saved_at}</span>
                    </div>
                    {newsletter.read_status === 'reading' && (
                      <Progress value={newsletter.reading_progress} className="h-1 mt-2" />
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Button size="sm" variant="outline" className="text-xs">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {newsletter.read_status === 'completed' ? 'Releer' : 'Leer'}
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

export default DashboardBiblioteca;
