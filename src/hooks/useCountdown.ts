
import { useState, useEffect, useCallback } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export interface UseCountdownProps {
  targetDate: Date | string;
  onComplete?: () => void;
  interval?: number;
}

export const useCountdown = ({ targetDate, onComplete, interval = 1000 }: UseCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });

  const calculateTimeLeft = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        total: difference
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0
    };
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0 && onComplete) {
        onComplete();
      }
    }, interval);

    // Set initial value
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [calculateTimeLeft, onComplete, interval]);

  const isExpired = timeLeft.total <= 0;
  const isUrgent = timeLeft.total <= 6 * 60 * 60 * 1000; // 6 hours
  const isCritical = timeLeft.total <= 24 * 60 * 60 * 1000; // 24 hours

  return {
    timeLeft,
    isExpired,
    isUrgent,
    isCritical
  };
};
