import type { ReactElement, ComponentType } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { StalenessProvider } from '@/context/StalenessContext';
import type { StalenessThresholds } from '@/types';

interface ProviderOptions {
  staleness?: Partial<StalenessThresholds>;
  initialEntries?: string[];
}

function createWrapper(
  staleness?: Partial<StalenessThresholds>,
  initialEntries: string[] = ['/']
): ComponentType<{ children: ReactElement }> {
  return function Wrapper({ children }: { children: ReactElement }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider>
          <StalenessProvider thresholds={staleness}>{children}</StalenessProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions & ProviderOptions = {}
) {
  const { staleness, initialEntries = ['/'], ...renderOptions } = options;
  return render(ui, {
    wrapper: createWrapper(staleness, initialEntries) as ComponentType,
    ...renderOptions,
  });
}
