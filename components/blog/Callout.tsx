/**
 * Callout box for pulling quotes, tips, or key takeaways inline.
 *
 * Usage in MDX:
 * <Callout type="tip">Always pre-heat the heat treatment chamber before loading pallets.</Callout>
 * <Callout type="warning">Stacking beyond 6 pallets high violates OSHA warehouse safety standards.</Callout>
 * <Callout type="quote">We've been doing pallets for 24 years — you learn a few things.</Callout>
 */

import type { ReactNode } from 'react';

interface CalloutProps {
  type?: 'tip' | 'warning' | 'quote' | 'info';
  children: ReactNode;
  className?: string;
}

const styles = {
  tip: 'border-l-emerald-500 bg-emerald-50 text-emerald-900',
  warning: 'border-l-amber-500 bg-amber-50 text-amber-900',
  quote: 'border-l-slate-400 bg-slate-50 text-slate-700 italic',
  info: 'border-l-blue-500 bg-blue-50 text-blue-900',
};

const icons = {
  tip: '💡',
  warning: '⚠️',
  quote: '❝',
  info: 'ℹ️',
};

const labels = {
  tip: 'Tip',
  warning: 'Important',
  quote: '',
  info: 'Note',
};

export default function Callout({ type = 'info', children, className = '' }: CalloutProps) {
  const icon = icons[type];
  const label = labels[type];

  return (
    <aside className={`my-8 border-l-4 rounded-r-lg px-6 py-5 ${styles[type]} ${className}`}>
      {(label || icon) && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{icon}</span>
          {label && <span className="text-xs font-bold uppercase tracking-widest opacity-60">{label}</span>}
        </div>
      )}
      <div className="text-[15px] leading-relaxed">{children}</div>
    </aside>
  );
}