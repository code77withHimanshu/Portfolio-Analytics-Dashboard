import type { RiskMetrics } from '@/types';
import { Card, CardHeader, CardBody, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { formatNumber, formatCurrency, formatPercent } from '@/utils/formatters';
import { HelpCircle } from 'lucide-react';

interface RiskMetricGridProps {
  metrics: RiskMetrics | null;
  isLoading?: boolean;
}

const METRIC_DEFS = [
  { key: 'sharpeRatio', label: 'Sharpe Ratio', tip: 'Risk-adjusted return. Higher is better (>1 is good).' },
  { key: 'sortinoRatio', label: 'Sortino Ratio', tip: 'Like Sharpe but penalizes downside volatility only.' },
  { key: 'beta', label: 'Beta', tip: 'Sensitivity to market moves. 1.0 = moves with market.' },
  { key: 'alpha', label: 'Alpha (%)', tip: 'Excess return vs benchmark after adjusting for beta.' },
  { key: 'maxDrawdownPct', label: 'Max Drawdown', tip: 'Largest peak-to-trough decline as a percentage.' },
  { key: 'volatilityAnnualized', label: 'Ann. Volatility', tip: 'Annualized standard deviation of daily returns.' },
  { key: 'valueAtRisk95', label: '1-Day VaR (95%)', tip: '95% confidence worst-case 1-day loss in dollars.' },
  { key: 'correlationToBenchmark', label: 'Benchmark Corr.', tip: 'Correlation coefficient vs S&P 500 index.' },
] as const;

type MetricKey = (typeof METRIC_DEFS)[number]['key'];

function formatMetricValue(key: MetricKey, metrics: RiskMetrics): string {
  const val = metrics[key];
  switch (key) {
    case 'sharpeRatio':
    case 'sortinoRatio':
    case 'beta':
    case 'correlationToBenchmark':
      return formatNumber(val, 2);
    case 'alpha':
    case 'maxDrawdownPct':
    case 'volatilityAnnualized':
      return formatPercent(val);
    case 'valueAtRisk95':
      return formatCurrency(val);
    default:
      return String(val);
  }
}

export function RiskMetricGrid({ metrics, isLoading = false }: RiskMetricGridProps) {
  const thresholds = useStalenessThresholds();
  const staleness = useStaleness(metrics?.dataTimestamp, thresholds.riskMetrics);

  if (isLoading || !metrics) {
    return (
      <Card aria-label="Risk metrics loading" aria-busy="true">
        <CardHeader>
          <Skeleton variant="text" className="w-1/4 h-5" />
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="h-12" />
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      as="section"
      isStale={staleness === 'stale'}
      dataTimestamp={metrics.dataTimestamp}
      aria-labelledby="risk-metrics-heading"
    >
      <CardHeader>
        <CardTitle id="risk-metrics-heading">Risk Metrics</CardTitle>
      </CardHeader>
      <CardBody>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
          {METRIC_DEFS.map(({ key, label, tip }) => (
            <div key={key} className="min-w-0">
              <dt className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider truncate">
                {label}
                <Tooltip content={tip}>
                  <HelpCircle
                    className="h-3 w-3 text-slate-400 flex-shrink-0"
                    aria-label={`Info: ${tip}`}
                  />
                </Tooltip>
              </dt>
              <dd className="mt-0.5 text-lg font-semibold text-slate-900 dark:text-white tabular-nums">
                {formatMetricValue(key, metrics)}
              </dd>
            </div>
          ))}
        </dl>
      </CardBody>
    </Card>
  );
}
