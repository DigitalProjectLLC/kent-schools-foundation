/**
 * Renders a big stat number with label — perfect for highlighting
 * key metrics inline within blog posts.
 *
 * Usage in MDX:
 * <StatCallout value="24+" label="Years in Business" />
 * <StatCallout value="$2.5M" label="Annual Savings for Clients" color="emerald" />
 */

interface StatCalloutProps {
  value: string;
  label: string;
  color?: 'slate' | 'emerald' | 'blue' | 'amber' | 'rose';
  className?: string;
}

const colors = {
  slate: 'bg-slate-50 border-slate-200 text-slate-900',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  blue: 'bg-blue-50 border-blue-200 text-blue-900',
  amber: 'bg-amber-50 border-amber-200 text-amber-900',
  rose: 'bg-rose-50 border-rose-200 text-rose-900',
};

const valueColors = {
  slate: 'text-slate-800',
  emerald: 'text-emerald-700',
  blue: 'text-blue-700',
  amber: 'text-amber-700',
  rose: 'text-rose-700',
};

export default function StatCallout({ value, label, color = 'blue', className = '' }: StatCalloutProps) {
  return (
    <div className={`inline-flex flex-col items-center justify-center rounded-2xl border-2 px-8 py-6 text-center min-w-[140px] ${colors[color]} ${className}`}>
      <span className={`text-3xl sm:text-4xl font-black tracking-tight ${valueColors[color]}`}>{value}</span>
      <span className="text-xs font-semibold uppercase tracking-widest mt-2 opacity-70">{label}</span>
    </div>
  );
}