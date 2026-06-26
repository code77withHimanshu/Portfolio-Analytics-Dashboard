import type { PerformancePoint } from '@/types';

function generatePerformanceSeries(): PerformancePoint[] {
  const points: PerformancePoint[] = [];
  const now = new Date();
  let portfolioValue = 150_000;
  let benchmarkValue = 150_000;
  let cumReturn = 0;

  for (let i = 365; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];

    const portfolioDailyReturn = (Math.random() - 0.47) * 0.025;
    const benchmarkDailyReturn = (Math.random() - 0.48) * 0.018;

    portfolioValue *= 1 + portfolioDailyReturn;
    benchmarkValue *= 1 + benchmarkDailyReturn;
    cumReturn += portfolioDailyReturn;

    points.push({
      date: dateStr,
      portfolioValue: Math.round(portfolioValue * 100) / 100,
      benchmarkValue: Math.round(benchmarkValue * 100) / 100,
      dailyReturn: portfolioDailyReturn * 100,
      cumulativeReturn: cumReturn * 100,
      dataTimestamp: new Date(now.getTime() - 3 * 60_000).toISOString(),
    });
  }

  return points;
}

export const mockPerformance: PerformancePoint[] = generatePerformanceSeries();
