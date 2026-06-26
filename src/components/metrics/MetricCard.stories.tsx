import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';
import { StalenessProvider } from '@/context/StalenessContext';

const meta = {
  title: 'Metrics/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    label: 'Total Portfolio Value',
    value: '$186,562.50',
    change: 2.31,
    changeLabel: '+$4,213.20 today',
    dataTimestamp: new Date().toISOString(),
  },
};

export const Negative: Story = {
  args: {
    label: "Today's P&L",
    value: '-$1,245.00',
    change: -0.67,
    changeLabel: '-0.67%',
    dataTimestamp: new Date().toISOString(),
  },
};

export const Neutral: Story = {
  args: {
    label: 'Open Positions',
    value: '10',
    dataTimestamp: new Date().toISOString(),
  },
};

export const Stale: Story = {
  args: {
    label: 'Total Value',
    value: '$186,562.50',
    change: 1.5,
    changeLabel: '+1.50%',
    dataTimestamp: new Date(Date.now() - 15 * 60_000).toISOString(),
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    value: '$0',
    isLoading: true,
  },
};
