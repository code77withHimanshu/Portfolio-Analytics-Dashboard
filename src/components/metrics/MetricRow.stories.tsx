import type { Meta, StoryObj } from '@storybook/react';
import { MetricRow } from './MetricRow';
import { StalenessProvider } from '@/context/StalenessContext';
import type { PortfolioSummary } from '@/types';
import { mockPositions } from '@/mocks';

const meta = {
  title: 'Metrics/MetricRow',
  component: MetricRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof MetricRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const freshSummary: PortfolioSummary = {
  totalValue: 200_000,
  totalCost: 150_000,
  totalUnrealizedPnL: 50_000,
  totalUnrealizedPnLPct: 33.33,
  dayChange: 2_000,
  dayChangePct: 1.01,
  positions: mockPositions,
  dataTimestamp: new Date().toISOString(),
};

export const Default: Story = { args: { summary: freshSummary } };
export const Loading: Story = { args: { summary: null, isLoading: true } };
export const PartialGain: Story = {
  args: {
    summary: { ...freshSummary, dayChange: -500, dayChangePct: -0.25 },
  },
};
