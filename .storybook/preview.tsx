import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/index.css';
import { ThemeProvider } from '../src/context/ThemeContext';
import { StalenessProvider } from '../src/context/StalenessContext';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <StalenessProvider>
          <div className="p-4 min-h-screen bg-slate-50 dark:bg-slate-900">
            <Story />
          </div>
        </StalenessProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
