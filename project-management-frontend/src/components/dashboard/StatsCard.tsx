import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}) => {
  const iconBg = {
    primary: 'bg-primary-50 dark:bg-primary-900/30',
    success: 'bg-emerald-50 dark:bg-emerald-900/30',
    warning: 'bg-amber-50 dark:bg-amber-900/30',
    danger: 'bg-red-50 dark:bg-red-900/30',
  };

  const iconColor = {
    primary: 'text-primary-600 dark:text-primary-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
  };

  const changeColor = {
    primary: 'text-primary-600 dark:text-primary-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-500 dark:text-red-400',
  };

  const isPositive = !change.startsWith('-');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card border border-slate-200 dark:border-gray-700 p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide truncate">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
            {value}
          </p>
        </div>
        <div className={cn('p-2.5 rounded-lg flex-shrink-0 ml-3', iconBg[color])}>
          <Icon className={cn('h-5 w-5', iconColor[color])} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className={cn('text-xs font-semibold', isPositive ? changeColor[color] : 'text-slate-500 dark:text-gray-400')}>
          {isPositive ? '↑' : '↓'} {change.replace(/^[+-]/, '')}
        </span>
        <span className="text-xs text-slate-400 dark:text-gray-500">
          from last period
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
