import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { PerformancePoint } from '@/types';
import { ChartContainer } from './ChartContainer';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { computeDrawdownSeries } from '@/utils/chartHelpers';
import { formatDateShort, formatPercent } from '@/utils/formatters';
import { DRAWDOWN_COLOR } from '@/constants/chart';

interface DrawdownChartProps {
  data: PerformancePoint[];
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      role="tooltip"
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm"
    >
      <p className="text-slate-700 dark:text-slate-300 mb-1">{label}</p>
      <p className="text-loss font-medium tabular-nums">
        Drawdown: {formatPercent(payload[0].value)}
      </p>
    </div>
  );
}

export function DrawdownChart({ data, isLoading = false }: DrawdownChartProps) {
  const thresholds = useStalenessThresholds();
  const ts = data[0]?.dataTimestamp;
  const staleness = useStaleness(ts, thresholds.performance);
  const chartData = computeDrawdownSeries(data);

  return (
    <ChartContainer
      title="Drawdown"
      description="Peak-to-trough portfolio decline over time"
      isLoading={isLoading}
      stalenessStatus={staleness}
      dataTimestamp={ts}
      height={220}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={DRAWDOWN_COLOR} stopOpacity={0.4} />
              <stop offset="95%" stopColor={DRAWDOWN_COLOR} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeOpacity={0.6} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateShort}
            tick={{ fontSize: 11 }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={(v: number) => `${v.toFixed(1)}%`}
            tick={{ fontSize: 11 }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="drawdown"
            name="Drawdown"
            stroke={DRAWDOWN_COLOR}
            strokeWidth={1.5}
            fill="url(#drawdownGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
