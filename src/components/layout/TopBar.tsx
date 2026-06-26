import { RefreshCw, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { usePortfolio } from '@/context/PortfolioContext';

export function TopBar() {
  const { colorScheme, toggleTheme } = useTheme();
  const { refresh, isLoading } = usePortfolio();

  return (
    <header
      className="sticky top-0 z-40 h-14 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm"
      role="banner"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white hidden sm:block">
            Portfolio Analytics
          </span>
        </div>

        <div
          className="flex items-center gap-2"
          role="toolbar"
          aria-label="Dashboard controls"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={refresh}
            isLoading={isLoading}
            loadingText="Refreshing…"
            aria-label="Refresh portfolio data"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {colorScheme === 'light' ? (
              <Moon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Sun className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="global-status-announcer"
      />
    </header>
  );
}
