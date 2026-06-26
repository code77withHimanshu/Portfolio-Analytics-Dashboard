import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleGroup } from './ToggleGroup';
import type { TimeRange } from '@/types';

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

export const TimeRangeSelector: StoryObj = {
  render: () => {
    const [range, setRange] = useState<TimeRange>('1M');
    return (
      <ToggleGroup
        options={[
          { value: '1W', label: '1W' },
          { value: '1M', label: '1M' },
          { value: '3M', label: '3M' },
          { value: '1Y', label: '1Y' },
          { value: 'ALL', label: 'All' },
        ]}
        value={range}
        onChange={setRange}
        label="Select time range"
      />
    );
  },
};

export const TwoOptions: StoryObj = {
  render: () => {
    const [view, setView] = useState('sector');
    return (
      <ToggleGroup
        options={[
          { value: 'sector', label: 'By Sector' },
          { value: 'assetClass', label: 'By Asset Class' },
        ]}
        value={view}
        onChange={setView}
        label="Allocation view"
      />
    );
  },
};
