import type { Meta, StoryObj } from '@storybook/react';
import { Download } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: 'Primary Button', variant: 'primary' } };
export const Secondary: Story = { args: { children: 'Secondary Button', variant: 'secondary' } };
export const Ghost: Story = { args: { children: 'Ghost Button', variant: 'ghost' } };
export const Danger: Story = { args: { children: 'Delete', variant: 'danger' } };
export const Loading: Story = { args: { children: 'Save', isLoading: true, loadingText: 'Saving…' } };
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } };

export const WithIcon: StoryObj = {
  render: () => (
    <Button variant="secondary">
      <Download className="h-4 w-4" aria-hidden="true" />
      Export CSV
    </Button>
  ),
};

export const AllSizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
