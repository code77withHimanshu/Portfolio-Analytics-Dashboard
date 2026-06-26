import type { Meta, StoryObj } from '@storybook/react';
import { AllocationPieChart } from './AllocationPieChart';
import { StalenessProvider } from '@/context/StalenessContext';
import { allocationBySector, allocationByAssetClass } from '@/mocks';

const meta = {
  title: 'Charts/AllocationPieChart',
  component: AllocationPieChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof AllocationPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BySector: Story = { args: { data: allocationBySector, title: 'Sector Allocation' } };
export const ByAssetClass: Story = { args: { data: allocationByAssetClass, title: 'Asset Class Allocation' } };
export const Loading: Story = { args: { data: [], isLoading: true } };
export const Stale: Story = {
  args: {
    data: allocationBySector.map((s) => ({
      ...s,
      dataTimestamp: new Date(Date.now() - 20 * 60_000).toISOString(),
    })),
  },
};
