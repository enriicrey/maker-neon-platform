
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, Database, Download, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const PrivacySettings = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    profile_visibility: 'public',
    activity_visibility: true,
    wishlist_sharing: true,
    reading_activity_visible: true,
    analytics_opt_out: false,
    personalization_enabled: true,
    marketing_communications: true
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadPrivacySettings();
    }
  }, [user]);

  const loadPrivacySettings = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('profile_visibility, activity_visibility, wishlist_sharing, reading_activity_visible, analytics_opt_out, personalization_enabled, marketing_communications')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error loading privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePrivacySettings = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Configuración guardada",
        description: "Tus preferencias de privacidad se actualizaron"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron guardar las preferencias",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = async () => {
    try {
      // Simulate data export
      toast({
        title: "Exportación iniciada",
        description: "Te enviaremos un email cuando esté listo"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar la exportación",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAccount = async () => {
    // This would open a confirmation dialog
    toast({
      title: "Función no disponible",
      description: "Contacta con soporte para eliminar tu cuenta",
      variant: "destructive"
    });
  };

  if (loading) {
    return <div className="text-gray-400">Cargando configuración de privacidad...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Profile Visibility */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visibilidad del perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-300">Visibilidad del perfil</Label>
            <Select
              value={preferences.profile_visibility}
              onValueChange={(value) => updatePreference('profile_visibility', value)}
            >
              <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-dark-border">
                <SelectItem value="public" className="text-white">
                  Público - Visible para todos
                </SelectItem>
                <SelectItem value="subscribers" className="text-white">
                  Solo suscriptores - Solo usuarios registrados
                </SelectItem>
                <SelectItem value="private" className="text-white">
                  Privado - Solo tú puedes verlo
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-400 mt-2">
              Controla quién puede ver tu perfil público
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Mostrar actividad reciente</Label>
              <p className="text-sm text-gray-400">Newsletters leídas y productos guardados</p>
            </div>
            <Switch
              checked={preferences.activity_visibility}
              onCheckedChange={(checked) => updatePreference('activity_visibility', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Compartir wishlist</Label>
              <p className="text-sm text-gray-400">Permitir que otros vean tu wishlist</p>
            </div>
            <Switch
              checked={preferences.wishlist_sharing}
              onCheckedChange={(checked) => updatePreference('wishlist_sharing', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Actividad de lectura</Label>
              <p className="text-sm text-gray-400">Mostrar qué newsletters has leído</p>
            </div>
            <Switch
              checked={preferences.reading_activity_visible}
              onCheckedChange={(checked) => updatePreference('reading_activity_visible', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Tracking */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5" />
            Datos y seguimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Opt-out de analytics</Label>
              <p className="text-sm text-gray-400">No trackear mi comportamiento para estadísticas</p>
            </div>
            <Switch
              checked={preferences.analytics_opt_out}
              onCheckedChange={(checked) => updatePreference('analytics_opt_out', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Personalización habilitada</Label>
              <p className="text-sm text-gray-400">Usar mis datos para recomendaciones personalizadas</p>
            </div>
            <Switch
              checked={preferences.personalization_enabled}
              onCheckedChange={(checked) => updatePreference('personalization_enabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Comunicaciones de marketing</Label>
              <p className="text-sm text-gray-400">Recibir emails promocionales y ofertas</p>
            </div>
            <Switch
              checked={preferences.marketing_communications}
              onCheckedChange={(checked) => updatePreference('marketing_communications', checked)}
            />
          </div>

          <Alert className="bg-blue-900/20 border-blue-800">
            <Shield className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              Nunca compartimos tus datos personales con terceros sin tu consentimiento explícito.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Data Control */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5" />
            Control de datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white">Uso de datos</h3>
              <p className="text-sm text-gray-400">
                Recopilamos datos para mejorar tu experiencia: preferencias de contenido, 
                actividad de lectura, y productos guardados.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">Retención de datos</h3>
              <p className="text-sm text-gray-400">
                Guardamos tus datos mientras tu cuenta esté activa. Puedes solicitar 
                su eliminación en cualquier momento.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white">Portabilidad de datos</h3>
              <p className="text-sm text-gray-400">
                Puedes descargar todos tus datos en formato JSON para uso personal 
                o migración a otros servicios.
              </p>
              <Button
                onClick={handleExportData}
                variant="outline"
                className="mt-2 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar mis datos
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
        <CardContent className="space-y-4">
          <Alert className="bg-red-900/20 border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              <strong>Advertencia:</strong> Esta acción no se puede deshacer. 
              Se eliminarán permanentemente todos tus datos, newsletters guardadas, 
              wishlists y configuraciones.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">¿Qué se eliminará?</h3>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Tu perfil y información personal</li>
              <li>• Todas las newsletters guardadas</li>
              <li>• Tu wishlist completa</li>
              <li>• Preferencias y configuraciones</li>
              <li>• Historial de actividad</li>
              <li>• Datos de facturación (si aplica)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">¿Qué se conservará?</h3>
            <ul className="text-sm text-gray-400 space-y-1 ml-4">
              <li>• Registros de transacciones por requisitos legales</li>
              <li>• Datos anonimizados para estadísticas generales</li>
            </ul>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="w-full"
            >
              Eliminar mi cuenta permanentemente
            </Button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Tendrás un período de gracia de 30 días para cambiar de opinión
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={savePrivacySettings}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {saving ? 'Guardando...' : 'Guardar configuración'}
        </Button>
      </div>
    </div>
  );
};

export default PrivacySettings;
