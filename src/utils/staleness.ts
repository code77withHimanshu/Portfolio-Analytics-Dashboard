import type { StalenessStatus } from '@/types';

export function isStale(timestamp: string | null | undefined, thresholdMs: number): boolean {
  if (!timestamp) return false;
  const age = Date.now() - new Date(timestamp).getTime();
  return age > thresholdMs;
}

export function getStalenessStatus(
  timestamp: string | null | undefined,
  thresholdMs: number
): StalenessStatus {
  if (!timestamp) return 'unknown';
  return isStale(timestamp, thresholdMs) ? 'stale' : 'fresh';
}

export function formatLastUpdated(timestamp: string | null | undefined): string {
  if (!timestamp) return 'Unknown';
  const date = new Date(timestamp);
  const ageMs = Date.now() - date.getTime();
  const ageSec = Math.floor(ageMs / 1000);

  if (ageSec < 60) return `${ageSec}s ago`;
  const ageMin = Math.floor(ageSec / 60);
  if (ageMin < 60) return `${ageMin}m ago`;
  const ageHr = Math.floor(ageMin / 60);
  if (ageHr < 24) return `${ageHr}h ago`;
  return date.toLocaleDateString();
}
