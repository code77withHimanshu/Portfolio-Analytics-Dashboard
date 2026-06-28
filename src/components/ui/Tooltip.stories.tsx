import type { Meta, StoryObj } from '@storybook/react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: 'Hover over me',
  },
};

export const WithIcon: StoryObj = {
  render: () => (
    <Tooltip content="Sharpe Ratio measures risk-adjusted returns. Higher is better.">
      <HelpCircle className="h-4 w-4 text-slate-400" aria-label="About Sharpe Ratio" />
    </Tooltip>
  ),
};

export const LongContent: Story = {
  args: {
    content: '95% confidence interval for worst-case 1-day portfolio loss based on historical volatility.',
    children: 'VaR (95%)',
  },
};
