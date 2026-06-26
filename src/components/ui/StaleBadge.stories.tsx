import type { Meta, StoryObj } from '@storybook/react';
import { StaleBadge } from './StaleBadge';

const meta = {
  title: 'UI/StaleBadge',
  component: StaleBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StaleBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const stale5min = new Date(Date.now() - 5 * 60_000).toISOString();
const stale1hr = new Date(Date.now() - 60 * 60_000).toISOString();

export const Hidden_Fresh: Story = { args: { status: 'fresh', dataTimestamp: new Date().toISOString() } };
export const Hidden_Unknown: Story = { args: { status: 'unknown' } };
export const Stale_5Min: Story = { args: { status: 'stale', dataTimestamp: stale5min } };
export const Stale_1Hr: Story = { args: { status: 'stale', dataTimestamp: stale1hr } };
export const Stale_NoTimestamp: Story = { args: { status: 'stale' } };
