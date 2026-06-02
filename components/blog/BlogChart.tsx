'use client';

import { useEffect, useRef } from 'react';

// Lazy-load Chart.js from CDN to avoid bundle bloat
// Only loads when a BlogChart is actually rendered on the page

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

interface BlogChartProps {
  type?: 'bar' | 'line' | 'doughnut' | 'pie';
  data: ChartData;
  title?: string;
  height?: number;
  className?: string;
}

export default function BlogChart({
  type = 'bar',
  data,
  title,
  height = 320,
  className = '',
}: BlogChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function render() {
      if (!canvasRef.current) return;
      const Chart = (await import('chart.js/auto')).default;

      if (!mounted) return;
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { padding: 20, usePointStyle: true, font: { size: 12 } },
            },
            title: title
              ? { display: true, text: title, font: { size: 16, weight: 'bold' }, padding: { bottom: 20 } }
              : undefined,
          },
          scales:
            type === 'bar' || type === 'line'
              ? {
                  y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                  x: { grid: { display: false } },
                }
              : undefined,
        },
      });
    }

    render();
    return () => {
      mounted = false;
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [type, data, title]);

  return (
    <figure className={`my-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <div style={{ height: `${height}px`, position: 'relative' }}>
        <canvas ref={canvasRef} />
      </div>
      {title && <figcaption className="text-center text-sm text-slate-500 mt-3">{title}</figcaption>}
    </figure>
  );
}
