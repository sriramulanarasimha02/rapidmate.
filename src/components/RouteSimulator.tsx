import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Bike, Navigation, Package, Truck } from 'lucide-react';
import type { CopyBundle } from '../i18n';
import type { VehicleType } from './TapDispatchCanvas';

export interface RouteCoord {
  x: number;
  y: number;
}

interface ParisLandmark {
  name: string;
  x: number;
  y: number;
}

const LANDMARKS: ParisLandmark[] = [
  { name: 'La Défense', x: 14, y: 24 },
  { name: 'Opéra', x: 44, y: 31 },
  { name: 'Le Marais', x: 64, y: 46 },
  { name: 'Bastille', x: 76, y: 54 },
  { name: 'Montparnasse', x: 37, y: 72 },
  { name: 'Station F', x: 79, y: 79 },
];

const PRESETS: Array<{ label: string; pickup: RouteCoord; dropoff: RouteCoord }> = [
  { label: 'Opéra → Station F', pickup: { x: 44, y: 31 }, dropoff: { x: 79, y: 79 } },
  { label: 'La Défense → Le Marais', pickup: { x: 14, y: 24 }, dropoff: { x: 64, y: 46 } },
  { label: 'Montparnasse → Bastille', pickup: { x: 37, y: 72 }, dropoff: { x: 76, y: 54 } },
];

interface RouteSimulatorProps {
  copy: CopyBundle['sim'];
  vehicle: VehicleType;
  onVehicleChange: (v: VehicleType) => void;
  onDispatchRoute: (summary: {
    pickupName: string;
    dropoffName: string;
    distanceKm: number;
    quoteEur: number;
    etaMin: number;
    vehicle: VehicleType;
  }) => void;
}

function nearestLandmark(pt: RouteCoord): string {
  let best = LANDMARKS[0];
  let bestD = Infinity;
  for (const lm of LANDMARKS) {
    const d = Math.hypot(lm.x - pt.x, lm.y - pt.y);
    if (d < bestD) {
      bestD = d;
      best = lm;
    }
  }
  return best.name;
}

