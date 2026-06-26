import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaleBadge } from './StaleBadge';

describe('StaleBadge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when status is fresh', () => {
    const { container } = render(<StaleBadge status="fresh" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when status is unknown', () => {
    const { container } = render(<StaleBadge status="unknown" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders stale badge when status is stale', () => {
    render(<StaleBadge status="stale" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows relative time in stale badge', () => {
    const ts = new Date('2025-01-01T11:55:00Z').toISOString(); // 5 min ago
    render(<StaleBadge status="stale" dataTimestamp={ts} />);
    expect(screen.getByText(/5m ago/)).toBeInTheDocument();
  });

  it('has aria-live polite for screen reader announcement', () => {
    render(<StaleBadge status="stale" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
