import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { StaleBadge } from './StaleBadge';
import type { StalenessStatus } from '@/types';

interface CardProps {
  children: ReactNode;
  className?: string;
  isStale?: boolean;
  stalenessStatus?: StalenessStatus;
  dataTimestamp?: string | null;
  as?: 'div' | 'section' | 'article';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export function Card({
  children,
  className,
  isStale = false,
  stalenessStatus,
  dataTimestamp,
  as: Element = 'div',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: CardProps) {
  const stale = isStale || stalenessStatus === 'stale';

  return (
    <Element
      className={cn(
        'relative rounded-xl bg-white dark:bg-slate-800 shadow-sm border',
        stale
          ? 'border-amber-400 dark:border-amber-500'
          : 'border-slate-200 dark:border-slate-700',
        'transition-colors duration-200',
        className
      )}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {stale && (
        <div className="absolute top-2 right-2 z-10">
          <StaleBadge status="stale" dataTimestamp={dataTimestamp} />
        </div>
      )}
      {children}
    </Element>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pt-5 pb-3', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pb-5', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2
      id={id}
      className={cn(
        'text-base font-semibold text-slate-900 dark:text-slate-100',
        className
      )}
    >
      {children}
    </h2>
  );
}
