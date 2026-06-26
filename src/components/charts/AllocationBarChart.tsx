import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import type { AllocationSlice } from '@/types';
import { ChartContainer } from './ChartContainer';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { formatPercent } from '@/utils/formatters';
import { PORTFOLIO_COLOR } from '@/constants/chart';

interface AllocationBarChartProps {
  data: AllocationSlice[];
  title?: string;
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: AllocationSlice }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const slice = payload[0].payload;
  return (
    <div
      role="tooltip"
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm"
    >
      <p className="font-medium text-slate-900 dark:text-white">{slice.label}</p>
      <p className="text-slate-600 dark:text-slate-300 tabular-nums">
        {formatPercent(slice.percentage)}
      </p>
    </div>
  );
}

export function AllocationBarChart({
  data,
  title = 'Allocation Breakdown',
  isLoading = false,
}: AllocationBarChartProps) {
  const thresholds = useStalenessThresholds();
  const ts = data[0]?.dataTimestamp;
  const staleness = useStaleness(ts, thresholds.allocation);

  return (
    <ChartContainer
      title={title}
      isLoading={isLoading}
      stalenessStatus={staleness}
      dataTimestamp={ts}
      height={280}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeOpacity={0.6} />
          <XAxis
            type="number"
            tickFormatter={(v: number) => `${v.toFixed(0)}%`}
            tick={{ fontSize: 11 }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={130}
            tick={{ fontSize: 11 }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="percentage" name="Allocation %" radius={[0, 4, 4, 0]}>
            {data.map((slice) => (
              <Cell key={slice.label} fill={slice.color ?? PORTFOLIO_COLOR} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
