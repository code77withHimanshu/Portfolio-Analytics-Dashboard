export type AssetClass = 'equity' | 'bond' | 'etf' | 'crypto' | 'cash';

export type Sector =
  | 'Technology'
  | 'Healthcare'
  | 'Financials'
  | 'Consumer Discretionary'
  | 'Communication Services'
  | 'Industrials'
  | 'Consumer Staples'
  | 'Energy'
  | 'Utilities'
  | 'Real Estate'
  | 'Materials'
  | 'Fixed Income'
  | 'Cryptocurrency'
  | 'Cash & Equivalents';

export interface PortfolioPosition {
  id: string;
  ticker: string;
  name: string;
  sector: Sector;
  assetClass: AssetClass;
  quantity: number;
  avgCostBasis: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPct: number;
  weight: number;
  dayChange: number;
  dayChangePct: number;
  dataTimestamp: string;
}

export interface PerformancePoint {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
  dailyReturn: number;
  cumulativeReturn: number;
  dataTimestamp: string;
}

export interface AllocationSlice {
  label: string;
  value: number;
  percentage: number;
  color: string;
  dataTimestamp: string;
}

export interface RiskMetrics {
  sharpeRatio: number;
  sortinoRatio: number;
  beta: number;
  alpha: number;
  maxDrawdown: number;
  maxDrawdownPct: number;
  volatilityAnnualized: number;
  valueAtRisk95: number;
  correlationToBenchmark: number;
  dataTimestamp: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalUnrealizedPnL: number;
  totalUnrealizedPnLPct: number;
  dayChange: number;
  dayChangePct: number;
  positions: PortfolioPosition[];
  dataTimestamp: string;
}

export type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';

export type AllocationView = 'sector' | 'assetClass';
