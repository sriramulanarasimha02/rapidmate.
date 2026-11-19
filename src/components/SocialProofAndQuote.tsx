import { useState } from 'react';
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import type { CopyBundle } from '../i18n';
import type { VehicleType } from './TapDispatchCanvas';

interface SocialProofAndQuoteProps {
  proofCopy: CopyBundle['proof'];
  contactCopy: CopyBundle['contact'];
  vehiclesCopy: CopyBundle['sim']['vehicles'];
  selectedVehicle: VehicleType;
  onOpenPartners?: () => void;
}

export function SocialProofAndQuote({
  proofCopy,
  contactCopy,
  vehiclesCopy,
  selectedVehicle,
  onOpenPartners,
}: SocialProofAndQuoteProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState('');
  const [vehicle, setVehicle] = useState<VehicleType>(selectedVehicle);
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'phone' | 'route', string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<'name' | 'email' | 'phone' | 'route', string>> = {};

    if (name.trim().length < 2) {
      nextErrors.name = contactCopy.form.errors.name;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = contactCopy.form.errors.email;
    }
    if (!/^[+\d\s().-]{8,20}$/.test(phone.trim())) {
      nextErrors.phone = contactCopy.form.errors.phone;
    }
    if (route.trim().length < 4) {
      nextErrors.route = contactCopy.form.errors.route;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    window.dispatchEvent(
      new CustomEvent('rapidmate:dispatch', {
        detail: {
          x: Math.round(window.innerWidth * 0.72),
          y: Math.round(window.innerHeight * 0.55),
          vehicle,
        },
      }),
    );
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setRoute('');
    setErrors({});
  };

  const GuaranteeIcons = [Truck, Lock, ShieldCheck, Sparkles];

  return (
    <>
      {/* Social Proof & Guarantees */}
      <section
        id="entreprises"
        className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#111111]/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wide text-[#C2185B] mb-3">
              {proofCopy.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] text-balance">
              {proofCopy.title}
            </h2>
            <p className="text-zinc-600 text-base mt-4 leading-relaxed">{proofCopy.subtitle}</p>
          </div>
          {onOpenPartners && (
            <button
              type="button"
              onClick={onOpenPartners}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#E91E63] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 self-start md:self-end cursor-pointer"
            >
              <span>{proofCopy.partnersCta}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Attributable Testimonials (Clean White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {proofCopy.testimonials.map((t) => (
            <figure
              key={t.author}
              className="rounded-2xl bg-white border border-[#111111]/10 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm"
            >
              <div>
                <p className="text-xs font-mono-tabular font-semibold text-[#C2185B] mb-3">
                  {t.outcome}
                </p>
                <blockquote className="text-base sm:text-lg text-[#111111] leading-relaxed">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div>
                  <span className="font-semibold text-[#111111]">{t.author}</span>
                  <span className="text-zinc-400 mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-zinc-600">{t.role}</span>
                </div>
                <span className="text-xs font-semibold text-[#111111]">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Compliance & Security Guarantees (Dark Charcoal Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofCopy.guarantees.map((g, idx) => {
            const Icon = GuaranteeIcons[idx] ?? ShieldCheck;
            return (
              <div
                key={g.title}
                className="rounded-xl bg-[#111111] text-white border border-[#111111]/15 p-5"
              >
                <Icon className="w-5 h-5 text-[#FFD000] mb-3" aria-hidden="true" />
                <h3 className="font-display text-sm font-semibold text-white">{g.title}</h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{g.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise Quote & Instant Courier Form */}
      <section
        id="contact"
        className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#111111]/10"
      >
        <div className="rounded-2xl bg-[#FFD000] border border-[#111111]/15 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-xl">
          <div className="lg:col-span-5 flex flex-col justify-between text-[#111111]">
            <div>
              <p className="text-xs font-bold tracking-wide text-[#9D0E43] mb-3">
                {contactCopy.eyebrow}
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111] text-balance">
                {contactCopy.title}
              </h2>
              <p className="text-sm sm:text-base text-[#111111]/80 mt-4 leading-relaxed">
                {contactCopy.subtitle}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#111111]/15 space-y-2 text-sm text-[#111111] font-medium">
              <div>Paris Hub — 14 Rue de Turbigo, 75001 Paris</div>
              <div className="font-mono-tabular text-xs text-[#111111]/80">
                dispatch@rapidmate.fr · +33 1 86 95 42 10
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111111] text-white p-6 sm:p-8 border border-[#111111]/20 h-full">
              {submitted ? (
                <div className="h-full py-6 flex flex-col items-start justify-center">
                  <CheckCircle2 className="w-9 h-9 text-[#FFD000] mb-4" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-white">
                    {contactCopy.form.successTitle}
                  </h3>
                  <p className="text-sm text-zinc-300 mt-2 leading-relaxed max-w-md">
                    {contactCopy.form.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 px-4 py-2 rounded-lg bg-[#FFD000] text-[#111111] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {contactCopy.form.reset}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-zinc-300 mb-1.5"
                      >
                        {contactCopy.form.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={contactCopy.form.namePlaceholder}
                        className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-zinc-500"
                      />
                      {errors.name && <p className="text-xs text-[#FF4D94] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-zinc-300 mb-1.5"
                      >
                        {contactCopy.form.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={contactCopy.form.emailPlaceholder}
                        className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-zinc-500"
                      />
                      {errors.email && (
                        <p className="text-xs text-[#FF4D94] mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-zinc-300 mb-1.5"
                      >
                        {contactCopy.form.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={contactCopy.form.phonePlaceholder}
                        className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-zinc-500"
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#FF4D94] mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {contactCopy.form.vehicleLabel}
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#1a1b22] border border-white/15">
                        {(['moto', 'cargo', 'van'] as const).map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setVehicle(v)}
                            className={`py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                              vehicle === v
                                ? 'bg-[#FFD000] text-[#111111] font-bold'
                                : 'text-zinc-300 hover:text-white'
                            }`}
                          >
                            {vehiclesCopy[v].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-route"
                      className="block text-xs font-medium text-zinc-300 mb-1.5"
                    >
                      {contactCopy.form.routeLabel}
                    </label>
                    <input
                      id="contact-route"
                      type="text"
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      placeholder={contactCopy.form.routePlaceholder}
                      className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-4 py-2.5 text-sm text-white placeholder:text-zinc-500"
                    />
                    {errors.route && <p className="text-xs text-[#FF4D94] mt-1">{errors.route}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E91E63] hover:bg-[#FF1493] text-white font-semibold text-sm glow-pink transition-all active:scale-[0.99] cursor-pointer whitespace-nowrap"
                  >
                    {contactCopy.form.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
