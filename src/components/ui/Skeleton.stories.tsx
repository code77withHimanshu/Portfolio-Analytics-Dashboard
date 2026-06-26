import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, CardSkeleton } from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLine: Story = { args: { variant: 'text' } };
export const MultiLine: Story = { args: { variant: 'text', lines: 4 } };
export const CardVariant: Story = { args: { variant: 'card' } };
export const ChartVariant: Story = { args: { variant: 'chart' } };

export const CompositePage: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
      <Skeleton variant="chart" className="h-72" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton variant="chart" className="h-52" />
        <Skeleton variant="chart" className="h-52" />
      </div>
    </div>
  ),
};
