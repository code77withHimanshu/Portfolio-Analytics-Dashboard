import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Skeleton } from '@/components/ui/Skeleton';

const OverviewPage = lazy(() =>
  import('@/pages/OverviewPage').then((m) => ({ default: m.OverviewPage }))
);
const PositionsPage = lazy(() =>
  import('@/pages/PositionsPage').then((m) => ({ default: m.PositionsPage }))
);
const PerformancePage = lazy(() =>
  import('@/pages/PerformancePage').then((m) => ({ default: m.PerformancePage }))
);
const AllocationPage = lazy(() =>
  import('@/pages/AllocationPage').then((m) => ({ default: m.AllocationPage }))
);
const RiskPage = lazy(() =>
  import('@/pages/RiskPage').then((m) => ({ default: m.RiskPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function PageLoader() {
  return (
    <div className="p-6 space-y-4" aria-label="Page loading" aria-busy="true">
      <Skeleton variant="text" className="w-1/4 h-7" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-28" />
        ))}
      </div>
      <Skeleton variant="chart" className="h-72" />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell><Suspense fallback={<PageLoader />}><OverviewPage /></Suspense></AppShell>,
  },
  {
    path: '/positions',
    element: <AppShell><Suspense fallback={<PageLoader />}><PositionsPage /></Suspense></AppShell>,
  },
  {
    path: '/performance',
    element: <AppShell><Suspense fallback={<PageLoader />}><PerformancePage /></Suspense></AppShell>,
  },
  {
    path: '/allocation',
    element: <AppShell><Suspense fallback={<PageLoader />}><AllocationPage /></Suspense></AppShell>,
  },
  {
    path: '/risk',
    element: <AppShell><Suspense fallback={<PageLoader />}><RiskPage /></Suspense></AppShell>,
  },
  {
    path: '*',
    element: <AppShell><Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense></AppShell>,
  },
]);
