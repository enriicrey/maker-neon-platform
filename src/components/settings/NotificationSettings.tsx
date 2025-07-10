import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bell, Mail, Smartphone, Clock, Volume, VolumeX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const NotificationSettings = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    email_notifications: {
      newsletter_delivery: true,
      new_content: true,
      weekly_digest: true,
      monthly_report: false,
      new_drops: true,
      wishlist_alerts: true,
      price_drops: true,
      stock_alerts: true,
      early_access: true,
      billing_notifications: true,
      security_alerts: true,
      account_updates: true,
      service_updates: false
    },
    push_notifications: {
      browser_notifications: false,
      drop_alerts: false,
      breaking_news: false,
      personal_messages: false
    },
    quiet_hours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    frequency_settings: {
      max_emails_per_week: '7',
      digest_mode: false
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('email_notifications, push_notifications, quiet_hours')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences(prev => ({
          ...prev,
          email_notifications: { 
            ...prev.email_notifications, 
            ...(data.email_notifications || {})
          },
          push_notifications: { 
            ...prev.push_notifications, 
            ...(data.push_notifications || {})
          },
          quiet_hours: { 
            ...prev.quiet_hours, 
            ...(data.quiet_hours || {})
          }
        }));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          email_notifications: preferences.email_notifications,
          push_notifications: preferences.push_notifications,
          quiet_hours: preferences.quiet_hours,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Preferencias guardadas",
        description: "Tus configuraciones de notificaciones se actualizaron"
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

  const updateEmailNotification = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      email_notifications: {
        ...prev.email_notifications,
        [key]: value
      }
    }));
  };

  const updatePushNotification = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      push_notifications: {
        ...prev.push_notifications,
        [key]: value
      }
    }));
  };

  const updateQuietHours = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      quiet_hours: {
        ...prev.quiet_hours,
        [key]: value
      }
    }));
  };

  if (loading) {
    return <div className="text-gray-400">Cargando preferencias...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Notificaciones por email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Newsletter y Contenido */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Newsletter y contenido</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Entrega de newsletter</Label>
                  <p className="text-sm text-gray-400">Recibir newsletters programadas</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.newsletter_delivery}
                  onCheckedChange={(checked) => updateEmailNotification('newsletter_delivery', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Nuevo contenido</Label>
                  <p className="text-sm text-gray-400">Notificar cuando hay contenido nuevo</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.new_content}
                  onCheckedChange={(checked) => updateEmailNotification('new_content', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Resumen semanal</Label>
                  <p className="text-sm text-gray-400">Digest personalizado cada semana</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.weekly_digest}
                  onCheckedChange={(checked) => updateEmailNotification('weekly_digest', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Reporte mensual</Label>
                  <p className="text-sm text-gray-400">Estadísticas mensuales de actividad</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.monthly_report}
                  onCheckedChange={(checked) => updateEmailNotification('monthly_report', checked)}
                />
              </div>
            </div>
          </div>

          {/* Drops y Productos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Drops y productos</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Nuevos drops</Label>
                  <p className="text-sm text-gray-400">Todos los nuevos productos</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.new_drops}
                  onCheckedChange={(checked) => updateEmailNotification('new_drops', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Alertas de wishlist</Label>
                  <p className="text-sm text-gray-400">Solo productos en tu wishlist</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.wishlist_alerts}
                  onCheckedChange={(checked) => updateEmailNotification('wishlist_alerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Cambios de precio</Label>
                  <p className="text-sm text-gray-400">Cuando baja el precio de productos seguidos</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.price_drops}
                  onCheckedChange={(checked) => updateEmailNotification('price_drops', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Alertas de stock</Label>
                  <p className="text-sm text-gray-400">Cuando vuelve la disponibilidad</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.stock_alerts}
                  onCheckedChange={(checked) => updateEmailNotification('stock_alerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Acceso anticipado</Label>
                  <p className="text-sm text-gray-400">Notificaciones VIP para suscriptores</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.early_access}
                  onCheckedChange={(checked) => updateEmailNotification('early_access', checked)}
                />
              </div>
            </div>
          </div>

          {/* Cuenta y Billing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Cuenta y facturación</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Notificaciones de facturación</Label>
                  <p className="text-sm text-gray-400">Facturas y pagos</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.billing_notifications}
                  onCheckedChange={(checked) => updateEmailNotification('billing_notifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Alertas de seguridad</Label>
                  <p className="text-sm text-gray-400">Login desde nuevos dispositivos</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.security_alerts}
                  onCheckedChange={(checked) => updateEmailNotification('security_alerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Actualizaciones de cuenta</Label>
                  <p className="text-sm text-gray-400">Cambios importantes en tu cuenta</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.account_updates}
                  onCheckedChange={(checked) => updateEmailNotification('account_updates', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Actualizaciones del servicio</Label>
                  <p className="text-sm text-gray-400">Nuevas features y cambios</p>
                </div>
                <Switch
                  checked={preferences.email_notifications.service_updates}
                  onCheckedChange={(checked) => updateEmailNotification('service_updates', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Notificaciones push
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Notificaciones del navegador</Label>
              <p className="text-sm text-gray-400">Permitir notificaciones en el navegador</p>
            </div>
            <Switch
              checked={preferences.push_notifications.browser_notifications}
              onCheckedChange={(checked) => updatePushNotification('browser_notifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Alertas de drops</Label>
              <p className="text-sm text-gray-400">Notificaciones inmediatas de nuevos productos</p>
            </div>
            <Switch
              checked={preferences.push_notifications.drop_alerts}
              onCheckedChange={(checked) => updatePushNotification('drop_alerts', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Noticias importantes</Label>
              <p className="text-sm text-gray-400">Contenido urgente o destacado</p>
            </div>
            <Switch
              checked={preferences.push_notifications.breaking_news}
              onCheckedChange={(checked) => updatePushNotification('breaking_news', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-300">Mensajes personales</Label>
              <p className="text-sm text-gray-400">Mensajes directos y menciones</p>
            </div>
            <Switch
              checked={preferences.push_notifications.personal_messages}
              onCheckedChange={(checked) => updatePushNotification('personal_messages', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configuración Avanzada */}
      <Card className="bg-dark-bg border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Configuración avanzada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quiet Hours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300 flex items-center gap-2">
                  {preferences.quiet_hours.enabled ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume className="w-4 h-4" />
                  )}
                  Horas de silencio
                </Label>
                <p className="text-sm text-gray-400">No molestar durante estas horas</p>
              </div>
              <Switch
                checked={preferences.quiet_hours.enabled}
                onCheckedChange={(checked) => updateQuietHours('enabled', checked)}
              />
            </div>
            {preferences.quiet_hours.enabled && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <Label className="text-gray-300 text-sm">Desde</Label>
                  <Select
                    value={preferences.quiet_hours.start}
                    onValueChange={(value) => updateQuietHours('start', value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-dark-border text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-dark-border">
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={`${hour}:00`} value={`${hour}:00`} className="text-white">
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm">Hasta</Label>
                  <Select
                    value={preferences.quiet_hours.end}
                    onValueChange={(value) => updateQuietHours('end', value)}
                  >
                    <SelectTrigger className="bg-dark-surface border-dark-border text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-dark-border">
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={`${hour}:00`} value={`${hour}:00`} className="text-white">
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Frequency Settings */}
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Límite de emails por semana</Label>
              <Select
                value={preferences.frequency_settings.max_emails_per_week}
                onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  frequency_settings: { ...prev.frequency_settings, max_emails_per_week: value }
                }))}
              >
                <SelectTrigger className="bg-dark-surface border-dark-border text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-surface border-dark-border">
                  <SelectItem value="3" className="text-white">3 emails máximo</SelectItem>
                  <SelectItem value="5" className="text-white">5 emails máximo</SelectItem>
                  <SelectItem value="7" className="text-white">7 emails máximo</SelectItem>
                  <SelectItem value="unlimited" className="text-white">Sin límite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Modo digest</Label>
                <p className="text-sm text-gray-400">Agrupar notificaciones en lugar de individuales</p>
              </div>
              <Switch
                checked={preferences.frequency_settings.digest_mode}
                onCheckedChange={(checked) => setPreferences(prev => ({
                  ...prev,
                  frequency_settings: { ...prev.frequency_settings, digest_mode: checked }
                }))}
              />
            </div>
          </div>

          {/* Unsubscribe All */}
          <div className="pt-4 border-t border-dark-border">
            <Button variant="destructive" className="w-full">
              Desuscribirse de todo
            </Button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Solo mantendrás notificaciones críticas de seguridad y facturación
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={savePreferences}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {saving ? 'Guardando...' : 'Guardar preferencias'}
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
