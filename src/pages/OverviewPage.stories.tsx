import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { OverviewPage } from './OverviewPage';
import { ThemeProvider } from '@/context/ThemeContext';
import { StalenessProvider } from '@/context/StalenessContext';
import { PortfolioProvider } from '@/context/PortfolioContext';

const meta = {
  title: 'Pages/OverviewPage',
  component: OverviewPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <StalenessProvider>
            <PortfolioProvider>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
                <Story />
              </div>
            </PortfolioProvider>
          </StalenessProvider>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof OverviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
