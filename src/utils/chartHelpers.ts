import type { PerformancePoint } from '@/types';

export function normalizeToBase100(series: number[]): number[] {
  if (series.length === 0) return [];
  const base = series[0];
  if (base === 0) return series.map(() => 100);
  return series.map((v) => (v / base) * 100);
}

export function buildPerformanceChartData(
  points: PerformancePoint[]
): Array<{
  date: string;
  portfolio: number;
  benchmark: number;
}> {
  if (points.length === 0) return [];

  const portfolioBase = points[0].portfolioValue;
  const benchmarkBase = points[0].benchmarkValue;

  return points.map((p) => ({
    date: p.date,
    portfolio: portfolioBase > 0 ? (p.portfolioValue / portfolioBase) * 100 : 100,
    benchmark: benchmarkBase > 0 ? (p.benchmarkValue / benchmarkBase) * 100 : 100,
  }));
}

export function computeDrawdownSeries(points: PerformancePoint[]): Array<{
  date: string;
  drawdown: number;
}> {
  let peak = -Infinity;
  return points.map((p) => {
    if (p.portfolioValue > peak) peak = p.portfolioValue;
    const drawdown = peak > 0 ? ((p.portfolioValue - peak) / peak) * 100 : 0;
    return { date: p.date, drawdown };
  });
}

export function filterByTimeRange(
  points: PerformancePoint[],
  range: '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL'
): PerformancePoint[] {
  if (range === 'ALL' || points.length === 0) return points;
  const now = new Date();
  const cutoffs: Record<string, number> = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
  };
  const daysBack = cutoffs[range] ?? 365;
  const cutoff = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return points.filter((p) => new Date(p.date) >= cutoff);
}
