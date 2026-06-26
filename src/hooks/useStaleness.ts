import { useEffect, useState } from 'react';
import type { StalenessStatus } from '@/types';
import { getStalenessStatus } from '@/utils/staleness';
import { STALE_POLL_INTERVAL_MS } from '@/constants/staleness';

export function useStaleness(
  dataTimestamp: string | null | undefined,
  thresholdMs: number
): StalenessStatus {
  const [status, setStatus] = useState<StalenessStatus>(() =>
    getStalenessStatus(dataTimestamp, thresholdMs)
  );

  useEffect(() => {
    setStatus(getStalenessStatus(dataTimestamp, thresholdMs));

    const interval = setInterval(() => {
      setStatus(getStalenessStatus(dataTimestamp, thresholdMs));
    }, STALE_POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [dataTimestamp, thresholdMs]);

  return status;
}
