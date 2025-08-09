import React from 'react';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export function OfflineIndicator() {
  const { isOffline } = usePWA();

  if (!isOffline) return null;

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <Badge variant="destructive" className="animate-pulse">
        <WifiOff className="mr-1 h-3 w-3" />
        Sin conexión
      </Badge>
    </div>
  );
}

export function ConnectionStatus() {
  const { isOffline } = usePWA();

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {isOffline ? (
        <>
          <WifiOff className="h-4 w-4 text-destructive" />
          <span>Offline</span>
        </>
      ) : (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span>Online</span>
        </>
      )}
    </div>
  );
}

export default OfflineIndicator;