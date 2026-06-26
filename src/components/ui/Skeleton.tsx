import { cn } from '@/utils/cn';

type SkeletonVariant = 'text' | 'card' | 'chart' | 'circle';

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  lines?: number;
}

const baseClass =
  'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-shimmer rounded';

const variantDefaults: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  card: 'h-32 w-full rounded-xl',
  chart: 'h-48 w-full rounded-xl',
  circle: 'h-10 w-10 rounded-full',
};

export function Skeleton({ variant = 'text', className, lines = 1 }: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div aria-hidden="true" className="space-y-2" role="presentation">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClass, variantDefaults.text, i === lines - 1 ? 'w-3/4' : 'w-full')}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(baseClass, variantDefaults[variant], className)}
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      aria-label="Loading content"
      aria-busy="true"
      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm space-y-3"
    >
      <Skeleton variant="text" className="w-1/3 h-4" />
      <Skeleton variant="text" className="w-1/2 h-7" />
      <Skeleton variant="text" className="w-1/4 h-3" />
    </div>
  );
}
