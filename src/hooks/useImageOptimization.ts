import { useState, useCallback, useRef } from 'react';

interface UseImageOptimizationOptions {
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function useImageOptimization(options: UseImageOptimizationOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
    setHasError(false);
    options.onLoad?.();
  }, [options]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    setIsLoaded(false);
    options.onError?.();
  }, [options]);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  // Generate WebP source with JPEG fallback
  const generateResponsiveSources = useCallback((src: string, sizes?: string) => {
    if (!src) return { webpSrc: '', jpegSrc: src };
    
    // Basic WebP conversion (in a real app, you'd use a service like Cloudinary)
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    return {
      webpSrc,
      jpegSrc: src,
      sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    };
  }, []);

  return {
    isLoaded,
    hasError,
    isLoading,
    imgRef,
    handleLoad,
    handleError,
    handleLoadStart,
    generateResponsiveSources
  };
}