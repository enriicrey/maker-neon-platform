import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface IntersectionObserverWrapperProps {
  children: ReactNode;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallback?: ReactNode;
}

const IntersectionObserverWrapper: React.FC<IntersectionObserverWrapperProps> = ({
  children,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  fallback = null
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowIntersecting = entry.isIntersecting;
        setIsIntersecting(isNowIntersecting);

        if (isNowIntersecting && (!triggerOnce || !hasIntersected)) {
          onIntersect();
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [onIntersect, threshold, rootMargin, triggerOnce, hasIntersected]);

  return (
    <div ref={elementRef}>
      {isIntersecting || hasIntersected ? children : fallback}
    </div>
  );
};

export default IntersectionObserverWrapper;