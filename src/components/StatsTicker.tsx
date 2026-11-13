import { useEffect, useState } from 'react';
import type { CopyBundle, Locale } from '../i18n';

interface StatsTickerProps {
  stats: CopyBundle['stats'];
  locale: Locale;
}

export function StatsTicker({ stats, locale }: StatsTickerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1200;

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = window.requestAnimationFrame(frame);
    };

    raf = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const formatAnimated = (stat: CopyBundle['stats'][number]) => {
    if (!stat.numericTarget) return stat.value;
    const val = Math.round(stat.numericTarget * progress);
    const formatted =
      locale === 'fr' ? val.toLocaleString('fr-FR') : val.toLocaleString('en-US');
    return `${formatted}${stat.suffix ?? ''}`;
  };

  return (
    <section
      aria-label="Operational metrics"
      className="border-y border-[#111111]/15 bg-[#111111] text-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-9 sm:py-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1.5">
            <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {formatAnimated(stat)}
            </div>
            <div className="text-sm font-semibold text-[#FFD000]">{stat.label}</div>
            <p className="text-xs text-zinc-400 leading-relaxed">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
