import { usePortfolio } from '@/context/PortfolioContext';
import { RiskMetricGrid } from '@/components/metrics/RiskMetricGrid';

export function RiskPage() {
  const { riskMetrics, isLoading } = usePortfolio();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Risk Analysis</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Portfolio risk metrics and factor exposures
        </p>
      </header>
      <RiskMetricGrid metrics={riskMetrics} isLoading={isLoading} />
    </div>
  );
}
