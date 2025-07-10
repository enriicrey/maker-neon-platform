
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Upload, 
  Trash2, 
  FileText, 
  Database, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Archive,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const DataSettings = () => {
  const { user } = useAuth();
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);

  const handleExportData = async (type: 'complete' | 'selective') => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          toast({
            title: "Exportación completada",
            description: "Te hemos enviado un enlace de descarga por email"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleImportData = async (file: File) => {
    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          toast({
            title: "Importación completada",
            description: "Tus datos se han importado correctamente"
          });
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  const handleScheduleExport = () => {
    toast({
      title: "Exportación programada",
      description: "Recibirás tus datos automáticamente cada mes"
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Función no disponible",
      description: "Contacta con soporte para eliminar tu cuenta",
      variant: "destructive"
    });
  };

  const exportTypes = [
    {
      id: 'complete',
      name: 'Exportación completa',
      description: 'Todos tus datos en un archivo ZIP',
      size: '~2.5 MB',
      includes: ['Perfil', 'Newsletters guardadas', 'Wishlist', 'Preferencias', 'Historial']
    },
    {
      id: 'profile',
      name: 'Solo perfil',
      description: 'Información personal y configuración',
      size: '~5 KB',
      includes: ['Datos personales', 'Configuración de cuenta', 'Preferencias']
    },
    {
      id: 'content',
      name: 'Solo contenido',
      description: 'Newsletters y wishlist guardadas',
      size: '~2 MB',
      includes: ['Newsletters guardadas', 'Wishlist', 'Colecciones', 'Tags']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Export Data */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exportar datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-blue-900/20 border-blue-800">
            <FileText className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              Puedes descargar todos tus datos en formato JSON para uso personal o migración a otros servicios.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportTypes.map((type) => (
              <div
                key={type.id}
                className="p-4 bg-dark-surface rounded-lg border border-dark-border"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-white">{type.name}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {type.size}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Incluye:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {type.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleExportData(type.id as 'complete' | 'selective')}
                    disabled={isExporting}
                    className="w-full"
                    variant="outline"
                  >
                    {isExporting ? 'Exportando...' : 'Exportar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso de exportación</span>
                <span className="text-white">{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
            <div>
              <h3 className="font-medium text-white">Exportación automática</h3>
              <p className="text-sm text-gray-400">Recibe tus datos por email mensualmente</p>
            </div>
            <Button
              onClick={handleScheduleExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Programar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Import Data */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Importar datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-green-900/20 border-green-800">
            <Archive className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">
              Importa datos desde otros servicios como Pocket, Instapaper, o archivos de respaldo anteriores.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-dark-surface rounded-lg border border-dark-border">
                <h3 className="font-medium text-white mb-2">Desde archivo</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Sube un archivo JSON exportado anteriormente
                </p>
                <input
                  type="file"
                  accept=".json,.zip"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImportData(file);
                  }}
                  className="hidden"
                  id="file-import"
                />
                <label htmlFor="file-import">
                  <Button variant="outline" className="w-full cursor-pointer" asChild>
                    <span>Seleccionar archivo</span>
                  </Button>
                </label>
              </div>

              <div className="p-4 bg-dark-surface rounded-lg border border-dark-border">
                <h3 className="font-medium text-white mb-2">Desde URL</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Importa desde un enlace de exportación
                </p>
                <Button variant="outline" className="w-full">
                  Importar desde URL
                </Button>
              </div>
            </div>

            <div className="p-4 bg-dark-surface rounded-lg border border-dark-border">
              <h3 className="font-medium text-white mb-2">Servicios compatibles</h3>
              <div className="flex flex-wrap gap-2">
                {['Pocket', 'Instapaper', 'Pinboard', 'Raindrop', 'Notion', 'Obsidian'].map(service => (
                  <Badge key={service} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Próximamente: importación directa desde estos servicios
              </p>
            </div>

            {isImporting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progreso de importación</span>
                  <span className="text-white">{importProgress}%</span>
                </div>
                <Progress value={importProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5" />
            Gestión de datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="font-medium text-white">Validar integridad</h3>
                <p className="text-sm text-gray-400">Verificar que todos tus datos están correctos</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Validar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="font-medium text-white">Limpiar datos duplicados</h3>
                <p className="text-sm text-gray-400">Eliminar elementos duplicados en tu biblioteca</p>
              </div>
              <Button variant="outline">
                Limpiar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="font-medium text-white">Recalcular estadísticas</h3>
                <p className="text-sm text-gray-400">Actualizar contadores y métricas de tu perfil</p>
              </div>
              <Button variant="outline">
                Recalcular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="bg-dark-bg border-red-900/50">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Eliminación de cuenta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-red-900/20 border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              <strong>Advertencia:</strong> Esta acción eliminará permanentemente todos tus datos 
              y no se puede deshacer. Asegúrate de exportar tus datos primero si los necesitas.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">¿Qué sucederá?</h3>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• Se eliminará tu perfil y toda la información personal</li>
                <li>• Se borrarán todas tus newsletters guardadas y colecciones</li>
                <li>• Se eliminará tu wishlist completa</li>
                <li>• Se cancelarán todas las suscripciones activas</li>
                <li>• Tendrás 30 días para cambiar de opinión</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">¿Qué NO se eliminará?</h3>
              <ul className="text-sm text-gray-400 space-y-1 ml-4">
                <li>• Registros de transacciones (por requisitos legales)</li>
                <li>• Datos anonimizados para estadísticas del servicio</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDeleteAccount}
                variant="destructive"
                className="flex-1"
              >
                Eliminar cuenta permanentemente
              </Button>
              <Button variant="outline" className="flex-1">
                Desactivar temporalmente
              </Button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Al eliminar tu cuenta tendrás un período de gracia de 30 días para recuperarla
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSettings;
