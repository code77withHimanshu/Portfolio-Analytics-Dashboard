import type { Meta, StoryObj } from '@storybook/react';
import { PositionsTable } from './PositionsTable';
import { StalenessProvider } from '@/context/StalenessContext';
import { mockPositions } from '@/mocks';

const meta = {
  title: 'Table/PositionsTable',
  component: PositionsTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <StalenessProvider><Story /></StalenessProvider>],
} satisfies Meta<typeof PositionsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { positions: mockPositions } };
export const Loading: Story = { args: { positions: [], isLoading: true } };
export const Empty: Story = { args: { positions: [] } };
export const SomeStale: Story = {
  args: {
    positions: mockPositions.map((p, i) =>
      i % 3 === 0 ? { ...p, dataTimestamp: new Date(Date.now() - 20 * 60_000).toISOString() } : p
    ),
  },
};