export function RouteSimulator({
  copy,
  vehicle,
  onVehicleChange,
  onDispatchRoute,
}: RouteSimulatorProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dropPinRef = useRef<HTMLButtonElement | null>(null);

  const [pickup, setPickup] = useState<RouteCoord>({ x: 30, y: 34 });
  const [dropoff, setDropoff] = useState<RouteCoord>({ x: 73, y: 69 });
  const [dragging, setDragging] = useState<'pickup' | 'dropoff' | null>(null);

  const metrics = useMemo(() => {
    const dx = (dropoff.x - pickup.x) * 0.14;
    const dy = (dropoff.y - pickup.y) * 0.11;
    const rawDist = Math.hypot(dx, dy);
    const distanceKm = Math.max(1.2, Number((rawDist * 1.24).toFixed(1)));

    const rates: Record<
      VehicleType,
      { base: number; perKm: number; speedKmh: number; co2PerKm: number }
    > = {
      moto: { base: 7.5, perKm: 1.55, speedKmh: 28, co2PerKm: 0.21 },
      cargo: { base: 8.2, perKm: 1.4, speedKmh: 21, co2PerKm: 0.28 },
      van: { base: 19.0, perKm: 2.35, speedKmh: 20, co2PerKm: 0.34 },
    };

    const r = rates[vehicle];
    const quoteEur = Number((r.base + distanceKm * r.perKm).toFixed(2));
    const etaMin = Math.max(11, Math.min(48, Math.round((distanceKm / r.speedKmh) * 60 + 8)));
    const co2Kg = Number((distanceKm * r.co2PerKm).toFixed(2));

    return {
      distanceKm,
      quoteEur,
      etaMin,
      co2Kg,
      pickupName: nearestLandmark(pickup),
      dropoffName: nearestLandmark(dropoff),
    };
  }, [pickup, dropoff, vehicle]);

  const [countdownSec, setCountdownSec] = useState(metrics.etaMin * 60);

  useEffect(() => {
    setCountdownSec(metrics.etaMin * 60);
  }, [metrics.etaMin, pickup.x, pickup.y, dropoff.x, dropoff.y, vehicle]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdownSec((prev) => (prev > 1 ? prev - 1 : metrics.etaMin * 60));
    }, 1000);
    return () => window.clearInterval(id);
  }, [metrics.etaMin]);

  const updateMarkerFromPointer = (clientX: number, clientY: number, which: 'pickup' | 'dropoff') => {
    const el = mapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(12, Math.min(88, ((clientY - rect.top) / rect.height) * 100));
    const next = { x: Number(xPct.toFixed(1)), y: Number(yPct.toFixed(1)) };
    if (which === 'pickup') setPickup(next);
    else setDropoff(next);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateMarkerFromPointer(e.clientX, e.clientY, dragging);
  };

  const handlePointerUp = () => {
    setDragging(null);
  };

  const formatCountdown = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleDispatchClick = () => {
    if (dropPinRef.current) {
      const rect = dropPinRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('rapidmate:dispatch', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            vehicle,
          },
        }),
      );
    }
    onDispatchRoute({
      pickupName: metrics.pickupName,
      dropoffName: metrics.dropoffName,
      distanceKm: metrics.distanceKm,
      quoteEur: metrics.quoteEur,
      etaMin: metrics.etaMin,
      vehicle,
    });
  };

  const midX = (pickup.x + dropoff.x) / 2;
  const midY = (pickup.y + dropoff.y) / 2 - Math.abs(dropoff.x - pickup.x) * 0.16;

  return (
    <div
      data-no-dispatch="true"
      className="glass-dark rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-2xl text-white"
    >
      {/* Top Simulator Header + Vehicle Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <h2 className="font-display text-sm font-semibold text-white tracking-tight">
            {copy.headerTitle}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">{copy.dragHint}</p>
        </div>

        <div
          role="tablist"
          aria-label="Vehicle type"
          className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#1d1e26] border border-white/10"
        >
          {(
            [
              { id: 'moto', Icon: Navigation },
              { id: 'cargo', Icon: Bike },
              { id: 'van', Icon: Truck },
            ] as const
          ).map(({ id, Icon }) => {
            const active = vehicle === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onVehicleChange(id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#FFD000] text-[#111111] font-bold'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.vehicles[id].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Paris Map Canvas */}
      <div
        ref={mapRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative my-4 h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-[#16171d] border border-white/10 select-none touch-none"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <pattern id="parisGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.25"
              />
            </pattern>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD000" />
              <stop offset="100%" stopColor="#FF1493" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" fill="url(#parisGrid)" />

          <ellipse
            cx="50"
            cy="52"
            rx="43"
            ry="38"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.4"
            strokeDasharray="1.5 1.5"
          />

          <path
            d="M 4 64 C 22 48, 42 46, 58 55 C 72 63, 84 74, 98 85"
            fill="none"
            stroke="rgba(255, 208, 0, 0.16)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d={`M ${pickup.x} ${pickup.y} Q ${midX} ${midY} ${dropoff.x} ${dropoff.y}`}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d={`M ${pickup.x} ${pickup.y} Q ${midX} ${midY} ${dropoff.x} ${dropoff.y}`}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="1.35"
            strokeDasharray="2.5 2.5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="20"
              to="0"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {LANDMARKS.map((lm) => (
          <div
            key={lm.name}
            style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/30 mx-auto" />
            <span className="block text-[10px] text-zinc-400 font-medium whitespace-nowrap mt-1">
              {lm.name}
            </span>
          </div>
        ))}

        {/* Draggable Pickup Marker (A) - Brand Yellow */}
        <button
          type="button"
          aria-label={copy.pickup}
          onPointerDown={(e) => {
            e.stopPropagation();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            setDragging('pickup');
          }}
          style={{ left: `${pickup.x}%`, top: `${pickup.y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111111]/95 border border-[#FFD000] text-xs font-semibold text-white shadow-lg cursor-grab active:cursor-grabbing transition-transform ${
            dragging === 'pickup' ? 'scale-110 ring-2 ring-[#FFD000]/45' : 'hover:scale-105'
          }`}
        >
          <span className="w-4 h-4 rounded bg-[#FFD000] text-[#111111] font-mono-tabular text-[10px] font-bold flex items-center justify-center">
            A
          </span>
          <span className="whitespace-nowrap text-[11px]">{metrics.pickupName}</span>
        </button>

        {/* Draggable Dropoff Marker (B) - Hot Magenta */}
        <button
          ref={dropPinRef}
          type="button"
          aria-label={copy.dropoff}
          onPointerDown={(e) => {
            e.stopPropagation();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            setDragging('dropoff');
          }}
          style={{ left: `${dropoff.x}%`, top: `${dropoff.y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111111]/95 border border-[#FF1493] text-xs font-semibold text-white shadow-lg cursor-grab active:cursor-grabbing transition-transform ${
            dragging === 'dropoff' ? 'scale-110 ring-2 ring-[#FF1493]/45' : 'hover:scale-105'
          }`}
        >
          <span className="w-4 h-4 rounded bg-[#E91E63] text-white font-mono-tabular text-[10px] font-bold flex items-center justify-center">
            B
          </span>
          <span className="whitespace-nowrap text-[11px]">{metrics.dropoffName}</span>
        </button>
      </div>

      {/* Quick Preset Route Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-zinc-400 mr-1">{copy.presetsLabel}:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setPickup(preset.pickup);
              setDropoff(preset.dropoff);
            }}
            className="text-xs text-zinc-200 hover:text-[#FFD000] bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-md px-2.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Live Calculated Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
        <div className="bg-[#1a1b22] rounded-xl p-3 border border-white/[0.06]">
          <div className="text-[11px] text-zinc-400">{copy.distance}</div>
          <div className="font-mono-tabular text-base font-semibold text-white mt-0.5">
            {metrics.distanceKm.toFixed(1)} km
          </div>
        </div>

        <div className="bg-[#1a1b22] rounded-xl p-3 border border-white/[0.06]">
          <div className="text-[11px] text-zinc-400">{copy.quote}</div>
          <div className="font-mono-tabular text-base font-semibold text-[#FFD000] mt-0.5">
            {metrics.quoteEur.toFixed(2).replace('.', ',')} €
          </div>
        </div>

        <div className="bg-[#1a1b22] rounded-xl p-3 border border-white/[0.06]">
          <div className="text-[11px] text-zinc-400">{copy.countdown}</div>
          <div className="font-mono-tabular text-base font-semibold text-[#FF4D94] mt-0.5">
            {formatCountdown(countdownSec)}
          </div>
        </div>

        <div className="bg-[#1a1b22] rounded-xl p-3 border border-white/[0.06]">
          <div className="text-[11px] text-zinc-400">{copy.co2}</div>
          <div className="font-mono-tabular text-base font-semibold text-zinc-100 mt-0.5">
            -{metrics.co2Kg} kg
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDispatchClick}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#E91E63] hover:bg-[#FF1493] text-white font-semibold text-sm py-3 px-5 glow-pink transition-all active:scale-[0.99] cursor-pointer whitespace-nowrap"
      >
        <Package className="w-4 h-4" aria-hidden="true" />
        <span>{copy.dispatchBtn}</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
