import { useState, useCallback } from 'react';
import type { PortfolioPosition } from '@/types';
import { useStaleness } from '@/hooks/useStaleness';
import { useStalenessThresholds } from '@/context/StalenessContext';
import { cn } from '@/utils/cn';
import { formatCurrency, formatPercent, formatSignedCurrency, formatSignedPercent } from '@/utils/formatters';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Card, CardHeader, CardBody, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

type SortKey = keyof Pick<
  PortfolioPosition,
  'ticker' | 'marketValue' | 'unrealizedPnL' | 'unrealizedPnLPct' | 'weight' | 'dayChangePct'
>;
type SortDir = 'asc' | 'desc' | null;

interface SortState {
  key: SortKey | null;
  dir: SortDir;
}

interface PositionsTableProps {
  positions: PortfolioPosition[];
  isLoading?: boolean;
}

function SortIcon({ direction }: { direction: SortDir }) {
  if (direction === 'asc') return <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />;
  if (direction === 'desc') return <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />;
  return <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" aria-hidden="true" />;
}

const COLUMNS: { key: SortKey | null; label: string; className?: string }[] = [
  { key: 'ticker', label: 'Symbol / Name', className: 'text-left w-40' },
  { key: null, label: 'Asset Class', className: 'text-left' },
  { key: 'marketValue', label: 'Market Value', className: 'text-right' },
  { key: 'unrealizedPnL', label: 'Unrealized P&L', className: 'text-right' },
  { key: 'unrealizedPnLPct', label: 'P&L %', className: 'text-right' },
  { key: 'dayChangePct', label: "Day's Change", className: 'text-right' },
  { key: 'weight', label: 'Weight', className: 'text-right' },
];

function sortPositions(positions: PortfolioPosition[], sort: SortState): PortfolioPosition[] {
  if (!sort.key || !sort.dir) return positions;
  return [...positions].sort((a, b) => {
    const av = a[sort.key!];
    const bv = b[sort.key!];
    const cmp =
      typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sort.dir === 'asc' ? cmp : -cmp;
  });
}

export function PositionsTable({ positions, isLoading = false }: PositionsTableProps) {
  const [sort, setSort] = useState<SortState>({ key: 'marketValue', dir: 'desc' });

  const handleSort = useCallback((key: SortKey | null) => {
    if (!key) return;
    setSort((prev) => ({
      key,
      dir:
        prev.key === key
          ? prev.dir === 'asc'
            ? 'desc'
            : prev.dir === 'desc'
            ? null
            : 'asc'
          : 'desc',
    }));
  }, []);

  if (isLoading) {
    return (
      <Card aria-busy="true" aria-label="Positions loading">
        <CardHeader>
          <Skeleton variant="text" className="w-1/4 h-5" />
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="h-10" />
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  const sorted = sortPositions(positions, sort);

  return (
    <Card as="section" aria-labelledby="positions-table-heading">
      <CardHeader>
        <CardTitle id="positions-table-heading">
          Holdings ({positions.length} positions)
        </CardTitle>
      </CardHeader>
      <CardBody className="px-0 pb-0 overflow-x-auto">
        <table
          className="w-full text-sm"
          aria-label={`Portfolio holdings table, ${positions.length} positions`}
        >
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              {COLUMNS.map(({ key, label, className }) => (
                <th
                  key={label}
                  scope="col"
                  aria-sort={
                    key && sort.key === key
                      ? sort.dir === 'asc'
                        ? 'ascending'
                        : sort.dir === 'desc'
                        ? 'descending'
                        : 'none'
                      : undefined
                  }
                  className={cn(
                    'px-6 py-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider',
                    className
                  )}
                >
                  {key ? (
                    <button
                      onClick={() => handleSort(key)}
                      className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                      aria-label={`Sort by ${label}`}
                    >
                      {label}
                      <SortIcon direction={sort.key === key ? sort.dir : null} />
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map((pos) => (
              <PositionRow key={pos.id} position={pos} />
            ))}
          </tbody>
        </table>
        {positions.length === 0 && (
          <div
            className="py-12 text-center text-slate-500 dark:text-slate-400"
            role="status"
          >
            No positions found.
          </div>
        )}
      </CardBody>
    </Card>
  );
}

const ASSET_CLASS_LABELS: Record<string, string> = {
  equity: 'Equity',
  bond: 'Bond',
  etf: 'ETF',
  crypto: 'Crypto',
  cash: 'Cash',
};

function PositionRow({ position: pos }: { position: PortfolioPosition }) {
  const thresholds = useStalenessThresholds();
  const staleness = useStaleness(pos.dataTimestamp, thresholds.positions);
  const isStale = staleness === 'stale';
  const isGain = pos.unrealizedPnL >= 0;
  const isDayGain = pos.dayChangePct >= 0;

  return (
    <tr
      className={cn(
        'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors',
        isStale && 'bg-amber-50/50 dark:bg-amber-900/10'
      )}
      aria-label={`${pos.ticker} position${isStale ? ', data stale' : ''}`}
    >
      <td className="px-6 py-3">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-white font-mono">
            {pos.ticker}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[10rem]">
            {pos.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-3">
        <Badge variant="default" size="sm">
          {ASSET_CLASS_LABELS[pos.assetClass] ?? pos.assetClass}
        </Badge>
      </td>
      <td className="px-6 py-3 text-right tabular-nums text-slate-900 dark:text-white font-medium">
        {formatCurrency(pos.marketValue)}
      </td>
      <td
        className={cn(
          'px-6 py-3 text-right tabular-nums font-medium',
          isGain ? 'text-gain' : 'text-loss'
        )}
      >
        {formatSignedCurrency(pos.unrealizedPnL)}
      </td>
      <td
        className={cn(
          'px-6 py-3 text-right tabular-nums font-medium',
          isGain ? 'text-gain' : 'text-loss'
        )}
      >
        {formatSignedPercent(pos.unrealizedPnLPct)}
      </td>
      <td
        className={cn(
          'px-6 py-3 text-right tabular-nums',
          isDayGain ? 'text-gain' : 'text-loss'
        )}
      >
        {formatSignedPercent(pos.dayChangePct)}
      </td>
      <td className="px-6 py-3 text-right tabular-nums text-slate-600 dark:text-slate-300">
        {formatPercent(pos.weight)}
      </td>
    </tr>
  );
}
