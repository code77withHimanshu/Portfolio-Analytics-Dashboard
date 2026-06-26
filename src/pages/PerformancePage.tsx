import { usePortfolio } from '@/context/PortfolioContext';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { DrawdownChart } from '@/components/charts/DrawdownChart';

export function PerformancePage() {
  const { performance, isLoading } = usePortfolio();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Performance</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Historical portfolio performance vs. S&P 500 benchmark
        </p>
      </header>
      <PerformanceChart data={performance} isLoading={isLoading} />
      <DrawdownChart data={performance} isLoading={isLoading} />
    </div>
  );
}
