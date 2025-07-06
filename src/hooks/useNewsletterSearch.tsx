
import { useState, useCallback, useEffect } from 'react';
import { Newsletter, FilterOptions, SearchState } from '@/types/newsletter';

// Mock data - in a real app this would come from an API
const mockNewsletters: Newsletter[] = [
  {
    id: 1,
    title: 'Revolucionando la Impresión 3D con IA',
    excerpt: 'Descubre cómo la inteligencia artificial está transformando el diseño y fabricación 3D, desde algoritmos de optimización hasta generación automática de soportes.',
    date: '15 Mar 2024',
    readTime: '8 min',
    views: '2.4K',
    category: 'tendencias-sector',
    tags: ['IA', 'Tecnología', 'Futuro'],
    featured: true,
    popularity: { reads: 2400, shares: 156, comments: 23 }
  },
  {
    id: 2,
    title: 'Drop Exclusivo: Figuras Coleccionables Edición Limitada',
    excerpt: 'Solo 100 unidades disponibles de nuestra nueva colección de figuras de alta calidad. Acceso prioritario para suscriptores premium.',
    date: '12 Mar 2024',
    readTime: '5 min',
    views: '3.1K',
    category: 'drops-exclusivos',
    tags: ['Drop', 'Coleccionables', 'Limitado'],
    featured: true,
    popularity: { reads: 3100, shares: 234, comments: 45 }
  },
  {
    id: 3,
    title: 'Tutorial: Optimización de Soportes Avanzada',
    excerpt: 'Técnicas profesionales para reducir material de soporte y mejorar la calidad de superficie. Incluye configuraciones específicas para diferentes filamentos.',
    date: '10 Mar 2024',
    readTime: '12 min',
    views: '1.8K',
    category: 'tutoriales-tecnicos',
    tags: ['Tutorial', 'Soportes', 'Calidad'],
    featured: false,
    popularity: { reads: 1800, shares: 89, comments: 67 }
  },
  {
    id: 4,
    title: 'Caso de Estudio: De Hobby a Negocio en 6 Meses',
    excerpt: 'Análisis completo de cómo María convirtió su pasión por la impresión 3D en un negocio rentable. Incluye números reales y estrategias aplicadas.',
    date: '8 Mar 2024',
    readTime: '15 min',
    views: '2.7K',
    category: 'casos-estudio',
    tags: ['Caso de Estudio', 'Negocio', 'Éxito'],
    featured: false,
    popularity: { reads: 2700, shares: 178, comments: 34 }
  },
  {
    id: 5,
    title: 'Estrategias de Pricing para Drops Exitosos',
    excerpt: 'Cómo establecer precios que maximicen tus ganancias sin alejar a tu audiencia. Psicología del pricing aplicada al mercado maker.',
    date: '5 Mar 2024',
    readTime: '10 min',
    views: '1.9K',
    category: 'estrategias-negocio',
    tags: ['Pricing', 'Estrategia', 'Ventas'],
    featured: false,
    popularity: { reads: 1900, shares: 145, comments: 28 }
  }
];

const defaultFilters: FilterOptions = {
  category: 'todos',
  dateRange: 'todo',
  popularity: '',
  readTime: '',
  sortBy: 'mas-reciente'
};

export const useNewsletterSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    filters: defaultFilters,
    currentPage: 1,
    totalResults: 0
  });

  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState<string[]>([
    'Drops exclusivos',
    'Tutorial impresión',
    'Estrategias negocio',
    'Casos de éxito',
    'Tendencias 2024'
  ]);

  // Simulate API call with filtering and searching
  const searchNewsletters = useCallback(async (query: string, filters: FilterOptions) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockNewsletters];
    
    // Apply search query
    if (query.trim()) {
      filtered = filtered.filter(newsletter => 
        newsletter.title.toLowerCase().includes(query.toLowerCase()) ||
        newsletter.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        newsletter.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filters.category !== 'todos') {
      filtered = filtered.filter(newsletter => newsletter.category === filters.category);
    }
    
    // Apply read time filter
    if (filters.readTime) {
      filtered = filtered.filter(newsletter => {
        const time = parseInt(newsletter.readTime);
        switch (filters.readTime) {
          case 'menos-5': return time < 5;
          case '5-10': return time >= 5 && time <= 10;
          case 'mas-10': return time > 10;
          default: return true;
        }
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'mas-reciente':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'mas-antiguo':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'mas-popular':
          return b.popularity.reads - a.popularity.reads;
        case 'alfabético':
          return a.title.localeCompare(b.title);
        case 'tiempo-lectura':
          return parseInt(a.readTime) - parseInt(b.readTime);
        default:
          return 0;
      }
    });
    
    setNewsletters(filtered);
    setSearchState(prev => ({ ...prev, totalResults: filtered.length }));
    setIsLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    searchNewsletters(searchState.query, searchState.filters);
  }, [searchState.query, searchState.filters, searchNewsletters]);

  const updateSearch = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query, currentPage: 1 }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setSearchState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
      currentPage: 1
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      filters: defaultFilters,
      query: '',
      currentPage: 1
    }));
  }, []);

  return {
    searchState,
    newsletters,
    isLoading,
    suggestions,
    updateSearch,
    updateFilters,
    resetFilters,
    searchNewsletters
  };
};
