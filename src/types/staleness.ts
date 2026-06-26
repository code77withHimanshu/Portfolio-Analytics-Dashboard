export type StalenessStatus = 'fresh' | 'stale' | 'unknown';

export interface StalenessThresholds {
  positions: number;
  performance: number;
  allocation: number;
  riskMetrics: number;
}

export interface WithStaleness<T> {
  data: T;
  staleness: StalenessStatus;
  lastUpdated: Date | null;
}
