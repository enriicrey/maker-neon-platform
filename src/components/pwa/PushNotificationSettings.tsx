import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Package, Mail, User } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettings {
  drops: boolean;
  newsletters: boolean;
  account: boolean;
  marketing: boolean;
}

export function PushNotificationSettings() {
  const { requestNotificationPermission, subscribeToPush } = usePWA();
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    drops: true,
    newsletters: true,
    account: true,
    marketing: false
  });

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }

    // Check if already subscribed to push notifications
    checkSubscription();
    
    // Load saved settings
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const checkSubscription = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    }
  };

  const handleEnableNotifications = async () => {
    try {
      const granted = await requestNotificationPermission();
      setHasPermission(granted);
      
      if (granted) {
        await subscribeToPush();
        setIsSubscribed(true);
        
        toast({
          title: "Notificaciones activadas",
          description: "Recibirás notificaciones sobre nuevos drops y contenido",
        });
      } else {
        toast({
          title: "Permisos denegados",
          description: "No podrás recibir notificaciones push",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast({
        title: "Error",
        description: "No se pudieron activar las notificaciones",
        variant: "destructive"
      });
    }
  };

  const handleSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    
    // Send settings to server
    fetch('/api/notifications/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    }).catch(console.error);
  };

  if (!('Notification' in window)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            Notificaciones no disponibles
          </CardTitle>
          <CardDescription>
            Tu navegador no soporta notificaciones push
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notificaciones Push
        </CardTitle>
        <CardDescription>
          Configura qué notificaciones quieres recibir
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!hasPermission && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Activar notificaciones</h4>
                <p className="text-sm text-muted-foreground">
                  Permite notificaciones para recibir updates importantes
                </p>
              </div>
              <Button onClick={handleEnableNotifications}>
                <Bell className="mr-2 h-4 w-4" />
                Activar
              </Button>
            </div>
          </div>
        )}

        {hasPermission && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <div>
                  <Label htmlFor="drops">Nuevos Drops</Label>
                  <p className="text-sm text-muted-foreground">
                    Productos exclusivos y ofertas limitadas
                  </p>
                </div>
              </div>
              <Switch
                id="drops"
                checked={settings.drops}
                onCheckedChange={(checked) => handleSettingChange('drops', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <div>
                  <Label htmlFor="newsletters">Newsletters</Label>
                  <p className="text-sm text-muted-foreground">
                    Nuevo contenido y newsletters curadas
                  </p>
                </div>
              </div>
              <Switch
                id="newsletters"
                checked={settings.newsletters}
                onCheckedChange={(checked) => handleSettingChange('newsletters', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div>
                  <Label htmlFor="account">Cuenta</Label>
                  <p className="text-sm text-muted-foreground">
                    Actualizaciones de pedidos y seguridad
                  </p>
                </div>
              </div>
              <Switch
                id="account"
                checked={settings.account}
                onCheckedChange={(checked) => handleSettingChange('account', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <div>
                  <Label htmlFor="marketing">Marketing</Label>
                  <p className="text-sm text-muted-foreground">
                    Promociones y contenido recomendado
                  </p>
                </div>
              </div>
              <Switch
                id="marketing"
                checked={settings.marketing}
                onCheckedChange={(checked) => handleSettingChange('marketing', checked)}
              />
            </div>
          </div>
        )}

        {hasPermission && isSubscribed && (
          <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
            ✓ Notificaciones activadas y configuradas
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PushNotificationSettings;