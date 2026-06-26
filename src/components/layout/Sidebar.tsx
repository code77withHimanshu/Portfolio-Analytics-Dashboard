import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, PieChart, List, Shield } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/positions', label: 'Positions', icon: List, end: false },
  { to: '/performance', label: 'Performance', icon: TrendingUp, end: false },
  { to: '/allocation', label: 'Allocation', icon: PieChart, end: false },
  { to: '/risk', label: 'Risk', icon: Shield, end: false },
];

export function Sidebar() {
  return (
    <nav
      className="hidden md:flex flex-col w-56 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-4 px-3 shrink-0"
      aria-label="Primary navigation"
    >
      <ul className="space-y-0.5" role="list">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      isActive ? 'text-brand-600 dark:text-brand-400' : ''
                    )}
                    aria-hidden="true"
                  />
                  <span aria-current={isActive ? 'page' : undefined}>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
