import { useState } from 'react';
import { ArrowUpRight, Bike, Check, Code2, Copy, Navigation, Truck } from 'lucide-react';
import motoImg from '../assets/images/rapidmate_moto_courier_1794590634888.jpg';
import cargoImg from '../assets/images/rapidmate_cargo_bike_1794590635541.jpg';
import vanImg from '../assets/images/rapidmate_electric_van_1794590634257.jpg';
import type { CopyBundle } from '../i18n';
import type { VehicleType } from './TapDispatchCanvas';

interface BentoServicesProps {
  copy: CopyBundle['services'];
  onSelectVehicle: (vehicle: VehicleType) => void;
}

const API_SNIPPETS = {
  quote: {
    label: 'POST /v1/quotes',
    code: `{
  "pickup": "14 Rue Scribe, 75009 Paris",
  "dropoff": "5 Parvis Alan Turing, 75013 Paris",
  "vehicle": "moto_electric",
  "weight_kg": 4.2
}
// Response 200 OK -> { "fare_eur": 14.90, "eta_min": 24 }`,
  },
  dispatch: {
    label: 'POST /v1/dispatches',
    code: `{
  "quote_id": "qt_par_9821f",
  "recipient_phone": "+33612345678",
  "require_pin": true
}
// Response 201 Created -> { "courier": "RM-409", "track_url": "https://track.rapidmate.fr/9821f" }`,
  },
  webhook: {
    label: 'WEBHOOK proof.signed',
    code: `{
  "event": "delivery.completed",
  "dispatch_id": "dsp_par_7741a",
  "delivered_at": "2026-11-13T17:42:09Z",
  "proof_photo_sha256": "8f91c2b..."
}`,
  },
} as const;

type ApiTab = keyof typeof API_SNIPPETS;

