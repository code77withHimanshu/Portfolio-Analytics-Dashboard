import { describe, it, expect } from 'vitest';
import { normalizeToBase100, computeDrawdownSeries, filterByTimeRange } from '../chartHelpers';
import type { PerformancePoint } from '@/types';

function makePoint(date: string, portfolioValue: number, benchmarkValue = 100): PerformancePoint {
  return {
    date,
    portfolioValue,
    benchmarkValue,
    dailyReturn: 0,
    cumulativeReturn: 0,
    dataTimestamp: new Date().toISOString(),
  };
}

describe('normalizeToBase100', () => {
  it('returns empty array for empty input', () => {
    expect(normalizeToBase100([])).toEqual([]);
  });

  it('first element is always 100', () => {
    const result = normalizeToBase100([200, 400, 100]);
    expect(result[0]).toBe(100);
  });

  it('scales proportionally', () => {
    const result = normalizeToBase100([100, 110, 90]);
    expect(result[1]).toBeCloseTo(110);
    expect(result[2]).toBeCloseTo(90);
  });

  it('handles base=0 without throwing', () => {
    const result = normalizeToBase100([0, 100, 200]);
    expect(result).toEqual([100, 100, 100]);
  });
});

describe('computeDrawdownSeries', () => {
  it('returns 0 drawdown for monotonically increasing series', () => {
    const points = [
      makePoint('2024-01-01', 100),
      makePoint('2024-01-02', 110),
      makePoint('2024-01-03', 120),
    ];
    const result = computeDrawdownSeries(points);
    result.forEach((r) => expect(r.drawdown).toBe(0));
  });

  it('computes correct drawdown after decline', () => {
    const points = [
      makePoint('2024-01-01', 100),
      makePoint('2024-01-02', 80),
    ];
    const result = computeDrawdownSeries(points);
    expect(result[0].drawdown).toBe(0);
    expect(result[1].drawdown).toBeCloseTo(-20);
  });

  it('resets after new peak', () => {
    const points = [
      makePoint('2024-01-01', 100),
      makePoint('2024-01-02', 80),
      makePoint('2024-01-03', 110),
    ];
    const result = computeDrawdownSeries(points);
    expect(result[2].drawdown).toBe(0);
  });
});

describe('filterByTimeRange', () => {
  const today = new Date();
  const points = [
    makePoint(new Date(today.getTime() - 400 * 86400_000).toISOString().split('T')[0], 100),
    makePoint(new Date(today.getTime() - 200 * 86400_000).toISOString().split('T')[0], 110),
    makePoint(new Date(today.getTime() - 20 * 86400_000).toISOString().split('T')[0], 115),
    makePoint(new Date(today.getTime() - 2 * 86400_000).toISOString().split('T')[0], 120),
  ];

  it('returns all points for ALL range', () => {
    expect(filterByTimeRange(points, 'ALL')).toHaveLength(4);
  });

  it('filters to last 30 days for 1M', () => {
    const result = filterByTimeRange(points, '1M');
    expect(result.every((p) => new Date(p.date) > new Date(today.getTime() - 31 * 86400_000))).toBe(true);
  });

  it('returns empty array for empty input', () => {
    expect(filterByTimeRange([], '1Y')).toHaveLength(0);
  });
});
