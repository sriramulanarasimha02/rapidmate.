import { useState } from 'react';
import { ArrowLeft, ArrowRight, Bike, Clock, Flame, Navigation, UtensilsCrossed } from 'lucide-react';
import dominosImg from '../assets/images/partner_dominos_pizza_1795101445216.jpg';
import pizzahutImg from '../assets/images/partner_pizzahut_pan_1795101445502.jpg';
import yeleSushiImg from '../assets/images/partner_yele_sushi_1795101445478.jpg';
import cloudKitchenImg from '../assets/images/partner_cloud_kitchen_1795101445527.jpg';
import type { CopyBundle, PartnerCategory } from '../i18n';
import type { VehicleType } from './TapDispatchCanvas';

interface PartnersPageProps {
  copy: CopyBundle['partnersPage'];
  onBackHome: () => void;
  onBookPartnerFleet: (partnerName: string, vehicle: VehicleType) => void;
}

const PARTNER_IMAGES: Record<string, string> = {
  dominos: dominosImg,
  pizzahut: pizzahutImg,
  'yele-sushi': yeleSushiImg,
  'atelier-cloud': cloudKitchenImg,
};

export function PartnersPage({ copy, onBackHome, onBookPartnerFleet }: PartnersPageProps) {
  const [filter, setFilter] = useState<PartnerCategory>('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const visiblePartners =
    filter === 'all' ? copy.items : copy.items.filter((item) => item.category === filter);

  const showCollective = filter === 'all' || filter === 'cloud';

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#111111]">
      {/* Brand Yellow Partner Page Hero */}
      <section className="relative bg-gradient-to-br from-[#FFD000] via-[#FFD000] to-[#FFC107] py-12 sm:py-16 px-4 sm:px-6 border-b border-[#111111]/15">
        <div className="max-w-6xl mx-auto">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#9D0E43] transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{copy.backBtn}</span>
          </button>

          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wide text-[#9D0E43] mb-3">{copy.eyebrow}</p>
            <h1
              className="font-display font-extrabold tracking-tight text-[#111111] text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.1rem)' }}
            >
              {copy.title}
            </h1>
            <p className="text-base sm:text-lg text-[#111111]/85 mt-4 leading-relaxed font-medium">
              {copy.subtitle}
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter partner categories"
            className="mt-8 inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111111]/10 border border-[#111111]/15"
          >
            {copy.filters.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#111111]/80 hover:text-[#111111] hover:bg-white/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Brand Grid */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visiblePartners.map((partner) => {
            const imgSrc = PARTNER_IMAGES[partner.id];
            return (
              <article
                key={partner.id}
                className="group rounded-2xl overflow-hidden bg-white border border-[#111111]/10 shadow-sm hover:border-[#E91E63]/60 transition-colors flex flex-col justify-between"
              >
                {/* 4:3 Editorial Photo with Measured Scrim & Fallback */}
                <div className="relative aspect-[4/3] w-full bg-[#111111] overflow-hidden">
                  {imgSrc && !imgErrors[partner.id] ? (
                    <img
                      src={imgSrc}
                      alt={`${partner.name} express delivery partner`}
                      referrerPolicy="no-referrer"
                      onError={() => setImgErrors((p) => ({ ...p, [partner.id]: true }))}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1d1f27] to-[#111111] flex flex-col items-center justify-center gap-2 text-[#FFD000]">
                      <UtensilsCrossed className="w-10 h-10 opacity-75" aria-hidden="true" />
                      <span className="font-display text-sm font-bold text-white">
                        {partner.name}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-black/15 to-transparent"
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#FFD000]">{partner.meta}</p>
                      <h2 className="font-display text-2xl font-bold text-white tracking-tight mt-0.5">
                        {partner.name}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Concise Information & Fleet Action */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                  <p className="text-sm text-zinc-700 leading-relaxed">{partner.summary}</p>

                  <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-5 text-xs">
                      <div className="flex items-center gap-1.5 text-[#111111]">
                        <Clock className="w-3.5 h-3.5 text-[#E91E63]" aria-hidden="true" />
                        <span className="text-zinc-500">{copy.avgTimeLabel}:</span>
                        <span className="font-mono-tabular font-bold">{partner.avgTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#111111]">
                        {partner.vehicle === 'cargo' ? (
                          <Bike className="w-3.5 h-3.5 text-[#C2185B]" aria-hidden="true" />
                        ) : (
                          <Navigation className="w-3.5 h-3.5 text-[#C2185B]" aria-hidden="true" />
                        )}
                        <span className="font-semibold">{partner.fleet}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        window.dispatchEvent(
                          new CustomEvent('rapidmate:dispatch', {
                            detail: {
                              x: rect.left + rect.width / 2,
                              y: rect.top + rect.height / 2,
                              vehicle: partner.vehicle,
                            },
                          }),
                        );
                        onBookPartnerFleet(partner.name, partner.vehicle);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#E91E63] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{partner.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Cloud Kitchens Dark Charcoal Highlight Card */}
        {showCollective && (
          <div className="mt-6 rounded-2xl bg-[#111111] text-white border border-[#111111]/15 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFD000] mb-2">
                <Flame className="w-4 h-4 text-[#FF4D94]" aria-hidden="true" />
                <span>{copy.collectiveCard.meta}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {copy.collectiveCard.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed max-w-2xl">
                {copy.collectiveCard.summary}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {copy.collectiveCard.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-[#1a1b22] border border-white/10 p-3.5"
                  >
                    <div className="text-[11px] text-zinc-400">{s.label}</div>
                    <div className="font-mono-tabular text-sm font-bold text-[#FFD000] mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onBookPartnerFleet('Cloud Kitchen Hub', 'cargo')}
                className="w-full py-3 px-5 rounded-xl bg-[#E91E63] hover:bg-[#FF1493] text-white font-bold text-sm glow-pink transition-all cursor-pointer"
              >
                {copy.collectiveCard.cta}
              </button>
            </div>
          </div>
        )}

        {/* Partner Onboarding Banner */}
        <div className="mt-10 rounded-2xl bg-[#FFD000] border border-[#111111]/15 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111]">
              {copy.bottomBanner.title}
            </h3>
            <p className="text-sm text-[#111111]/80 mt-1.5 leading-relaxed">
              {copy.bottomBanner.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onBookPartnerFleet('Restaurant / Cloud Kitchen', 'moto')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#E91E63] text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{copy.bottomBanner.cta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
