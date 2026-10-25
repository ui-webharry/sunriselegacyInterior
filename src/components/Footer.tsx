import React, { useState } from 'react';
import {
  ArrowUp,
  Send,
  Check,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  CreditCard,
  Bell,
} from 'lucide-react';
import { StoreConfig, ProductCategory } from '../types';

interface FooterProps {
  storeConfig: StoreConfig;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ storeConfig, onSelectCategory }) => {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterInput.trim()) {
      setSubscribed(true);
      // Format a direct WhatsApp VIP subscription
      const message = `Hello Sunrise Legacy Interior,\n\nI would like to subscribe to your new stock alerts, special prices, and showroom discounts.\n\nMy Contact: ${newsletterInput.trim()}`;
      window.open(
        `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
      setTimeout(() => {
        setNewsletterInput('');
        setSubscribed(false);
      }, 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05031D] text-[#F8FAFC] border-t border-[#1E1868] relative overflow-hidden">
      {/* Ambient background glow matching logo colors */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-[radial-gradient(ellipse_at_top,_rgba(0,212,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* Trust & Guarantee Banner (Optimized for all screen sizes) */}
      <div className="border-b border-[#1E1868]/70 bg-[#070422]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0E0A3C]/60 border border-[#1E1868]/60">
              <div className="w-10 h-10 rounded-xl bg-[#16105A] text-[#00D4FF] flex items-center justify-center shrink-0 border border-[#00D4FF]/30 shadow-inner">
                <MapPin className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">Walk-In Showroom</span>
                <span className="text-[11px] text-[#94A3B8] font-light block truncate">
                  Greater Path Mall, Dopemu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0E0A3C]/60 border border-[#1E1868]/60">
              <div className="w-10 h-10 rounded-xl bg-[#16105A] text-[#00D4FF] flex items-center justify-center shrink-0 border border-[#00D4FF]/30 shadow-inner">
                <Truck className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">Prompt Lagos Dispatch</span>
                <span className="text-[11px] text-[#94A3B8] font-light block truncate">
                  Same-day &amp; interstate courier
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0E0A3C]/60 border border-[#1E1868]/60">
              <div className="w-10 h-10 rounded-xl bg-[#16105A] text-[#00D4FF] flex items-center justify-center shrink-0 border border-[#00D4FF]/30 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">Tested Quality</span>
                <span className="text-[11px] text-[#94A3B8] font-light block truncate">
                  Genuine merchandise inspected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#0E0A3C]/60 border border-[#1E1868]/60">
              <div className="w-10 h-10 rounded-xl bg-[#16105A] text-[#00D4FF] flex items-center justify-center shrink-0 border border-[#00D4FF]/30 shadow-inner">
                <CreditCard className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">Flexible Payment</span>
                <span className="text-[11px] text-[#94A3B8] font-light block truncate">
                  Transfer, POS &amp; WhatsApp pay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        {/* VIP Stock Alerts & Newsletter Strip */}
        <div className="pb-12 mb-12 border-b border-[#1E1868]/70 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6 space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16105A] border border-[#00D4FF]/30 text-[#00D4FF] text-[10px] font-bold uppercase tracking-widest">
              <Bell className="w-3 h-3 text-[#00D4FF]" />
              <span>Direct Stock Alerts</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
              Get notified when new containers and showroom pieces arrive.
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-lg">
              Receive live video previews, price lists, and exclusive Dopemu showroom offers directly on WhatsApp.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                required
                value={newsletterInput}
                onChange={(e) => setNewsletterInput(e.target.value)}
                placeholder="Enter your phone or WhatsApp number"
                className="flex-1 px-4 sm:px-5 py-3 rounded-full bg-[#0E0A3C] border border-[#1E1868] text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all shadow-inner"
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md ${
                  subscribed
                    ? 'bg-[#059669] text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]'
                    : 'bg-[#00D4FF] text-[#070422] hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(0,212,255,0.35)]'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>Join VIP Alert</span>
                    <Send className="w-3.5 h-3.5 text-[#070422] stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Navigation Grid (4 Balanced Columns across Mobile, Tablet & Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 text-left pb-12">
          {/* Column 1: Brand & Identity (4 Cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/Screenshot_20261015-234655.jpg"
                alt="Sunrise Legacy Interior"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.35)] shrink-0"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo.png';
                }}
              />
              <div>
                <span className="font-serif text-2xl font-semibold tracking-tight text-white block leading-none">
                  Sunrise Legacy
                </span>
                <span className="text-[11px] font-black tracking-widest text-[#00D4FF] uppercase leading-none block mt-1">
                  Interior &amp; General Merchandise
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed max-w-sm">
              Your preferred shop for household items, blenders, electric kettles, rechargeable fans,
              luxury crystal chandeliers, cooking pots, cutlery sets, canvas shoes, crocs, and Arabic
              perfumes at Greater Path Mall, Dopemu, Lagos.
            </p>

            {/* Direct Instant WhatsApp Chat Action */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Sunrise Legacy Interior, I am contacting you from your website.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#120E48] text-white hover:text-[#00D4FF] hover:bg-[#181358] border border-[#00D4FF]/40 hover:border-[#00D4FF] text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#00D4FF]" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Merchandise Collections (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#00D4FF]">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBD5E1]">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Appliances & Gadgets')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Blenders, Kettles &amp; Fans</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Lighting & Fans')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Chandeliers &amp; POP Lights</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Kitchen & Dining')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Cooking Pots &amp; Cutlery Sets</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Clothing & Footwear')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Canvas Shoes, Crocs &amp; Polos</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Fragrances')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Arabic Perfumes &amp; Royal Oud</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Home Décor & Accents')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Folding Ladders &amp; Umbrellas</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Bedding & Bedrooms')}
                  className="hover:text-[#00D4FF] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Luxury Bed Linen Duvet Sets</span>
                  <span className="text-[10px] text-[#64748B] group-hover:text-[#00D4FF]">&rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Showroom (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#00D4FF]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CBD5E1]">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00D4FF] transition-colors block"
                >
                  Store Catalogue
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00D4FF] transition-colors block"
                >
                  Featured Collections
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00D4FF] transition-colors block"
                >
                  About Our Store
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00D4FF] transition-colors block"
                >
                  Shopping Services
                </a>
              </li>
              <li>
                <a
                  href="#visit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00D4FF] transition-colors block"
                >
                  Showroom Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Showroom & Direct Contact (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#00D4FF]">
              Showroom &amp; Contact
            </h4>

            <div className="space-y-3 text-xs text-[#CBD5E1]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-white font-medium">
                  {storeConfig.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#00D4FF] shrink-0" />
                <span>{storeConfig.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00D4FF] shrink-0" />
                <a
                  href={`tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-[#00D4FF] transition-colors text-white font-semibold"
                >
                  {storeConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#00D4FF] shrink-0" />
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Sunrise Legacy Interior, I would like to enquire about your showroom stock.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00D4FF] transition-colors text-[#38BDF8] font-semibold"
                >
                  WhatsApp: {storeConfig.whatsappDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D4FF] shrink-0" />
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="hover:text-[#00D4FF] transition-colors truncate"
                >
                  {storeConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top (Optimized for all viewports) */}
        <div className="pt-8 border-t border-[#1E1868]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>&copy; {currentYear} Sunrise Legacy Interior. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-[11px] text-[#64748B]">
              Greater Path Mall, Dopemu, Lagos &middot; General Merchandise
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E0A3C] hover:bg-[#16105A] border border-[#1E1868] hover:border-[#00D4FF] text-[#38BDF8] hover:text-[#00D4FF] transition-all cursor-pointer text-xs font-medium shadow-xs"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
