import { useCallback, useEffect, useState } from 'react';
import type { PortfolioPosition, PerformancePoint, AllocationSlice, RiskMetrics, PortfolioSummary } from '@/types';
import {
  mockPositions,
  mockPerformance,
  allocationBySector,
  allocationByAssetClass,
  mockRiskMetrics,
} from '@/mocks';

interface PortfolioDataState {
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

function buildSummary(positions: PortfolioPosition[]): PortfolioSummary {
  const totalValue = positions.reduce((s, p) => s + p.marketValue, 0);
  const totalCost = positions.reduce((s, p) => s + p.avgCostBasis * p.quantity, 0);
  const totalUnrealizedPnL = totalValue - totalCost;
  const totalUnrealizedPnLPct = totalCost > 0 ? (totalUnrealizedPnL / totalCost) * 100 : 0;
  const dayChange = positions.reduce((s, p) => s + p.dayChange * p.quantity, 0);
  const prevValue = totalValue - dayChange;
  const dayChangePct = prevValue > 0 ? (dayChange / prevValue) * 100 : 0;
  const dataTimestamp = positions.reduce((latest, p) =>
    p.dataTimestamp > latest ? p.dataTimestamp : latest,
    positions[0]?.dataTimestamp ?? new Date().toISOString()
  );

  return {
    totalValue,
    totalCost,
    totalUnrealizedPnL,
    totalUnrealizedPnLPct,
    dayChange,
    dayChangePct,
    positions,
    dataTimestamp,
  };
}

export function usePortfolioData(): PortfolioDataState {
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [loadCount]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setLoadCount((c) => c + 1);
  }, []);

  const summary = isLoading ? null : buildSummary(mockPositions);

  return {
    summary,
    positions: isLoading ? [] : mockPositions,
    performance: isLoading ? [] : mockPerformance,
    allocationBySector: isLoading ? [] : allocationBySector,
    allocationByAssetClass: isLoading ? [] : allocationByAssetClass,
    riskMetrics: isLoading ? null : mockRiskMetrics,
    isLoading,
    error,
    refresh,
  };
}
