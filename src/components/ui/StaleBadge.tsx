import { Clock } from 'lucide-react';
import { Badge } from './Badge';
import { formatLastUpdated } from '@/utils/staleness';
import type { StalenessStatus } from '@/types';

interface StaleBadgeProps {
  status: StalenessStatus;
  dataTimestamp?: string | null;
  className?: string;
}

export function StaleBadge({ status, dataTimestamp, className }: StaleBadgeProps) {
  if (status !== 'stale') return null;

  const timeStr = formatLastUpdated(dataTimestamp);

  return (
    <Badge
      variant="stale"
      className={className}
      aria-label={`Data is stale. Last updated ${timeStr}`}
      aria-live="polite"
    >
      <Clock className="h-3 w-3" aria-hidden="true" />
      <span>Stale · {timeStr}</span>
    </Badge>
  );
}
