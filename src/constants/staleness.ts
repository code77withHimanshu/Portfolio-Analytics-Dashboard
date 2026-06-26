import type { StalenessThresholds } from '@/types';

export const DEFAULT_STALENESS_THRESHOLDS: StalenessThresholds = {
  positions: 5 * 60 * 1000,
  performance: 5 * 60 * 1000,
  allocation: 10 * 60 * 1000,
  riskMetrics: 10 * 60 * 1000,
};

export const STALE_POLL_INTERVAL_MS = 30_000;
