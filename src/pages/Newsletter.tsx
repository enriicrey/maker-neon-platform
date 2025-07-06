
import { useState } from 'react';
import { Mail, Users, Download, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import SearchBar from '../components/newsletter/SearchBar';
import FilterSidebar from '../components/newsletter/FilterSidebar';
import NewsletterCard from '../components/newsletter/NewsletterCard';
import LoadingGrid from '../components/newsletter/LoadingGrid';
import { useNewsletterSearch } from '../hooks/useNewsletterSearch';
import { useCountUp } from '../hooks/useCountUp';

const Newsletter = () => {
  const {
    searchState,
    newsletters,
    isLoading,
    suggestions,
    updateSearch,
    updateFilters,
    resetFilters
  } = useNewsletterSearch();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const totalCount = useCountUp(127, 2000);

  const handleNewsletterClick = (newsletter: any) => {
    // In a real app, this would navigate to the newsletter detail page
    console.log('Opening newsletter:', newsletter.title);
  };

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-dark-surface rounded-full flex items-center justify-center mb-6">
        <Mail className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-4">No encontramos newsletters</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        No hay newsletters que coincidan con tus criterios de búsqueda. 
        Prueba con otros términos o ajusta los filtros.
      </p>
      <button
        onClick={resetFilters}
        className="btn-outline-neon inline-flex items-center space-x-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Limpiar filtros</span>
      </button>
    </div>
  );

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="mb-6 inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Archivo Completo</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Archivo de <span className="text-gradient">Newsletters</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Todas nuestras ediciones organizadas para tu aprendizaje continuo
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-lg">
                  <span className="font-bold text-primary">{totalCount}</span> newsletters publicadas
                </span>
              </div>
              
              <button className="btn-neon inline-flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Suscríbete para recibir las nuevas</span>
              </button>
            </div>

            {/* Search Bar */}
            <SearchBar
              value={searchState.query}
              onChange={updateSearch}
              onSearch={updateSearch}
              placeholder="Buscar por título, contenido o tags..."
              suggestions={suggestions}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full btn-outline-neon mb-6"
              >
                Filtros ({Object.values(searchState.filters).filter(Boolean).length})
              </button>
              
              {isMobileFilterOpen && (
                <div className="mb-8">
                  <FilterSidebar
                    filters={searchState.filters}
                    onFiltersChange={updateFilters}
                    totalResults={searchState.totalResults}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <FilterSidebar
                filters={searchState.filters}
                onFiltersChange={updateFilters}
                totalResults={searchState.totalResults}
                isLoading={isLoading}
              />
            </aside>

            {/* Newsletter Grid */}
            <main className="flex-1">
              {isLoading ? (
                <LoadingGrid count={12} />
              ) : newsletters.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {newsletters.map((newsletter) => (
                    <NewsletterCard
                      key={newsletter.id}
                      newsletter={newsletter}
                      onClick={handleNewsletterClick}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}

              {/* Load More / Pagination would go here */}
              {newsletters.length > 0 && !isLoading && (
                <div className="text-center mt-12">
                  <button className="btn-outline-neon inline-flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Cargar más newsletters</span>
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Newsletter;
