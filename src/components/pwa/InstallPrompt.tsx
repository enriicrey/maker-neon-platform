import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, X, Smartphone, Zap, Wifi, Bell } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface InstallPromptProps {
  onDismiss?: () => void;
}

export function InstallPrompt({ onDismiss }: InstallPromptProps) {
  const { isInstallable, handleInstall } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    const success = await handleInstall();
    setIsInstalling(false);
    
    if (success) {
      setIsDismissed(true);
      onDismiss?.();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-sm">
      <Card className="border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Instalar App</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  <Zap className="mr-1 h-3 w-3" />
                  PWA
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Instala Maker Neon Platform en tu dispositivo para una mejor experiencia
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="mb-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-500" />
              <span>Funciona offline</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <span>Notificaciones push</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Acceso rápido desde home</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleInstallClick}
              disabled={isInstalling}
              className="flex-1"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              {isInstalling ? 'Instalando...' : 'Instalar'}
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              size="sm"
            >
              Ahora no
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstallPrompt;