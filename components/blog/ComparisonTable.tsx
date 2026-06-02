/**
 * Renders a responsive comparison table from MDX.
 *
 * Usage in MDX:
 * <ComparisonTable
 *   headers={["Feature", "Stringer Pallet", "Block Pallet"]}
 *   rows={[
 *     ["Weight", "40-50 lbs", "50-60 lbs"],
 *     ["Lifespan", "3-5 years", "7-10 years"],
 *     ["Cost", "$12-18", "$22-35"],
 *   ]}
 * />
 */

interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
  className?: string;
}

export default function ComparisonTable({ headers, rows, caption, className = '' }: ComparisonTableProps) {
  return (
    <figure className={`my-10 overflow-x-auto rounded-xl border border-slate-200 ${className}`}>
      <table className="w-full text-left text-sm">
        {caption && <caption className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 border-b">{caption}</caption>}
        <thead>
          <tr className="bg-slate-100">
            {headers.map((h, i) => (
              <th key={i} className={`px-6 py-3 font-bold text-slate-700 ${i === 0 ? '' : 'text-center'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-6 py-3 ${ci === 0 ? 'font-semibold text-slate-800' : 'text-center text-slate-600'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}