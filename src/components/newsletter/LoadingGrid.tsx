
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingGridProps {
  count?: number;
  className?: string;
}

const LoadingGrid = ({ count = 12, className = '' }: LoadingGridProps) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-4">
          {/* Image skeleton */}
          <Skeleton className="aspect-video w-full rounded-lg bg-dark-bg" />
          
          {/* Category and featured badges */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 rounded bg-dark-bg" />
            <Skeleton className="h-6 w-20 rounded bg-dark-bg" />
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded bg-dark-bg" />
            <Skeleton className="h-6 w-3/4 rounded bg-dark-bg" />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded bg-dark-bg" />
            <Skeleton className="h-4 w-full rounded bg-dark-bg" />
            <Skeleton className="h-4 w-2/3 rounded bg-dark-bg" />
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-dark-border">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-16 rounded bg-dark-bg" />
              <Skeleton className="h-4 w-12 rounded bg-dark-bg" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-8 rounded bg-dark-bg" />
              <Skeleton className="h-4 w-8 rounded bg-dark-bg" />
            </div>
          </div>
          
          {/* Date */}
          <Skeleton className="h-4 w-20 rounded bg-dark-bg" />
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;
