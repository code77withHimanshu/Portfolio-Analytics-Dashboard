import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'default' | 'fresh' | 'stale' | 'error' | 'warning' | 'gain' | 'loss';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  role?: string;
  'aria-label'?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  fresh: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  stale: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  gain: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  loss: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
  role,
  'aria-label': ariaLabel,
}: BadgeProps) {
  return (
    <span
      role={role ?? 'status'}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
