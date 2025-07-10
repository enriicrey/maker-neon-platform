
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, RefreshCw } from 'lucide-react';
import { AnalyticsFilters as FiltersType } from '@/hooks/useAnalytics';

interface AnalyticsFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onRefresh: () => void;
  onExport: () => void;
  loading: boolean;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  filters,
  onFiltersChange,
  onRefresh,
  onExport,
  loading
}) => {
  const handleDateRangeChange = (range: string) => {
    const now = new Date();
    let start: Date;

    switch (range) {
      case '7d':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    onFiltersChange({
      ...filters,
      dateRange: {
        start: start.toISOString().split('T')[0],
        end: now.toISOString().split('T')[0]
      }
    });
  };

  return (
    <Card className="bg-dark-surface border-dark-border mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Filtros de Analytics
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              className="border-dark-border text-white hover:bg-dark-bg"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="border-dark-border text-white hover:bg-dark-bg"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Período de Tiempo
            </label>
            <Select onValueChange={handleDateRangeChange} defaultValue="30d">
              <SelectTrigger className="bg-dark-bg border-dark-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-border">
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Comparación
            </label>
            <Select
              value={filters.comparison}
              onValueChange={(value) => onFiltersChange({
                ...filters,
                comparison: value as 'previous' | 'year_ago' | 'none'
              })}
            >
              <SelectTrigger className="bg-dark-bg border-dark-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-border">
                <SelectItem value="previous">vs Período Anterior</SelectItem>
                <SelectItem value="year_ago">vs Mismo Período Año Pasado</SelectItem>
                <SelectItem value="none">Sin Comparación</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Segmento
            </label>
            <Select
              value={filters.segment}
              onValueChange={(value) => onFiltersChange({
                ...filters,
                segment: value as 'all' | 'free' | 'premium' | 'vip'
              })}
            >
              <SelectTrigger className="bg-dark-bg border-dark-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-border">
                <SelectItem value="all">Todos los Usuarios</SelectItem>
                <SelectItem value="free">Usuarios Gratuitos</SelectItem>
                <SelectItem value="premium">Usuarios Premium</SelectItem>
                <SelectItem value="vip">Usuarios VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Geografía
            </label>
            <Select
              value={filters.geography}
              onValueChange={(value) => onFiltersChange({
                ...filters,
                geography: value
              })}
            >
              <SelectTrigger className="bg-dark-bg border-dark-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-border">
                <SelectItem value="all">Todas las Ubicaciones</SelectItem>
                <SelectItem value="ES">España</SelectItem>
                <SelectItem value="MX">México</SelectItem>
                <SelectItem value="AR">Argentina</SelectItem>
                <SelectItem value="CO">Colombia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Dispositivo
            </label>
            <Select
              value={filters.device}
              onValueChange={(value) => onFiltersChange({
                ...filters,
                device: value as 'all' | 'desktop' | 'mobile' | 'tablet'
              })}
            >
              <SelectTrigger className="bg-dark-bg border-dark-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-border">
                <SelectItem value="all">Todos los Dispositivos</SelectItem>
                <SelectItem value="desktop">Escritorio</SelectItem>
                <SelectItem value="mobile">Móvil</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsFilters;
