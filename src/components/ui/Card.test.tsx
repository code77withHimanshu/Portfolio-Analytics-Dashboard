import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardTitle } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has normal border when not stale', () => {
    const { container } = render(<Card>Normal</Card>);
    expect(container.firstChild).not.toHaveClass('border-amber-400');
    expect(container.firstChild).toHaveClass('border-slate-200');
  });

  it('applies amber border when isStale=true', () => {
    const { container } = render(<Card isStale>Stale card</Card>);
    expect(container.firstChild).toHaveClass('border-amber-400');
  });

  it('renders StaleBadge when isStale=true', () => {
    const ts = new Date(Date.now() - 10 * 60_000).toISOString();
    render(<Card isStale dataTimestamp={ts}>Stale</Card>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not render StaleBadge when isStale=false', () => {
    render(<Card>Normal</Card>);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('renders as div by default', () => {
    const { container } = render(<Card>div</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('renders as section when as=section', () => {
    const { container } = render(<Card as="section">section</Card>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('passes aria-labelledby to element', () => {
    render(<Card aria-labelledby="heading-id">Content</Card>);
    const el = screen.getByText('Content').parentElement;
    expect(el).toHaveAttribute('aria-labelledby', 'heading-id');
  });
});

describe('CardTitle', () => {
  it('renders as h2', () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Title');
  });
});
