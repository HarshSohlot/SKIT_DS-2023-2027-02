import React from 'react';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';

/**
 * Reusable Metric Stat Card for CareKart Dashboards
 * Part of Sprint 3 Web Dashboard Design
 */
export const StatCard = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  colorScheme = 'emerald',
  tooltip
}) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/60',
      badge: 'bg-emerald-100/80 text-emerald-800'
    },
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-200/60',
      badge: 'bg-teal-100/80 text-teal-800'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200/60',
      badge: 'bg-amber-100/80 text-amber-800'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200/60',
      badge: 'bg-blue-100/80 text-blue-800'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200/60',
      badge: 'bg-purple-100/80 text-purple-800'
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.emerald;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </span>
            {tooltip && (
              <span title={tooltip} className="cursor-help text-slate-400 hover:text-slate-600">
                <HelpCircle className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${scheme.bg} ${scheme.text}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          {subtitle}
        </span>
        {change && (
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold ${
              isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
