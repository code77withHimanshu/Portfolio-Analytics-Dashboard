import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { StalenessProvider } from '@/context/StalenessContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { router } from './router';

export function App() {
  return (
    <ThemeProvider>
      <StalenessProvider>
        <PortfolioProvider>
          <RouterProvider router={router} />
        </PortfolioProvider>
      </StalenessProvider>
    </ThemeProvider>
  );
}
