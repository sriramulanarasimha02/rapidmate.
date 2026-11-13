import { useEffect, useState } from 'react';
import { CheckCircle2, Play, X } from 'lucide-react';
import type { CopyBundle, Locale } from '../i18n';
import type { VehicleType } from './TapDispatchCanvas';

export type ModalState =
  | { type: 'closed' }
  | {
      type: 'booking';
      pickup?: string;
      dropoff?: string;
      quoteEur?: number;
      etaMin?: number;
      vehicle?: VehicleType;
    }
  | { type: 'demo' }
  | { type: 'legal'; doc: 'mentions' | 'cgv' | 'rgpd' };

interface DispatchModalProps {
  state: ModalState;
  onClose: () => void;
  locale: Locale;
  copy: CopyBundle;
  onLaunchFleetBurst: () => void;
}

const LEGAL_TEXTS: Record<
  Locale,
  Record<'mentions' | 'cgv' | 'rgpd', { title: string; body: string[] }>
> = {
  fr: {
    mentions: {
      title: 'Mentions légales — Rapidmate SAS',
      body: [
        'Rapidmate SAS — Capital social : 120 000 € — RCS Paris B 914 582 103.',
        'Siège social : 14 Rue de Turbigo, 75001 Paris, France. TVA intracommunautaire : FR42914582103.',
        'Directeur de la publication : Direction Opérations Rapidmate France.',
      ],
    },
    cgv: {
      title: 'Conditions Générales de Vente & Transport (CGV)',
      body: [
        'Les tarifs affichés dans le simulateur sont exprimés en Euros HT et garantis dès validation du bordereau.',
        'Chaque course inclut une assurance marchandise Ad Valorem jusqu’à 50 000 € selon les plafonds transport urbain.',
        'Les délais indicatifs (< 35 min sur Paris intra-muros) s’entendent hors force majeure et restrictions préfectorales.',
      ],
    },
    rgpd: {
      title: 'Politique de confidentialité (RGPD)',
      body: [
        'Les données d’enlèvement, de livraison et les preuves photographiques sont hébergées exclusivement en France (ISO 27001).',
        'Les numéros de téléphone destinataires sont masqués automatiquement après remise du colis.',
        'Vous pouvez exercer vos droits d’accès et de suppression à dpo@rapidmate.fr.',
      ],
    },
  },
  en: {
    mentions: {
      title: 'Legal Notices — Rapidmate SAS',
      body: [
        'Rapidmate SAS — Share capital: €120,000 — Paris Trade Register B 914 582 103.',
        'Registered office: 14 Rue de Turbigo, 75001 Paris, France. EU VAT: FR42914582103.',
        'Publication Director: Rapidmate France Operations.',
      ],
    },
    cgv: {
      title: 'Terms of Carriage & Service (CGV)',
      body: [
        'Quotes displayed in the route simulator are stated in Euros excl. VAT and locked upon order confirmation.',
        'Each mission includes Ad Valorem cargo insurance up to €50,000 under French urban carrier regulations.',
        'Target delivery windows (< 35 min in central Paris) exclude force majeure events.',
      ],
    },
    rgpd: {
      title: 'Privacy Policy (GDPR / RGPD)',
      body: [
        'Pickup, dropoff, and timestamped proof-of-delivery records are hosted strictly in France (ISO 27001).',
        'Recipient phone numbers are masked automatically once delivery is signed.',
        'Exercise your GDPR rights anytime via dpo@rapidmate.fr.',
      ],
    },
  },
};

