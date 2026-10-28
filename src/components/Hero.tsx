import React from 'react';
import { ArrowRight, MapPin, BadgeCheck, ShieldCheck, MessageCircle } from 'lucide-react';
import { StoreConfig } from '../types';

interface HeroProps {
  storeConfig: StoreConfig;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ storeConfig, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-3 pb-8 sm:pt-6 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Showcase with Clean Modern Frame & Soft Contrast Gradient */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center shadow-lg border border-slate-200">
          {/* Realistic Store Lifestyle Photography */}
          <img
            src="images/hero_realistic_home.jpg"
            alt="Warm modern home interior showcasing crystal chandelier, ceiling fan, granite cookware, and household appliances"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04]"
            loading="eager"
          />

          {/* Clean Left-to-Right Gradient providing crisp text contrast while showcasing imagery */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-transparent sm:w-3/5 lg:w-7/12" />

          {/* Mobile Overlay for maximum text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent sm:hidden" />

          {/* Hero Content */}
          <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-10 sm:py-14 max-w-xl text-left">
            <span className="text-[11px] uppercase tracking-[0.24em] text-blue-400 font-bold block mb-3">
              Greater Path Mall, Dopemu &middot; Lagos
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-[-0.035em] leading-[1.06] sm:leading-[1.08] mb-6">
              Thoughtful pieces for a <span className="italic text-blue-400 font-serif">welcoming home.</span>
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-xs uppercase tracking-wider font-extrabold hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-98"
              >
                <span>Shop Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              </button>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Sunrise Legacy Interior, I would like to enquire about your homeware and merchandise collection.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-slate-900 border border-white/20 hover:border-emerald-400 text-xs uppercase tracking-wider font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group active:scale-98"
              >
                <svg
                  className="w-4.5 h-4.5 fill-[#25D366] shrink-0 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Reassurance Details */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] text-slate-200">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Showroom: Greater Path Mall, Dopemu</span>
              </span>
              <span className="text-slate-400">&middot;</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Nationwide Safe Delivery</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3-Point Store Value Strip below Hero in Clean Modern White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-3.5 text-left shadow-xs hover:shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <BadgeCheck className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-900 block">Inspected Quality Stock</span>
              <span className="text-[11px] text-slate-500 font-normal">Cookware, bedding, fabrics, lighting, electronics &amp; apparel</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-3.5 text-left shadow-xs hover:shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <MapPin className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-900 block">Visit Our Showroom</span>
              <span className="text-[11px] text-slate-500 font-normal">Open Monday &ndash; Saturday at Greater Path Mall, Dopemu</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-3.5 text-left shadow-xs hover:shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <MessageCircle className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-900 block">WhatsApp Shopping Support</span>
              <span className="text-[11px] text-slate-500 font-normal">Fast check on stock, specifications &amp; same-day dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
