import { useState, useCallback } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { PerformancePoint, TimeRange } from '@/types';
import { ChartContainer } from './ChartContainer';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { buildPerformanceChartData, filterByTimeRange } from '@/utils/chartHelpers';
import { formatDateShort, formatNumber } from '@/utils/formatters';
import { PORTFOLIO_COLOR, BENCHMARK_COLOR } from '@/constants/chart';

interface PerformanceChartProps {
  data: PerformancePoint[];
  isLoading?: boolean;
}

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '1Y', label: '1Y' },
  { value: 'ALL', label: 'All' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      role="tooltip"
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm"
    >
      <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="tabular-nums">
          {p.name}: {formatNumber(p.value, 2)} (base 100)
        </p>
      ))}
    </div>
  );
}

export function PerformanceChart({ data, isLoading = false }: PerformanceChartProps) {
  const [range, setRange] = useState<TimeRange>('1Y');
  const thresholds = useStalenessThresholds();
  const ts = data[0]?.dataTimestamp;
  const staleness = useStaleness(ts, thresholds.performance);

  const filtered = filterByTimeRange(data, range);
  const chartData = buildPerformanceChartData(filtered);

  const handleRangeChange = useCallback((v: TimeRange) => setRange(v), []);

  const toolbar = (
    <ToggleGroup
      options={TIME_RANGE_OPTIONS}
      value={range}
      onChange={handleRangeChange}
      label="Select time range"
    />
  );

  return (
    <ChartContainer
      title="Portfolio Performance"
      description="Normalized to base 100 vs. S&P 500 benchmark"
      isLoading={isLoading}
      stalenessStatus={staleness}
      dataTimestamp={ts}
      toolbar={toolbar}
      height={300}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeOpacity={0.6} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateShort}
            tick={{ fontSize: 11, fill: 'currentColor' }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v: number) => `${v.toFixed(0)}`}
            tick={{ fontSize: 11, fill: 'currentColor' }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
          />
          <Line
            type="monotone"
            dataKey="portfolio"
            name="Portfolio"
            stroke={PORTFOLIO_COLOR}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: PORTFOLIO_COLOR }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            name="S&P 500"
            stroke={BENCHMARK_COLOR}
            strokeWidth={1.5}
            strokeDasharray="4 2"
            dot={false}
            activeDot={{ r: 4, fill: BENCHMARK_COLOR }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
