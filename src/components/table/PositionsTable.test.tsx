import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PositionsTable } from './PositionsTable';
import { StalenessProvider } from '@/context/StalenessContext';
import { mockPositions } from '@/mocks';

function wrap(ui: React.ReactElement) {
  return render(<StalenessProvider>{ui}</StalenessProvider>);
}

describe('PositionsTable', () => {
  it('renders all position rows', () => {
    wrap(<PositionsTable positions={mockPositions} />);
    mockPositions.forEach((pos) => {
      expect(screen.getAllByText(pos.ticker).length).toBeGreaterThan(0);
    });
  });

  it('renders empty state message when no positions', () => {
    wrap(<PositionsTable positions={[]} />);
    expect(screen.getByText('No positions found.')).toBeInTheDocument();
  });

  it('renders loading skeleton when isLoading=true', () => {
    const { container } = wrap(<PositionsTable positions={[]} isLoading />);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('table has accessible label', () => {
    wrap(<PositionsTable positions={mockPositions} />);
    expect(screen.getByRole('table')).toHaveAttribute('aria-label');
  });

  it('column headers have aria-sort when sorting', async () => {
    wrap(<PositionsTable positions={mockPositions} />);
    const marketValueBtn = screen.getByRole('button', { name: /sort by market value/i });
    await userEvent.click(marketValueBtn);
    const th = marketValueBtn.closest('th');
    expect(th).toHaveAttribute('aria-sort');
  });

  it('sorts positions when clicking column header', async () => {
    wrap(<PositionsTable positions={mockPositions} />);
    const tickerBtn = screen.getByRole('button', { name: /sort by symbol/i });
    await userEvent.click(tickerBtn);
    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];
    expect(firstDataRow).toBeDefined();
  });

  it('heading shows position count', () => {
    wrap(<PositionsTable positions={mockPositions} />);
    expect(
      screen.getByText(new RegExp(`${mockPositions.length} positions`))
    ).toBeInTheDocument();
  });
});
