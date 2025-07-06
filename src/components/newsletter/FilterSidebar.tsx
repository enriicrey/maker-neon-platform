
import { FilterOptions } from '@/types/newsletter';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  totalResults: number;
  isLoading?: boolean;
}

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  totalResults, 
  isLoading = false 
}: FilterSidebarProps) => {
  const categories = [
    { value: 'todos', label: 'Todos', emoji: '📚' },
    { value: 'drops-exclusivos', label: 'Drops Exclusivos', emoji: '🔥' },
    { value: 'tutoriales-tecnicos', label: 'Tutoriales Técnicos', emoji: '🛠️' },
    { value: 'estrategias-negocio', label: 'Estrategias de Negocio', emoji: '💰' },
    { value: 'tendencias-sector', label: 'Tendencias del Sector', emoji: '🌟' },
    { value: 'casos-estudio', label: 'Casos de Estudio', emoji: '📊' },
  ];

  const dateRanges = [
    { value: 'todo', label: 'Todo' },
    { value: 'ultimo-mes', label: 'Último mes' },
    { value: 'ultimos-3-meses', label: 'Últimos 3 meses' },
    { value: 'ultimo-ano', label: 'Último año' },
  ];

  const popularityOptions = [
    { value: '', label: 'Sin filtro' },
    { value: 'mas-leidas', label: 'Más leídas' },
    { value: 'mas-compartidas', label: 'Más compartidas' },
    { value: 'mas-comentadas', label: 'Más comentadas' },
  ];

  const readTimeOptions = [
    { value: '', label: 'Cualquier duración' },
    { value: 'menos-5', label: '< 5 min' },
    { value: '5-10', label: '5-10 min' },
    { value: 'mas-10', label: '> 10 min' },
  ];

  const sortOptions = [
    { value: 'mas-reciente', label: 'Más reciente' },
    { value: 'mas-antiguo', label: 'Más antiguo' },
    { value: 'mas-popular', label: 'Más popular' },
    { value: 'alfabético', label: 'Alfabético' },
    { value: 'tiempo-lectura', label: 'Tiempo de lectura' },
  ];

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Results Counter */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-medium">Filtros</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {isLoading ? '...' : `${totalResults} resultados`}
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Categorías</h3>
        <Tabs 
          value={filters.category} 
          onValueChange={(value) => onFiltersChange({ category: value as FilterOptions['category'] })}
          orientation="vertical"
          className="w-full"
        >
          <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 space-y-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <span className="mr-2">{category.emoji}</span>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Date Range */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Fecha</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 bg-dark-bg border border-dark-border rounded hover:border-primary/50 transition-colors">
            <span className="text-sm">
              {dateRanges.find(d => d.value === filters.dateRange)?.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {dateRanges.map((range) => (
              <DropdownMenuItem
                key={range.value}
                onClick={() => onFiltersChange({ dateRange: range.value as FilterOptions['dateRange'] })}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Popularity */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Popularidad</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 bg-dark-bg border border-dark-border rounded hover:border-primary/50 transition-colors">
            <span className="text-sm">
              {popularityOptions.find(p => p.value === filters.popularity)?.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {popularityOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFiltersChange({ popularity: option.value as FilterOptions['popularity'] })}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Read Time */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Tiempo de lectura</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 bg-dark-bg border border-dark-border rounded hover:border-primary/50 transition-colors">
            <span className="text-sm">
              {readTimeOptions.find(r => r.value === filters.readTime)?.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {readTimeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFiltersChange({ readTime: option.value as FilterOptions['readTime'] })}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sort By */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
        <h3 className="font-medium mb-4">Ordenar por</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 bg-dark-bg border border-dark-border rounded hover:border-primary/50 transition-colors">
            <span className="text-sm">
              {sortOptions.find(s => s.value === filters.sortBy)?.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFiltersChange({ sortBy: option.value as FilterOptions['sortBy'] })}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterSidebar;
