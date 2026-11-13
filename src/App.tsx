import { useCallback, useState } from 'react';
import { ArrowRight, Menu, Play, X } from 'lucide-react';
import { COPY, type Locale } from './i18n';
import { RapidmateLogo } from './components/RapidmateLogo';
import { TapDispatchCanvas, type VehicleType } from './components/TapDispatchCanvas';
import { RouteSimulator } from './components/RouteSimulator';
import { StatsTicker } from './components/StatsTicker';
import { BentoServices } from './components/BentoServices';
import { HowItWorks } from './components/HowItWorks';
import { SocialProofAndQuote } from './components/SocialProofAndQuote';
import { DispatchModal, type ModalState } from './components/DispatchModal';

export default function App() {
  const [locale, setLocale] = useState<Locale>('fr');
  const [activeVehicle, setActiveVehicle] = useState<VehicleType>('moto');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>({ type: 'closed' });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'ok' | 'err'>('idle');

  const t = COPY[locale];

  const launchFleetBurst = useCallback(() => {
    const coords = [
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.36, vehicle: 'moto' as VehicleType },
      { x: window.innerWidth * 0.62, y: window.innerHeight * 0.42, vehicle: 'cargo' as VehicleType },
      { x: window.innerWidth * 0.45, y: window.innerHeight * 0.64, vehicle: 'van' as VehicleType },
      { x: window.innerWidth * 0.78, y: window.innerHeight * 0.28, vehicle: 'moto' as VehicleType },
    ];
    coords.forEach((pt, idx) => {
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('rapidmate:dispatch', { detail: pt }));
      }, idx * 140);
    });
  }, []);

  const handleOpenDemo = () => {
    setModal({ type: 'demo' });
    launchFleetBurst();
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(newsletterEmail.trim())) {
      setNewsletterState('err');
      return;
    }
    setNewsletterState('ok');
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#111111] relative overflow-x-clip">
      {/* Global 60fps Tap-to-Dispatch Engine (Hot Magenta & Gold Trails) */}
      <TapDispatchCanvas dispatchLabel={t.dispatchLabel} activeVehicle={activeVehicle} />

      {/* Top Navigation Bar (Glassmorphism over Brand Yellow, 3-Zone Contract) */}
      <header className="sticky top-0 z-30 h-16 glass-header">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Custom Rapidmate Pin+Cap Logo */}
          <a href="#top" className="whitespace-nowrap shrink-0">
            <RapidmateLogo variant="on-yellow" />
          </a>

          {/* Zone 2: 4 Single-line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#111111]/80"
          >
            <a
              href="#services"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#tarifs"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.tarifs}
            </a>
            <a
              href="#entreprises"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.entreprises}
            </a>
            <a
              href="#contact"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Language Switcher (FR/EN) + Hot Magenta Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center p-0.5 rounded-lg bg-[#111111]/10 border border-[#111111]/15"
            >
              {(['fr', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocale(lang)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    locale === lang
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111]/75 hover:text-[#111111]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setModal({ type: 'booking', vehicle: activeVehicle })}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#E91E63] hover:bg-[#FF1493] text-white text-xs font-bold glow-pink transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.cta}
            </button>

            <button
              type="button"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-lg bg-[#111111] text-white flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFD000] border-t border-[#111111]/15 px-4 py-4 space-y-3 shadow-lg">
            <div className="flex flex-col gap-2 text-sm font-semibold text-[#111111]">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                {t.nav.services}
              </a>
              <a href="#tarifs" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                {t.nav.tarifs}
              </a>
              <a href="#entreprises" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                {t.nav.entreprises}
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                {t.nav.contact}
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setModal({ type: 'booking', vehicle: activeVehicle });
              }}
              className="w-full py-2.5 rounded-lg bg-[#E91E63] text-white text-xs font-bold cursor-pointer"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </header>

      <main id="top">
        {/* Vibrant Mustard/Gold Yellow Hero Section */}
        <section className="relative bg-gradient-to-br from-[#FFD000] via-[#FFD000] to-[#FFC107] pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
          {/* Subtle architectural dot grid on yellow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Hero Copy & Primary Actions */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-bold tracking-wide text-[#9D0E43] mb-4">
                {t.hero.kicker}
              </p>

              <h1
                className="font-display font-extrabold tracking-tight text-[#111111] text-balance leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.55rem)' }}
              >
                {t.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-[#111111]/85 mt-6 leading-relaxed max-w-xl font-medium">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setModal({ type: 'booking', vehicle: activeVehicle })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E91E63] hover:bg-[#FF1493] text-white font-bold text-sm glow-pink transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenDemo}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#111111] hover:bg-[#222229] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-[#FFD000]" aria-hidden="true" />
                  <span>{t.hero.ctaSecondary}</span>
                </button>
              </div>

              <p className="text-xs font-medium text-[#111111]/75 mt-5">{t.hero.tapHint}</p>
            </div>

            {/* Hero Interactive Live Route Simulator (Dark Charcoal Glass Card) */}
            <div id="hero-simulator" className="lg:col-span-6">
              <RouteSimulator
                copy={t.sim}
                vehicle={activeVehicle}
                onVehicleChange={setActiveVehicle}
                onDispatchRoute={(summary) =>
                  setModal({
                    type: 'booking',
                    pickup: summary.pickupName,
                    dropoff: summary.dropoffName,
                    quoteEur: summary.quoteEur,
                    etaMin: summary.etaMin,
                    vehicle: summary.vehicle,
                  })
                }
              />
            </div>
          </div>
        </section>

        {/* Live Stats Ticker (Deep Charcoal Band) */}
        <StatsTicker stats={t.stats} locale={locale} />

        {/* Asymmetric Bento Services Grid (Clean White + Charcoal Blend) */}
        <BentoServices copy={t.services} onSelectVehicle={setActiveVehicle} />

        {/* 3-Step How It Works Progression */}
        <HowItWorks copy={t.how} />

        {/* Social Proof & Enterprise Quote Form */}
        <SocialProofAndQuote
          proofCopy={t.proof}
          contactCopy={t.contact}
          vehiclesCopy={t.sim.vehicles}
          selectedVehicle={activeVehicle}
        />
      </main>

      {/* Deep Charcoal Footer with Rapidmate Pin+Cap Logo */}
      <footer className="border-t border-[#111111]/15 bg-[#111111] text-white py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <a href="#top" className="inline-flex items-center">
              <RapidmateLogo variant="on-dark" />
            </a>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">{t.footer.tagline}</p>

            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSubmit} noValidate className="pt-2 max-w-sm">
              <label
                htmlFor="footer-newsletter"
                className="block text-xs font-medium text-zinc-300 mb-2"
              >
                {t.footer.newsletterTitle}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterState !== 'idle') setNewsletterState('idle');
                  }}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="flex-1 min-w-0 rounded-lg bg-[#1a1b22] border border-white/15 focus:border-[#FFD000] focus:outline-none px-3 py-2 text-xs text-white placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#E91E63] hover:bg-[#FF1493] text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t.footer.newsletterBtn}
                </button>
              </div>
              {newsletterState === 'ok' && (
                <p className="text-xs text-[#FFD000] mt-1.5">{t.footer.newsletterSuccess}</p>
              )}
              {newsletterState === 'err' && (
                <p className="text-xs text-[#FF4D94] mt-1.5">{t.footer.newsletterError}</p>
              )}
            </form>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold text-white">
              {t.footer.linksTitle}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a href="#services" className="hover:text-[#FFD000] transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-[#FFD000] transition-colors">
                  {t.nav.tarifs}
                </a>
              </li>
              <li>
                <a href="#entreprises" className="hover:text-[#FFD000] transition-colors">
                  {t.nav.entreprises}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFD000] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display text-xs font-semibold text-white">
              {t.footer.legalTitle}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {t.footer.legalItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setModal({ type: 'legal', doc: item.id })}
                    className="hover:text-[#FFD000] transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/rapidmate-standalone.html"
                  download="rapidmate-standalone.html"
                  className="text-[#FFD000] hover:underline transition-colors inline-block pt-1"
                >
                  {t.footer.standaloneLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <span>{t.footer.copyright}</span>
          <div className="flex items-center gap-4">
            <a
              href="https://rapidmate.fr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              rapidmate.fr
            </a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="hover:text-white transition-colors">
              X / Twitter
            </a>
          </div>
        </div>
      </footer>

      <DispatchModal
        state={modal}
        onClose={() => setModal({ type: 'closed' })}
        locale={locale}
        copy={t}
        onLaunchFleetBurst={launchFleetBurst}
      />
    </div>
  );
}
