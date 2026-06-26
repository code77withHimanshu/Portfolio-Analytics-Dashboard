import type { Meta, StoryObj } from '@storybook/react';
import { RiskMetricGrid } from './RiskMetricGrid';
import { StalenessProvider } from '@/context/StalenessContext';
import { mockRiskMetrics } from '@/mocks';

const meta = {
  title: 'Metrics/RiskMetricGrid',
  component: RiskMetricGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof RiskMetricGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { metrics: mockRiskMetrics } };
export const Stale: Story = {
  args: {
    metrics: {
      ...mockRiskMetrics,
      dataTimestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
    },
  },
};
export const Loading: Story = { args: { metrics: null, isLoading: true } };
