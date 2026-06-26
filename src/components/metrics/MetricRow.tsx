import type { PortfolioSummary } from '@/types';
import { MetricCard } from './MetricCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatSignedCurrency, formatSignedPercent } from '@/utils/formatters';

interface MetricRowProps {
  summary: PortfolioSummary | null;
  isLoading?: boolean;
}

export function MetricRow({ summary, isLoading = false }: MetricRowProps) {
  if (isLoading || !summary) {
    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        aria-label="Portfolio metrics loading"
        aria-busy="true"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-28" />
        ))}
      </div>
    );
  }

  const metrics = [
    {
      id: 'total-value',
      label: 'Total Portfolio Value',
      value: formatCurrency(summary.totalValue),
      change: summary.dayChangePct,
      changeLabel: `${formatSignedCurrency(summary.dayChange)} today`,
      dataTimestamp: summary.dataTimestamp,
    },
    {
      id: 'day-change',
      label: "Today's Gain / Loss",
      value: formatSignedCurrency(summary.dayChange),
      change: summary.dayChangePct,
      changeLabel: formatSignedPercent(summary.dayChangePct),
      dataTimestamp: summary.dataTimestamp,
    },
    {
      id: 'total-gain',
      label: 'Total Unrealized P&L',
      value: formatSignedCurrency(summary.totalUnrealizedPnL),
      change: summary.totalUnrealizedPnLPct,
      changeLabel: formatSignedPercent(summary.totalUnrealizedPnLPct),
      dataTimestamp: summary.dataTimestamp,
    },
    {
      id: 'positions',
      label: 'Open Positions',
      value: summary.positions.length.toString(),
      dataTimestamp: summary.dataTimestamp,
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      role="region"
      aria-label="Key portfolio metrics"
    >
      {metrics.map((m) => (
        <MetricCard key={m.id} id={m.id} {...m} />
      ))}
    </div>
  );
}
