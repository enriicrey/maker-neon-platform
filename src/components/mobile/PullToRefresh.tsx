import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  disabled?: boolean;
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80,
  disabled = false 
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [canPull, setCanPull] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    let isScrolledToTop = true;

    const checkScrollPosition = () => {
      isScrolledToTop = container.scrollTop === 0;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isScrolledToTop || isRefreshing) return;
      
      startY.current = e.touches[0].clientY;
      setCanPull(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canPull || !isScrolledToTop || isRefreshing) return;
      
      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;
      
      if (diff > 0) {
        e.preventDefault();
        const distance = Math.min(diff * 0.5, threshold * 1.5);
        setPullDistance(distance);
      }
    };

    const handleTouchEnd = async () => {
      if (!canPull || !isScrolledToTop) {
        setPullDistance(0);
        setCanPull(false);
        return;
      }

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh failed:', error);
        } finally {
          setIsRefreshing(false);
        }
      }
      
      setPullDistance(0);
      setCanPull(false);
    };

    container.addEventListener('scroll', checkScrollPosition);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, disabled, canPull, pullDistance, isRefreshing]);

  const refreshOpacity = Math.min(pullDistance / threshold, 1);
  const refreshRotation = (pullDistance / threshold) * 180;

  return (
    <div ref={containerRef} className="relative h-full overflow-auto">
      {/* Pull to refresh indicator */}
      <div
        className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center justify-center transition-all duration-200"
        style={{
          transform: `translateX(-50%) translateY(${Math.max(0, pullDistance - 40)}px)`,
          opacity: refreshOpacity
        }}
      >
        <div className="rounded-full bg-background/90 p-2 shadow-lg backdrop-blur">
          <RefreshCw
            className={`h-5 w-5 text-primary transition-transform duration-200 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: isRefreshing ? 'rotate(0deg)' : `rotate(${refreshRotation}deg)`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${pullDistance}px)`
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PullToRefresh;