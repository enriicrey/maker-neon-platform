
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AnalyticsCharts: React.FC = () => {
  // Mock data for charts
  const revenueData = [
    { name: 'Ene', revenue: 4000, orders: 24 },
    { name: 'Feb', revenue: 3000, orders: 18 },
    { name: 'Mar', revenue: 2000, orders: 12 },
    { name: 'Abr', revenue: 2780, orders: 16 },
    { name: 'May', revenue: 1890, orders: 11 },
    { name: 'Jun', revenue: 2390, orders: 14 },
    { name: 'Jul', revenue: 3490, orders: 20 },
  ];

  const userGrowthData = [
    { name: 'Sem 1', newUsers: 120, activeUsers: 800 },
    { name: 'Sem 2', newUsers: 150, activeUsers: 850 },
    { name: 'Sem 3', newUsers: 180, activeUsers: 920 },
    { name: 'Sem 4', newUsers: 200, activeUsers: 1000 },
  ];

  const contentPerformanceData = [
    { name: 'Tutoriales', value: 35, color: '#3B82F6' },
    { name: 'Drops', value: 25, color: '#10B981' },
    { name: 'Comunidad', value: 20, color: '#F59E0B' },
    { name: 'Técnico', value: 20, color: '#8B5CF6' },
  ];

  const cohortData = [
    { cohort: 'Ene 2024', month1: 100, month2: 85, month3: 72, month4: 65 },
    { cohort: 'Feb 2024', month1: 100, month2: 88, month3: 75, month4: 68 },
    { cohort: 'Mar 2024', month1: 100, month2: 90, month3: 78, month4: 72 },
    { cohort: 'Abr 2024', month1: 100, month2: 87, month3: 74, month4: 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Revenue Trend */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Tendencia de Ingresos</CardTitle>
          <CardDescription className="text-gray-400">
            Ingresos y pedidos por mes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Ingresos (€)"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Pedidos"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Growth */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Crecimiento de Usuarios</CardTitle>
          <CardDescription className="text-gray-400">
            Nuevos usuarios vs usuarios activos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="newUsers" fill="#8B5CF6" name="Nuevos Usuarios" />
              <Bar dataKey="activeUsers" fill="#F59E0B" name="Usuarios Activos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Content Performance */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Performance de Contenido</CardTitle>
          <CardDescription className="text-gray-400">
            Distribución por categoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentPerformanceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {contentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cohort Analysis */}
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">Análisis de Cohortes</CardTitle>
          <CardDescription className="text-gray-400">
            Retención por cohorte de registro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="cohort" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="month1" stroke="#3B82F6" name="Mes 1" />
              <Line type="monotone" dataKey="month2" stroke="#10B981" name="Mes 2" />
              <Line type="monotone" dataKey="month3" stroke="#F59E0B" name="Mes 3" />
              <Line type="monotone" dataKey="month4" stroke="#8B5CF6" name="Mes 4" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
