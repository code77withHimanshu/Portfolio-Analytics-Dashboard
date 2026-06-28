import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardTitle } from './Card';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Card>
      <CardHeader><CardTitle>Card Title</CardTitle></CardHeader>
      <CardBody><p className="text-slate-600 dark:text-slate-300">Card content goes here.</p></CardBody>
    </Card>
  ),
};

export const Stale: StoryObj = {
  render: () => (
    <Card isStale dataTimestamp={new Date(Date.now() - 10 * 60_000).toISOString()}>
      <CardHeader><CardTitle>Stale Data</CardTitle></CardHeader>
      <CardBody><p className="text-slate-600 dark:text-slate-300">This card has an amber border and stale badge.</p></CardBody>
    </Card>
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <Card>
      <CardHeader><Skeleton variant="text" className="w-1/3 h-5" /></CardHeader>
      <CardBody className="space-y-2">
        <Skeleton variant="text" lines={3} />
      </CardBody>
    </Card>
  ),
};

export const AsSection: StoryObj = {
  render: () => (
    <Card as="section" aria-labelledby="section-heading">
      <CardHeader><CardTitle id="section-heading">Section Card</CardTitle></CardHeader>
      <CardBody><p>Renders as a &lt;section&gt; landmark.</p></CardBody>
    </Card>
  ),
};
