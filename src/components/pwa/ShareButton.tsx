import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function ShareButton({ 
  title = 'Maker Neon Platform',
  text = 'Descubre productos exclusivos y newsletters curadas',
  url = window.location.href,
  className,
  variant = 'outline',
  size = 'default'
}: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url
    };

    // Check if native sharing is available
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        // User cancelled or error occurred, fall back to clipboard
        console.log('Share cancelled or failed:', error);
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "El enlace se ha copiado al portapapeles",
      });
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
    >
      {navigator.share ? (
        <>
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copiar enlace
        </>
      )}
    </Button>
  );
}

export function QuickShareButton({ url, title }: { url?: string; title?: string }) {
  const { toast } = useToast();

  const handleQuickShare = async () => {
    const shareUrl = url || window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || document.title,
          url: shareUrl
        });
        return;
      } catch (error) {
        console.log('Share cancelled');
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Enlace copiado",
        description: "El enlace se ha copiado al portapapeles",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleQuickShare}
      className="h-8 w-8 p-0"
    >
      {navigator.share ? (
        <Share2 className="h-4 w-4" />
      ) : (
        <Link className="h-4 w-4" />
      )}
    </Button>
  );
}

export default ShareButton;