export function DispatchModal({
  state,
  onClose,
  locale,
  copy,
  onLaunchFleetBurst,
}: DispatchModalProps) {
  const [pickup, setPickup] = useState('Opéra, 75009 Paris');
  const [dropoff, setDropoff] = useState('Station F, 75013 Paris');
  const [vehicle, setVehicle] = useState<VehicleType>('moto');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (state.type === 'booking') {
      setPickup(state.pickup ? `${state.pickup}, Paris` : 'Opéra, 75009 Paris');
      setDropoff(state.dropoff ? `${state.dropoff}, Paris` : 'Station F, 75013 Paris');
      setVehicle(state.vehicle ?? 'moto');
      setConfirmed(false);
      setEmailErr('');
    }
  }, [state]);

  useEffect(() => {
    if (state.type === 'closed') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state.type, onClose]);

  if (state.type === 'closed') return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setEmailErr(copy.contact.form.errors.email);
      return;
    }
    setEmailErr('');
    setConfirmed(true);
    onLaunchFleetBurst();
  };

  return (
    <div
      data-no-dispatch="true"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[#111111] text-white border border-white/15 p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {state.type === 'booking' && (
          <>
            {confirmed ? (
              <div className="py-4">
                <CheckCircle2 className="w-10 h-10 text-[#FFD000] mb-4" aria-hidden="true" />
                <h3 className="font-display text-2xl font-bold text-white">
                  {copy.bookingModal.confirmedTitle}
                </h3>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                  {copy.bookingModal.confirmedBody}
                </p>
                <div className="mt-5 rounded-xl bg-[#1a1b22] border border-white/10 p-4 text-xs font-mono-tabular text-zinc-200 space-y-1">
                  <div>
                    {pickup} → {dropoff}
                  </div>
                  <div className="text-[#FFD000]">
                    {copy.sim.vehicles[vehicle].label} · {email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full py-2.5 rounded-xl bg-[#FFD000] text-[#111111] font-bold text-sm cursor-pointer"
                >
                  {copy.demoModal.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} noValidate className="space-y-4">
                <div className="pr-8">
                  <h3 className="font-display text-xl font-bold text-white">
                    {copy.bookingModal.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{copy.bookingModal.subtitle}</p>
                </div>

                {state.quoteEur && (
                  <div className="flex items-center justify-between rounded-xl bg-[#1a1b22] border border-[#FFD000]/40 px-4 py-3 text-xs font-mono-tabular">
                    <span className="text-zinc-200">
                      {copy.sim.vehicles[vehicle].label} · ETA ~{state.etaMin} min
                    </span>
                    <span className="text-[#FFD000] font-bold text-sm">
                      {state.quoteEur.toFixed(2).replace('.', ',')} € HT
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    {copy.bookingModal.pickupLabel}
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    required
                    className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    {copy.bookingModal.dropoffLabel}
                  </label>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    required
                    className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-zinc-300 mb-1">
                    {copy.bookingModal.vehicleLabel}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#1a1b22] border border-white/15">
                    {(['moto', 'cargo', 'van'] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVehicle(v)}
                        className={`py-2 rounded-lg text-xs font-medium cursor-pointer ${
                          vehicle === v
                            ? 'bg-[#FFD000] text-[#111111] font-bold'
                            : 'text-zinc-300 hover:text-white'
                        }`}
                      >
                        {copy.sim.vehicles[v].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    {copy.bookingModal.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operations@entreprise.fr"
                    className="w-full rounded-xl bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-3.5 py-2.5 text-sm text-white"
                  />
                  {emailErr && <p className="text-xs text-[#FF4D94] mt-1">{emailErr}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E91E63] hover:bg-[#FF1493] text-white font-semibold text-sm glow-pink cursor-pointer"
                >
                  {copy.bookingModal.confirm}
                </button>
              </form>
            )}
          </>
        )}

        {state.type === 'demo' && (
          <div className="space-y-5">
            <div className="pr-8">
              <h3 className="font-display text-xl font-bold text-white">{copy.demoModal.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{copy.demoModal.subtitle}</p>
            </div>

            <div className="space-y-3">
              {copy.demoModal.steps.map((s) => (
                <div
                  key={s.time}
                  className="rounded-xl bg-[#1a1b22] border border-white/[0.08] p-3.5 flex items-start gap-3"
                >
                  <span className="font-mono-tabular text-xs font-semibold text-[#FFD000] mt-0.5 shrink-0">
                    {s.time}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{s.event}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onLaunchFleetBurst}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#E91E63] hover:bg-[#FF1493] text-white font-semibold text-xs sm:text-sm cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.demoModal.replay}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium cursor-pointer"
              >
                {copy.demoModal.close}
              </button>
            </div>
          </div>
        )}

        {state.type === 'legal' && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-white pr-8">
              {LEGAL_TEXTS[locale][state.doc].title}
            </h3>
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              {LEGAL_TEXTS[locale][state.doc].body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-5 py-2 rounded-xl bg-[#FFD000] text-[#111111] text-xs font-bold cursor-pointer"
            >
              {copy.demoModal.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
