import type { Meta, StoryObj } from '@storybook/react';
import { DrawdownChart } from './DrawdownChart';
import { StalenessProvider } from '@/context/StalenessContext';
import { mockPerformance } from '@/mocks';

const meta = {
  title: 'Charts/DrawdownChart',
  component: DrawdownChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof DrawdownChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { data: mockPerformance } };
export const Loading: Story = { args: { data: [], isLoading: true } };
export const Stale: Story = {
  args: {
    data: mockPerformance.map((p) => ({
      ...p,
      dataTimestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
    })),
  },
};
