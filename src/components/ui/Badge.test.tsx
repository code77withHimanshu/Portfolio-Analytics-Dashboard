import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Fresh</Badge>);
    expect(screen.getByText('Fresh')).toBeInTheDocument();
  });

  it('applies stale variant classes', () => {
    const { container } = render(<Badge variant="stale">Stale</Badge>);
    expect(container.firstChild).toHaveClass('bg-amber-100');
  });

  it('applies gain variant classes', () => {
    const { container } = render(<Badge variant="gain">+5%</Badge>);
    expect(container.firstChild).toHaveClass('bg-green-100');
  });

  it('applies loss variant classes', () => {
    const { container } = render(<Badge variant="loss">-3%</Badge>);
    expect(container.firstChild).toHaveClass('bg-red-100');
  });

  it('has default role=status', () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('accepts custom aria-label', () => {
    render(<Badge aria-label="Positive gain badge">+5%</Badge>);
    expect(screen.getByLabelText('Positive gain badge')).toBeInTheDocument();
  });

  it('applies sm size by default', () => {
    const { container } = render(<Badge>SM</Badge>);
    expect(container.firstChild).toHaveClass('text-xs');
  });

  it('applies md size when specified', () => {
    const { container } = render(<Badge size="md">MD</Badge>);
    expect(container.firstChild).toHaveClass('text-sm');
  });
});
