
import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetDate: Date | string;
  variant?: 'default' | 'compact' | 'large' | 'overlay';
  className?: string;
  onComplete?: () => void;
  showLabels?: boolean;
  prefix?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  variant = 'default',
  className,
  onComplete,
  showLabels = true,
  prefix = ''
}) => {
  const { timeLeft, isExpired, isUrgent, isCritical } = useCountdown({
    targetDate,
    onComplete
  });

  if (isExpired) {
    return null;
  }

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'text-sm';
      case 'large':
        return 'text-2xl lg:text-3xl font-bold';
      case 'overlay':
        return 'bg-black/80 text-primary px-2 py-1 rounded text-sm';
      default:
        return 'text-lg font-medium';
    }
  };

  const getUrgencyStyles = () => {
    if (isUrgent) return 'text-red-400';
    if (isCritical) return 'text-yellow-400 animate-pulse';
    return 'text-primary';
  };

  const timeSegments = [
    { value: timeLeft.days, label: 'D', fullLabel: 'DÍAS' },
    { value: timeLeft.hours, label: 'H', fullLabel: 'HORAS' },
    { value: timeLeft.minutes, label: 'M', fullLabel: 'MIN' },
    { value: timeLeft.seconds, label: 'S', fullLabel: 'SEG' }
  ];

  if (variant === 'large') {
    return (
      <div className={cn('text-center', className)}>
        {prefix && <h3 className="text-2xl font-bold mb-4">{prefix}</h3>}
        <div className="flex justify-center gap-4 mb-6">
          {timeSegments.map((segment, index) => (
            <div key={index} className="text-center">
              <div className={cn(
                'bg-dark-surface border border-primary/30 rounded-lg px-4 py-3 mb-2',
                getUrgencyStyles()
              )}>
                <span className="text-2xl font-bold">
                  {formatTime(segment.value)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{segment.fullLabel}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const timeString = timeSegments
    .filter(segment => segment.value > 0 || variant === 'compact')
    .map(segment => `${formatTime(segment.value)}${segment.label}`)
    .join(' ');

  return (
    <div className={cn(
      getVariantStyles(),
      getUrgencyStyles(),
      className
    )}>
      {prefix && <span className="mr-2">{prefix}</span>}
      {timeString}
    </div>
  );
};
