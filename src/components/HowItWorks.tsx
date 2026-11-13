import { useState } from 'react';
import { CheckCircle2, MapPin, ShieldCheck, Zap } from 'lucide-react';
import type { CopyBundle } from '../i18n';

interface HowItWorksProps {
  copy: CopyBundle['how'];
}

export function HowItWorks({ copy }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0);
  const current = copy.steps[activeStep];

  const StepIcons = [Zap, MapPin, ShieldCheck];
  const ActiveIcon = StepIcons[activeStep] ?? Zap;

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#111111]/10">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-bold tracking-wide text-[#C2185B] mb-3">{copy.eyebrow}</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] text-balance">
          {copy.title}
        </h2>
        <p className="text-zinc-600 text-base mt-4 leading-relaxed">{copy.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive 3-Step Selector */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {copy.steps.map((step, idx) => {
            const active = idx === activeStep;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left rounded-2xl p-5 sm:p-6 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#FFD000] border-[#111111] shadow-md'
                    : 'bg-white border-[#111111]/10 hover:border-[#111111]/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono-tabular text-sm font-bold mt-0.5 shrink-0 ${
                      active ? 'text-[#C2185B]' : 'text-zinc-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#111111] tracking-tight">
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm mt-1.5 leading-relaxed ${
                        active ? 'text-[#111111]/85' : 'text-zinc-600'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Dark Charcoal Live Operational Preview Panel */}
        <div className="lg:col-span-6 flex">
          <div className="w-full rounded-2xl bg-[#111111] text-white border border-[#111111]/15 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E91E63]/15 border border-[#E91E63]/40 flex items-center justify-center text-[#FF4D94]">
                    <ActiveIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tabular text-[#FFD000]">{current.num}</p>
                    <h4 className="font-display text-lg font-semibold text-white">
                      {current.previewTitle}
                    </h4>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#FFD000] shrink-0" aria-hidden="true" />
              </div>

              <p className="text-sm text-zinc-300 mt-5">{current.previewSubtitle}</p>

              <div className="grid grid-cols-3 gap-2 mt-6">
                {copy.steps.map((s, i) => (
                  <div key={s.num} className="space-y-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-colors ${
                        i <= activeStep ? 'bg-[#E91E63]' : 'bg-white/15'
                      }`}
                    />
                    <span className="block text-[11px] font-mono-tabular text-zinc-400 truncate">
                      {s.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/10">
              {current.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl bg-[#1a1b22] border border-white/[0.08] p-3.5"
                >
                  <div className="text-xs text-zinc-400">{m.label}</div>
                  <div className="font-mono-tabular text-sm font-semibold text-[#FFD000] mt-1">
                    {m.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
