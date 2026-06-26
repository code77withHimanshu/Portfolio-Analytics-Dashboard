import { useState, useRef, useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  return (
    <span className="relative inline-flex items-center">
      <span
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={id}
        tabIndex={0}
        className="inline-flex cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        aria-hidden={!visible}
        className={cn(
          'absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2',
          'px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
          'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
          'shadow-lg pointer-events-none',
          'transition-opacity duration-150',
          visible ? 'opacity-100' : 'opacity-0',
          className
        )}
      >
        {content}
        <span
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
