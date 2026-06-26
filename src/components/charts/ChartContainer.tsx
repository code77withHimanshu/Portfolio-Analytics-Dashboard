import type { ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import type { StalenessStatus } from '@/types';

interface ChartContainerProps {
  title: string;
  titleId?: string;
  children: ReactNode;
  isLoading?: boolean;
  stalenessStatus?: StalenessStatus;
  dataTimestamp?: string | null;
  toolbar?: ReactNode;
  description?: string;
  className?: string;
  height?: number;
}

export function ChartContainer({
  title,
  titleId,
  children,
  isLoading = false,
  stalenessStatus,
  dataTimestamp,
  toolbar,
  description,
  className,
  height = 280,
}: ChartContainerProps) {
  const headingId = titleId ?? `chart-${title.toLowerCase().replace(/\s+/g, '-')}`;

  if (isLoading) {
    return (
      <Card className={className} aria-busy="true">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton variant="text" className="w-1/3 h-5" />
            <Skeleton variant="text" className="w-24 h-7" />
          </div>
        </CardHeader>
        <CardBody>
          <Skeleton variant="chart" style={{ height }} />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      as="section"
      stalenessStatus={stalenessStatus}
      dataTimestamp={dataTimestamp}
      aria-labelledby={headingId}
      className={className}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle id={headingId}>{title}</CardTitle>
          {toolbar && <div className="flex-shrink-0">{toolbar}</div>}
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </CardHeader>
      <CardBody>
        <div
          role="img"
          aria-label={`${title} chart`}
          style={{ height }}
          className="w-full"
        >
          {children}
        </div>
      </CardBody>
    </Card>
  );
}
