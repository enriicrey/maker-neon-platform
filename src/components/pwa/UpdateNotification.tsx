import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, X, Sparkles } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface UpdateNotificationProps {
  onDismiss?: () => void;
}

export function UpdateNotification({ onDismiss }: UpdateNotificationProps) {
  const { isUpdateAvailable, updateApp } = usePWA();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isUpdateAvailable || isDismissed) return null;

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateApp();
    setIsUpdating(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:top-6 md:left-auto md:right-6 md:max-w-sm">
      <Card className="border-blue-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-base">Nueva Versión</CardTitle>
                <CardDescription>
                  Hay una actualización disponible
                </CardDescription>
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
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="mb-4 text-sm text-muted-foreground">
            <p>Nuevas funciones y mejoras de rendimiento están disponibles.</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex-1"
              size="sm"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Actualizando...' : 'Actualizar'}
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              size="sm"
            >
              Después
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateNotification;