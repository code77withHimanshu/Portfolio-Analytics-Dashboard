import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';
import { StalenessProvider } from '@/context/StalenessContext';

function wrap(ui: React.ReactElement) {
  return render(<StalenessProvider>{ui}</StalenessProvider>);
}

describe('MetricCard', () => {
  it('renders label and value', () => {
    wrap(<MetricCard label="Total Value" value="$100,000.00" />);
    expect(screen.getByText('Total Value')).toBeInTheDocument();
    expect(screen.getByText('$100,000.00')).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading=true', () => {
    const { container } = wrap(
      <MetricCard label="Value" value="$0" isLoading />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('shows positive change indicator', () => {
    wrap(<MetricCard label="Value" value="$100" change={5} changeLabel="+5%" />);
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });

  it('shows negative change indicator', () => {
    wrap(<MetricCard label="Value" value="$100" change={-3} changeLabel="-3%" />);
    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('renders as article element', () => {
    const { container } = wrap(<MetricCard label="V" value="$0" />);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('shows amber border for stale data timestamp', () => {
    const staleTs = new Date(Date.now() - 20 * 60_000).toISOString();
    const { container } = wrap(
      <StalenessProvider thresholds={{ positions: 5 * 60_000 }}>
        <MetricCard label="Value" value="$100" dataTimestamp={staleTs} />
      </StalenessProvider>
    );
    const card = container.querySelector('.border-amber-400');
    expect(card).toBeInTheDocument();
  });
});
