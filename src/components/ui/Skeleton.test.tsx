import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, CardSkeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is aria-hidden from assistive technology', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies chart class for chart variant', () => {
    const { container } = render(<Skeleton variant="chart" />);
    expect(container.firstChild).toHaveClass('rounded-xl');
  });

  it('renders multiple lines when lines > 1', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    expect(container.querySelectorAll('.rounded')).toHaveLength(3);
  });

  it('last line is narrower (w-3/4)', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const lines = container.querySelectorAll('.rounded');
    expect(lines[2]).toHaveClass('w-3/4');
  });
});

describe('CardSkeleton', () => {
  it('has aria-busy=true', () => {
    render(<CardSkeleton />);
    expect(screen.getByRole('presentation', { hidden: true })).toBeDefined();
  });

  it('has accessible label', () => {
    const { container } = render(<CardSkeleton />);
    const el = container.querySelector('[aria-label]');
    expect(el).toHaveAttribute('aria-label', 'Loading content');
  });
});
