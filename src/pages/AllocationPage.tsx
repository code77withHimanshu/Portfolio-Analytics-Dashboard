import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { AllocationPieChart } from '@/components/charts/AllocationPieChart';
import { AllocationBarChart } from '@/components/charts/AllocationBarChart';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import type { AllocationView } from '@/types';

const VIEW_OPTIONS: { value: AllocationView; label: string }[] = [
  { value: 'sector', label: 'By Sector' },
  { value: 'assetClass', label: 'By Asset Class' },
];

export function AllocationPage() {
  const [view, setView] = useState<AllocationView>('sector');
  const { allocationBySector, allocationByAssetClass, isLoading } = usePortfolio();
  const data = view === 'sector' ? allocationBySector : allocationByAssetClass;
  const title = view === 'sector' ? 'Sector Allocation' : 'Asset Class Allocation';

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Allocation</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Portfolio breakdown by sector and asset class
          </p>
        </div>
        <ToggleGroup
          options={VIEW_OPTIONS}
          value={view}
          onChange={setView}
          label="Allocation view"
        />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AllocationPieChart data={data} title={title} isLoading={isLoading} />
        <AllocationBarChart data={data} title={title} isLoading={isLoading} />
      </div>
    </div>
  );
}
