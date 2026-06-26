import type { RiskMetrics } from '@/types';

const now = new Date();

export const mockRiskMetrics: RiskMetrics = {
  sharpeRatio: 1.42,
  sortinoRatio: 2.08,
  beta: 1.18,
  alpha: 3.4,
  maxDrawdown: -24350.0,
  maxDrawdownPct: -14.8,
  volatilityAnnualized: 18.6,
  valueAtRisk95: -4120.0,
  correlationToBenchmark: 0.87,
  dataTimestamp: new Date(now.getTime() - 12 * 60_000).toISOString(),
};
