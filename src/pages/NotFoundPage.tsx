import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl font-bold text-slate-300 dark:text-slate-700" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm">
        The page you were looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center px-4 py-2 text-sm rounded-lg font-medium bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 transition-colors"
      >
        Back to Overview
      </Link>
    </main>
  );
}
