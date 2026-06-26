import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { isStale, getStalenessStatus, formatLastUpdated } from '../staleness';

describe('isStale', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns false when timestamp is within threshold', () => {
    const ts = new Date('2025-01-01T11:56:00Z').toISOString(); // 4 minutes ago
    expect(isStale(ts, 5 * 60_000)).toBe(false);
  });

  it('returns true when timestamp exceeds threshold', () => {
    const ts = new Date('2025-01-01T11:54:00Z').toISOString(); // 6 minutes ago
    expect(isStale(ts, 5 * 60_000)).toBe(true);
  });

  it('returns false at exact threshold boundary (not yet stale)', () => {
    const ts = new Date('2025-01-01T11:55:00Z').toISOString(); // exactly 5 minutes ago
    expect(isStale(ts, 5 * 60_000)).toBe(false);
  });

  it('returns false for null timestamp', () => {
    expect(isStale(null, 5 * 60_000)).toBe(false);
  });

  it('returns false for undefined timestamp', () => {
    expect(isStale(undefined, 5 * 60_000)).toBe(false);
  });
});

describe('getStalenessStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns fresh for recent timestamp', () => {
    const ts = new Date('2025-01-01T11:58:00Z').toISOString();
    expect(getStalenessStatus(ts, 5 * 60_000)).toBe('fresh');
  });

  it('returns stale for old timestamp', () => {
    const ts = new Date('2025-01-01T11:50:00Z').toISOString();
    expect(getStalenessStatus(ts, 5 * 60_000)).toBe('stale');
  });

  it('returns unknown for null timestamp', () => {
    expect(getStalenessStatus(null, 5 * 60_000)).toBe('unknown');
  });

  it('returns unknown for undefined timestamp', () => {
    expect(getStalenessStatus(undefined, 5 * 60_000)).toBe('unknown');
  });
});

describe('formatLastUpdated', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats seconds ago', () => {
    const ts = new Date('2025-01-01T11:59:45Z').toISOString(); // 15 seconds ago
    expect(formatLastUpdated(ts)).toBe('15s ago');
  });

  it('formats minutes ago', () => {
    const ts = new Date('2025-01-01T11:57:00Z').toISOString(); // 3 minutes ago
    expect(formatLastUpdated(ts)).toBe('3m ago');
  });

  it('formats hours ago', () => {
    const ts = new Date('2025-01-01T10:00:00Z').toISOString(); // 2 hours ago
    expect(formatLastUpdated(ts)).toBe('2h ago');
  });

  it('returns Unknown for null', () => {
    expect(formatLastUpdated(null)).toBe('Unknown');
  });

  it('returns Unknown for undefined', () => {
    expect(formatLastUpdated(undefined)).toBe('Unknown');
  });
});
