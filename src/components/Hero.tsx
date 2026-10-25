import React from 'react';
import { ArrowRight, MessageCircle, MapPin, BadgeCheck, ShieldCheck } from 'lucide-react';
import { StoreConfig } from '../types';

interface HeroProps {
  storeConfig: StoreConfig;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ storeConfig, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-3 pb-8 sm:pt-6 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Showcase with Brand Navy Background & Logo Accent Overlays */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0E0A3C] min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center shadow-2xl border border-[#1E1868]">
          {/* Authentic Warm Lifestyle Photography */}
          <img
            src="images/hero_living.jpg"
            alt="Warm sunlit living space with natural furnishings and home merchandise"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
            loading="eager"
          />

          {/* Logo Accent Color & Logo Background Gradient Overlays */}
          {/* 1. Left-to-right deep brand navy vignette providing pristine text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070422] via-[#0A072E]/92 to-[#1668FF]/15 sm:w-3/5 lg:w-7/12" />

          {/* 2. Logo Accent Colors Ambient Glow: Electric Cyan to Royal Blue Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,_rgba(0,212,255,0.22)_0%,_rgba(22,104,255,0.18)_35%,_transparent_65%)] pointer-events-none" />

          {/* 3. Mobile Gradient to guarantee text clarity on small displays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070422] via-[#0A072E]/85 to-transparent sm:hidden" />

          {/* Clean, Welcoming Hero Content */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-10 sm:py-14 max-w-xl text-left">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#00D4FF] font-bold block mb-3 drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]">
              Greater Path Mall, Dopemu &middot; Lagos
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-[-0.04em] leading-[1.06] sm:leading-[1.08] mb-6 drop-shadow-md">
              Thoughtful pieces for a <span className="italic text-[#00D4FF]">welcoming home.</span>
            </h1>

            {/* Simple, Mature Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#00D4FF] text-[#070422] text-xs uppercase tracking-wider font-extrabold hover:bg-[#38BDF8] shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer"
              >
                <span>Shop Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#070422] stroke-[2.5]" />
              </button>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Sunrise Legacy Interior, I would like to enquire about your homeware and merchandise collection.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#120E48]/90 via-[#181358]/85 to-[#120E48]/90 hover:from-[#181358] hover:to-[#1e176c] text-white border border-white/[0.12] hover:border-[#00D4FF]/60 text-xs uppercase tracking-wider font-bold transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] backdrop-blur-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#00D4FF]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Subtle Reassurance Details */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] text-[#CBD5E1]">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Showroom: Greater Path Mall, Dopemu</span>
              </span>
              <span className="text-[#64748B]">&middot;</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Nationwide Safe Delivery</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3-Point Store Value Strip below Hero in Brand Navy/Cyan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D4FF]/40 transition-all flex items-center gap-3.5 text-left shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-[#00D4FF] flex items-center justify-center shrink-0 border border-white/[0.1] shadow-inner">
              <BadgeCheck className="w-4.5 h-4.5 text-[#00D4FF]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Inspected Quality Stock</span>
              <span className="text-[11px] text-[#94A3B8] font-light">Cookware, bedding, fabrics, lighting, electronics &amp; apparel</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D4FF]/40 transition-all flex items-center gap-3.5 text-left shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-[#00D4FF] flex items-center justify-center shrink-0 border border-white/[0.1] shadow-inner">
              <MapPin className="w-4.5 h-4.5 text-[#00D4FF]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Visit Our Showroom</span>
              <span className="text-[11px] text-[#94A3B8] font-light">Open Monday &ndash; Saturday at Greater Path Mall, Dopemu</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00D4FF]/40 transition-all flex items-center gap-3.5 text-left shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] text-[#00D4FF] flex items-center justify-center shrink-0 border border-white/[0.1] shadow-inner">
              <MessageCircle className="w-4.5 h-4.5 text-[#00D4FF]" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">WhatsApp Shopping Support</span>
              <span className="text-[11px] text-[#94A3B8] font-light">Fast check on stock, specifications &amp; same-day dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
