import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStaleness } from '../useStaleness';

describe('useStaleness', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns fresh for a recent timestamp', () => {
    const ts = new Date('2025-01-01T11:58:00Z').toISOString();
    const { result } = renderHook(() => useStaleness(ts, 5 * 60_000));
    expect(result.current).toBe('fresh');
  });

  it('returns stale for an old timestamp', () => {
    const ts = new Date('2025-01-01T11:50:00Z').toISOString();
    const { result } = renderHook(() => useStaleness(ts, 5 * 60_000));
    expect(result.current).toBe('stale');
  });

  it('returns unknown for null timestamp', () => {
    const { result } = renderHook(() => useStaleness(null, 5 * 60_000));
    expect(result.current).toBe('unknown');
  });

  it('transitions from fresh to stale after threshold expires', async () => {
    const ts = new Date('2025-01-01T11:56:00Z').toISOString(); // 4 min ago → fresh
    const { result } = renderHook(() => useStaleness(ts, 5 * 60_000));
    expect(result.current).toBe('fresh');

    act(() => {
      vi.advanceTimersByTime(2 * 60_000 + 30_000); // advance 2.5 min (poll interval fires)
    });

    expect(result.current).toBe('stale');
  });

  it('updates when timestamp prop changes', () => {
    const freshTs = new Date('2025-01-01T11:59:00Z').toISOString();
    const staleTs = new Date('2025-01-01T11:50:00Z').toISOString();

    const { result, rerender } = renderHook(
      ({ ts }: { ts: string }) => useStaleness(ts, 5 * 60_000),
      { initialProps: { ts: freshTs } }
    );
    expect(result.current).toBe('fresh');

    rerender({ ts: staleTs });
    expect(result.current).toBe('stale');
  });
});
