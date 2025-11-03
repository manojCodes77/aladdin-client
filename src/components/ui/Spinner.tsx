import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2 | 3; // 1 = small (16px), 2 = medium (24px), 3 = large (40px)
  color?: string;
}

const sizeClasses: Record<number, string> = {
  1: 'h-4 w-4 border-2',
  2: 'h-6 w-6 border-2',
  3: 'h-10 w-10 border-[3px]',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 2,
  color = '#02c4cb',
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-flex animate-spin rounded-full border-solid border-slate-200',
        sizeClasses[size],
        className
      )}
      style={{ borderTopColor: color }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';