export function BentoServices({ copy, onSelectVehicle }: BentoServicesProps) {
  const [apiTab, setApiTab] = useState<ApiTab>('quote');
  const [copied, setCopied] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(API_SNIPPETS[apiTab].code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const scrollToHeroSimulator = (vehicle: VehicleType) => {
    onSelectVehicle(vehicle);
    const el = document.getElementById('hero-simulator');
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="services" className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-bold tracking-wide text-[#C2185B] mb-3">{copy.eyebrow}</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] text-balance">
          {copy.title}
        </h2>
        <p className="text-zinc-600 text-base mt-4 leading-relaxed">{copy.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Express Moto (col-span-2, Dark Charcoal Photo Card) */}
        <article className="md:col-span-2 group relative rounded-2xl overflow-hidden bg-[#111111] border border-[#111111]/15 hover:border-[#E91E63] transition-colors min-h-[340px] flex flex-col justify-end shadow-lg">
          {!imgErrors.moto ? (
            <img
              src={motoImg}
              alt="Coursier moto électrique Rapidmate à Paris"
              referrerPolicy="no-referrer"
              onError={() => setImgErrors((p) => ({ ...p, moto: true }))}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1b1b22] via-[#111111] to-[#26121b] flex items-center justify-center">
              <Navigation className="w-14 h-14 text-[#FFD000]/40" aria-hidden="true" />
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/75 to-black/20"
          />
          <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-lg">
              <p className="text-xs font-mono-tabular font-semibold text-[#FFD000] mb-2">
                {copy.items.moto.num}
              </p>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {copy.items.moto.title}
              </h3>
              <p className="text-sm text-zinc-200 mt-2 leading-relaxed">{copy.items.moto.desc}</p>
              <p className="text-xs text-zinc-400 mt-3">{copy.items.moto.specs}</p>
            </div>
            <button
              type="button"
              onClick={() => scrollToHeroSimulator('moto')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FFD000] text-[#111111] text-xs font-bold hover:bg-[#FFC107] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-end"
            >
              <span>{copy.items.moto.action}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Card 2: Eco-Cargo Bike (col-span-1, Dark Charcoal Photo Card) */}
        <article className="md:col-span-1 group relative rounded-2xl overflow-hidden bg-[#111111] border border-[#111111]/15 hover:border-[#E91E63] transition-colors min-h-[340px] flex flex-col justify-end shadow-lg">
          {!imgErrors.cargo ? (
            <img
              src={cargoImg}
              alt="Vélo-cargo électrique zéro émission sur les quais de Paris"
              referrerPolicy="no-referrer"
              onError={() => setImgErrors((p) => ({ ...p, cargo: true }))}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1b1b22] via-[#111111] to-[#241c09] flex items-center justify-center">
              <Bike className="w-14 h-14 text-[#FFD000]/40" aria-hidden="true" />
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-black/25"
          />
          <div className="relative z-10 p-6">
            <p className="text-xs font-mono-tabular font-semibold text-[#FF4D94] mb-2">
              {copy.items.cargo.num}
            </p>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              {copy.items.cargo.title}
            </h3>
            <p className="text-sm text-zinc-200 mt-2 leading-relaxed">{copy.items.cargo.desc}</p>
            <p className="text-xs text-zinc-400 mt-3">{copy.items.cargo.specs}</p>
            <button
              type="button"
              onClick={() => scrollToHeroSimulator('cargo')}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E91E63] hover:bg-[#FF1493] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{copy.items.cargo.action}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Card 3: Van & Utility Freight (col-span-1, Dark Charcoal Photo Card) */}
        <article className="md:col-span-1 group relative rounded-2xl overflow-hidden bg-[#111111] border border-[#111111]/15 hover:border-[#FFD000] transition-colors min-h-[340px] flex flex-col justify-end shadow-lg">
          {!imgErrors.van ? (
            <img
              src={vanImg}
              alt="Utilitaire électrique Rapidmate dans un hub logistique urbain"
              referrerPolicy="no-referrer"
              onError={() => setImgErrors((p) => ({ ...p, van: true }))}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#181920] via-[#111111] to-[#26121b] flex items-center justify-center">
              <Truck className="w-14 h-14 text-[#FF4D94]/40" aria-hidden="true" />
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/82 to-black/25"
          />
          <div className="relative z-10 p-6">
            <p className="text-xs font-mono-tabular font-semibold text-[#FFD000] mb-2">
              {copy.items.van.num}
            </p>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              {copy.items.van.title}
            </h3>
            <p className="text-sm text-zinc-200 mt-2 leading-relaxed">{copy.items.van.desc}</p>
            <p className="text-xs text-zinc-400 mt-3">{copy.items.van.specs}</p>
            <button
              type="button"
              onClick={() => scrollToHeroSimulator('van')}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#111111] hover:bg-[#FFD000] text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{copy.items.van.action}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </article>

        {/* Card 4: API & E-Commerce Fulfillment (col-span-2, Clean White Bento Card) */}
        <article
          id="tarifs"
          className="md:col-span-2 rounded-2xl bg-white border border-[#111111]/10 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="max-w-lg">
              <p className="text-xs font-mono-tabular font-semibold text-[#C2185B] mb-2">
                {copy.items.api.num}
              </p>
              <h3 className="font-display text-2xl font-bold text-[#111111] tracking-tight">
                {copy.items.api.title}
              </h3>
              <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{copy.items.api.desc}</p>
              <p className="text-xs text-zinc-500 mt-3">{copy.items.api.specs}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-[#111111]">
              <Code2 className="w-4 h-4 text-[#E91E63]" aria-hidden="true" />
              <span className="text-xs font-mono-tabular font-medium">REST · JSON · Webhooks</span>
            </div>
          </div>

          <div
            data-no-dispatch="true"
            className="rounded-xl bg-[#111111] border border-[#111111]/15 overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-white/10 bg-[#181920]">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(Object.keys(API_SNIPPETS) as ApiTab[]).map((tab) => {
                  const active = apiTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setApiTab(tab)}
                      className={`px-2.5 py-1 rounded text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#E91E63] text-white font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {API_SNIPPETS[tab].label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-zinc-300 hover:text-[#FFD000] hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#FFD000]" aria-hidden="true" />
                    <span className="text-[#FFD000]">{copy.items.api.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.items.api.copy}</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 text-xs font-mono-tabular text-zinc-100 overflow-x-auto leading-relaxed">
              <code>{API_SNIPPETS[apiTab].code}</code>
            </pre>
          </div>
        </article>
      </div>
    </section>
  );
}
