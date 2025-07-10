
import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsFilters from './AnalyticsFilters';
import MetricsGrid from './MetricsGrid';
import AnalyticsCharts from './AnalyticsCharts';
import ReportsSection from './ReportsSection';

const AdminAnalytics: React.FC = () => {
  const {
    loading,
    error,
    filters,
    setFilters,
    newsletterMetrics,
    revenueMetrics,
    userMetrics,
    refetch
  } = useAnalytics();

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting analytics data...');
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-2">Error al cargar Analytics</h3>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-gray-400">Métricas de negocio y análisis de rendimiento</p>
      </div>

      <AnalyticsFilters
        filters={filters}
        onFiltersChange={setFilters}
        onRefresh={refetch}
        onExport={handleExport}
        loading={loading}
      />

      <MetricsGrid
        newsletterMetrics={newsletterMetrics}
        revenueMetrics={revenueMetrics}
        userMetrics={userMetrics}
        loading={loading}
      />

      <AnalyticsCharts />

      <ReportsSection />
    </div>
  );
};

export default AdminAnalytics;
