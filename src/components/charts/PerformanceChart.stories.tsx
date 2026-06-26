import type { Meta, StoryObj } from '@storybook/react';
import { PerformanceChart } from './PerformanceChart';
import { StalenessProvider } from '@/context/StalenessContext';
import { mockPerformance } from '@/mocks';

const meta = {
  title: 'Charts/PerformanceChart',
  component: PerformanceChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof PerformanceChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { data: mockPerformance } };
export const Loading: Story = { args: { data: [], isLoading: true } };
export const Empty: Story = { args: { data: [] } };
export const Stale: Story = {
  args: {
    data: mockPerformance.map((p) => ({
      ...p,
      dataTimestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
    })),
  },
};
