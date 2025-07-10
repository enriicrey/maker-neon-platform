
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar, 
  Mail, 
  Settings,
  Play,
  Pause,
  Trash2
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  status: 'active' | 'paused';
  lastRun: string;
  nextRun: string;
  recipients: number;
  description: string;
}

const ReportsSection: React.FC = () => {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Reporte Diario Ejecutivo',
      type: 'daily',
      status: 'active',
      lastRun: '2024-01-15 08:00',
      nextRun: '2024-01-16 08:00',
      recipients: 3,
      description: 'Métricas clave diarias para el equipo ejecutivo'
    },
    {
      id: '2',
      name: 'Análisis Semanal de Growth',
      type: 'weekly',
      status: 'active',
      lastRun: '2024-01-14 09:00',
      nextRun: '2024-01-21 09:00',
      recipients: 5,
      description: 'Análisis profundo de métricas de crecimiento'
    },
    {
      id: '3',
      name: 'Reporte Mensual de Revenue',
      type: 'monthly',
      status: 'paused',
      lastRun: '2024-01-01 10:00',
      nextRun: '2024-02-01 10:00',
      recipients: 8,
      description: 'Análisis completo de ingresos y proyecciones'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-500/20 text-blue-400';
      case 'weekly': return 'bg-green-500/20 text-green-400';
      case 'monthly': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-400' 
      : 'bg-yellow-500/20 text-yellow-400';
  };

  return (
    <Card className="bg-dark-surface border-dark-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Reportes Automáticos
            </CardTitle>
            <CardDescription className="text-gray-400">
              Gestiona reportes programados y exportaciones de datos
            </CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/80">
            Crear Reporte
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-dark-border rounded-lg hover:border-primary/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-white">{report.name}</h4>
                  <Badge className={getTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mb-2">{report.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Último: {report.lastRun}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Próximo: {report.nextRun}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {report.recipients} destinatarios
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-dark-border text-white hover:bg-dark-bg"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-dark-border text-white hover:bg-dark-bg"
                >
                  {report.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-dark-border text-white hover:bg-dark-bg"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-dark-border">
          <h4 className="font-semibold text-white mb-4">Exportación de Datos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="border-dark-border text-white hover:bg-dark-bg justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Analytics (CSV)
            </Button>
            <Button
              variant="outline"
              className="border-dark-border text-white hover:bg-dark-bg justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Usuarios (Excel)
            </Button>
            <Button
              variant="outline"
              className="border-dark-border text-white hover:bg-dark-bg justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Ingresos (PDF)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsSection;
