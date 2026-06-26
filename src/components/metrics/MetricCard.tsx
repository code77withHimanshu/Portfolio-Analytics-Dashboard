import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { cn } from '@/utils/cn';

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  dataTimestamp?: string | null;
  isLoading?: boolean;
  id?: string;
}

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  dataTimestamp,
  isLoading = false,
  id,
}: MetricCardProps) {
  const thresholds = useStalenessThresholds();
  const staleness = useStaleness(dataTimestamp, thresholds.positions);
  const isStale = staleness === 'stale';

  if (isLoading) {
    return <Skeleton variant="card" className="h-28" />;
  }

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card
      as="article"
      isStale={isStale}
      dataTimestamp={dataTimestamp}
      aria-labelledby={id ? `${id}-label` : undefined}
    >
      <CardBody className="py-4">
        <p
          id={id ? `${id}-label` : undefined}
          className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
        >
          {label}
        </p>
        <p
          className="mt-1 text-2xl font-bold text-slate-900 dark:text-white tabular-nums"
          aria-label={`${label}: ${value}`}
        >
          {value}
        </p>
        {change !== undefined && (
          <div
            className={cn(
              'mt-1.5 flex items-center gap-1 text-sm font-medium',
              isPositive && 'text-gain',
              isNegative && 'text-loss',
              !isPositive && !isNegative && 'text-slate-500 dark:text-slate-400'
            )}
            aria-label={`Change: ${changeLabel ?? change}`}
          >
            {isPositive && <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />}
            {isNegative && <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />}
            {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5" aria-hidden="true" />}
            <span>{changeLabel ?? (change >= 0 ? `+${change}%` : `${change}%`)}</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
