
import { useState, useEffect } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number;
  start?: number;
}

export const useCountUp = ({ end, duration = 2000, start = 0 }: UseCountUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
};
