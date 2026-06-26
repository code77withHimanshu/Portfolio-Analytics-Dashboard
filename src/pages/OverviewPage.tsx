import { usePortfolio } from '@/context/PortfolioContext';
import { MetricRow } from '@/components/metrics/MetricRow';
import { RiskMetricGrid } from '@/components/metrics/RiskMetricGrid';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { AllocationPieChart } from '@/components/charts/AllocationPieChart';

export function OverviewPage() {
  const { summary, performance, allocationBySector, riskMetrics, isLoading } = usePortfolio();

  return (
    <div className="space-y-6" aria-label="Portfolio overview">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Live portfolio snapshot across all holdings
        </p>
      </header>

      <MetricRow summary={summary} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={performance} isLoading={isLoading} />
        <AllocationPieChart data={allocationBySector} isLoading={isLoading} />
      </div>

      <RiskMetricGrid metrics={riskMetrics} isLoading={isLoading} />
    </div>
  );
}
