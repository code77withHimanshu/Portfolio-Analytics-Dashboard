import { usePortfolio } from '@/context/PortfolioContext';
import { PositionsTable } from '@/components/table/PositionsTable';

export function PositionsPage() {
  const { positions, isLoading } = usePortfolio();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Positions</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          All open positions sorted by market value
        </p>
      </header>
      <PositionsTable positions={positions} isLoading={isLoading} />
    </div>
  );
}
