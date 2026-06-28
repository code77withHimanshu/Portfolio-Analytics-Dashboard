import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'fresh', 'stale', 'error', 'warning', 'gain', 'loss'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Default', variant: 'default' } };

export const Fresh: Story = {
  args: { children: (<><CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Live</>) as never, variant: 'fresh' },
};

export const Stale: Story = {
  args: { children: 'Stale · 5m ago', variant: 'stale' },
};

export const Error: Story = {
  args: { children: (<><XCircle className="h-3 w-3" aria-hidden="true" /> Error</>) as never, variant: 'error' },
};

export const Warning: Story = {
  args: { children: (<><AlertTriangle className="h-3 w-3" aria-hidden="true" /> Warning</>) as never, variant: 'warning' },
};

export const Gain: Story = { args: { children: '+12.5%', variant: 'gain' } };

export const Loss: Story = { args: { children: '-4.2%', variant: 'loss' } };

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['default', 'fresh', 'stale', 'error', 'warning', 'gain', 'loss'] as const).map((v) => (
        <Badge key={v} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};
