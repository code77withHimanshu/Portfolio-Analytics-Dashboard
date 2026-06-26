import { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import type { AllocationSlice } from '@/types';
import { ChartContainer } from './ChartContainer';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface AllocationPieChartProps {
  data: AllocationSlice[];
  title?: string;
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: AllocationSlice }>;
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
      <p className="text-slate-600 dark:text-slate-300">{formatCurrency(slice.value, { compact: true })}</p>
      <p className="text-slate-600 dark:text-slate-300">{formatPercent(slice.percentage)}</p>
    </div>
  );
}

export function AllocationPieChart({
  data,
  title = 'Asset Allocation',
  isLoading = false,
}: AllocationPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const thresholds = useStalenessThresholds();
  const ts = data[0]?.dataTimestamp;
  const staleness = useStaleness(ts, thresholds.allocation);

  return (
    <ChartContainer
      title={title}
      isLoading={isLoading}
      stalenessStatus={staleness}
      dataTimestamp={ts}
      height={300}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="45%"
            outerRadius="70%"
            innerRadius="35%"
            paddingAngle={2}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            aria-label="Allocation pie chart"
          >
            {data.map((slice, index) => (
              <Cell
                key={slice.label}
                fill={slice.color}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                stroke={activeIndex === index ? slice.color : 'transparent'}
                strokeWidth={activeIndex === index ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-slate-600 dark:text-slate-400">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
