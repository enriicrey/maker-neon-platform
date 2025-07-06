
export interface Newsletter {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  views: string;
  category: NewsletterCategory;
  tags: string[];
  featured: boolean;
  image?: string;
  popularity: {
    reads: number;
    shares: number;
    comments: number;
  };
}

export type NewsletterCategory = 
  | 'drops-exclusivos'
  | 'tutoriales-tecnicos'
  | 'estrategias-negocio'
  | 'tendencias-sector'
  | 'casos-estudio';

export interface FilterOptions {
  category: NewsletterCategory | 'todos';
  dateRange: 'ultimo-mes' | 'ultimos-3-meses' | 'ultimo-ano' | 'todo';
  popularity: 'mas-leidas' | 'mas-compartidas' | 'mas-comentadas' | '';
  readTime: 'menos-5' | '5-10' | 'mas-10' | '';
  sortBy: 'mas-reciente' | 'mas-antiguo' | 'mas-popular' | 'alfabético' | 'tiempo-lectura';
}

export interface SearchState {
  query: string;
  filters: FilterOptions;
  currentPage: number;
  totalResults: number;
}
