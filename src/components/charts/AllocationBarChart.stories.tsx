import type { Meta, StoryObj } from '@storybook/react';
import { AllocationBarChart } from './AllocationBarChart';
import { StalenessProvider } from '@/context/StalenessContext';
import { allocationBySector, allocationByAssetClass } from '@/mocks';

const meta = {
  title: 'Charts/AllocationBarChart',
  component: AllocationBarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof AllocationBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BySector: Story = { args: { data: allocationBySector, title: 'Sector Breakdown' } };
export const ByAssetClass: Story = { args: { data: allocationByAssetClass, title: 'Asset Class Breakdown' } };
export const Loading: Story = { args: { data: [], isLoading: true } };
export const Stale: Story = {
  args: {
    data: allocationBySector.map((s) => ({
      ...s,
      dataTimestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
    })),
  },
};
