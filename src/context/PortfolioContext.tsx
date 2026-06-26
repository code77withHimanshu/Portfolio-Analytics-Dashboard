import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioPosition, PerformancePoint, AllocationSlice, RiskMetrics, PortfolioSummary } from '@/types';
import { usePortfolioData } from '@/hooks/usePortfolioData';

interface PortfolioContextValue {
  summary: PortfolioSummary | null;
  positions: PortfolioPosition[];
  performance: PerformancePoint[];
  allocationBySector: AllocationSlice[];
  allocationByAssetClass: AllocationSlice[];
  riskMetrics: RiskMetrics | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const data = usePortfolioData();
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
