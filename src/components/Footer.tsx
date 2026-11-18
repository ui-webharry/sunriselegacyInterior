import React, { useState } from 'react';
import {
  ArrowUp,
  Send,
  Check,
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
      const message = `Hello Sunrise Legacy Interior,\n\nI would like to join stock alerts for new showroom arrivals and availability.\n\nMy Contact: ${newsletterInput.trim()}`;
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
    <footer className="bg-white text-slate-700 border-t border-slate-200">
      {/* Trust & Store Strip */}
      <div className="border-b border-slate-200 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-7">
          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-4 gap-6 divide-y min-[600px]:divide-y-0 lg:divide-x divide-slate-200">
            <div className="flex items-center gap-3.5 pt-2 min-[600px]:pt-0">
              <MapPin className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#0F172A] block truncate">Walk-In Showroom</span>
                <span className="text-[11px] text-slate-500 block truncate">
                  Greater Path Mall, Dopemu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 min-[600px]:pt-0 lg:pl-6">
              <Truck className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#0F172A] block truncate">Prompt Lagos Dispatch</span>
                <span className="text-[11px] text-slate-500 block truncate">
                  Same-day &amp; interstate courier
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:pl-6">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#0F172A] block truncate">Tested Merchandise</span>
                <span className="text-[11px] text-slate-500 block truncate">
                  Inspected prior to handover
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:pl-6">
              <CreditCard className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-[#0F172A] block truncate">Flexible Payment</span>
                <span className="text-[11px] text-slate-500 block truncate">
                  Cash, Transfer &amp; POS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-10">
        {/* Direct Stock Alerts Bar */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#F8F9FA] p-6 sm:p-8 rounded-lg border border-slate-200">
          <div className="lg:col-span-6 space-y-2 text-left">
            <div className="flex items-center gap-2 text-blue-700 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <Bell className="w-3.5 h-3.5" />
              <span>Direct Stock Alerts</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0F172A] tracking-tight">
              Get notified when new showroom stock arrives.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              Receive stock updates and showroom arrival previews directly via WhatsApp.
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
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-300 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600 transition-colors min-h-[44px]"
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[44px] ${
                  subscribed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>Join Stock Alert</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 text-left pb-12">
          {/* Column 1: Brand & Bio */}
          <div className="min-[600px]:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/Screenshot_20261015-234655.jpg"
                alt="Sunrise Legacy Interior"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo.png';
                }}
              />
              <div>
                <span className="font-serif text-2xl font-semibold tracking-tight text-[#0F172A] block leading-none">
                  Sunrise Legacy
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-blue-700 uppercase leading-none block mt-1.5">
                  Interior &amp; General Merchandise
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Your Dopemu destination for home appliances (blenders, portable juicers, kettles, microwaves, rechargeable fans), electronics &amp; cables, POP &amp; chandelier lighting, clothing, footwear, and authentic Arabic perfumes.
            </p>

            {/* Social Media Handles */}
            <div className="pt-3 border-t border-slate-200 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.18em] text-blue-700 font-semibold block mb-2.5">
                Follow &amp; Connect
              </span>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 text-blue-700 shrink-0"
                    title="Facebook"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.5-1.46H16.7V4.95c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.29V11H7.3v3h2.72v8h3.48z" />
                    </svg>
                  </span>
                  <a
                    href={storeConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    {storeConfig.socialHandles.facebook}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 text-blue-700 shrink-0"
                    title="WhatsApp"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.77.46 3.5 1.34 5.02L2 22l5.09-1.33a9.98 9.98 0 0 0 4.95 1.3h.01c5.52 0 10-4.49 10-10.01C22.05 6.49 17.56 2 12.04 2zm5.82 14.23c-.24.69-1.41 1.32-1.95 1.4-.5.08-1.13.11-1.82-.11-.42-.14-.96-.32-1.65-.62-2.9-1.26-4.79-4.18-4.93-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.12 1.01-2.41c.27-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.04.89 2.19.07.14.12.31.02.5-.09.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.08.13.08.73-.17 1.41z" />
                    </svg>
                  </span>
                  <a
                    href={storeConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors tabular-nums"
                  >
                    {storeConfig.socialHandles.whatsapp}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 text-blue-700 shrink-0"
                    title="Instagram"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  </span>
                  <a
                    href={storeConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    {storeConfig.socialHandles.instagram}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 text-blue-700 shrink-0"
                    title="TikTok"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                    </svg>
                  </span>
                  <a
                    href={storeConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    {storeConfig.socialHandles.tiktok}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Store Departments (Separated Clothing & Footwear) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-blue-700">
              Store Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Home Appliances')}
                  className="hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Home Appliances (Blenders, Juicers, Kettles &amp; Fans)</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-700">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Electronics & Accessories')}
                  className="hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Electronics &amp; Accessories (Speakers, Headphones &amp; Cables)</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-700">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Lighting & Home Improvement')}
                  className="hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Lighting &amp; Home Improvement (POP, Chandeliers &amp; Ladders)</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-700">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Clothing')}
                  className="hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Clothing (Polo Shirts, T-Shirts, Jeans &amp; Shirts)</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-700">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Footwear')}
                  className="hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Footwear (Canvas Sneakers, Children&apos;s Shoes &amp; Crocs)</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-700">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Fragrances')}
                  className="hover:text-blue-700 transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Fragrances (Arabic Perfumes &amp; Oils)</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-700">&rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-blue-700">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  href="#categories"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-700 transition-colors block"
                >
                  Store Departments
                </a>
              </li>
              <li>
                <a
                  href="#inspiration"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('inspiration')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-700 transition-colors block"
                >
                  Apparel &amp; Footwear
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-700 transition-colors block"
                >
                  Store Catalogue
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-700 transition-colors block"
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
                  className="hover:text-blue-700 transition-colors block"
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
                  className="hover:text-blue-700 transition-colors block"
                >
                  Showroom Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Showroom & Contact */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-blue-700">
              Showroom &amp; Contact
            </h4>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#0F172A] font-medium">
                  {storeConfig.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{storeConfig.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <a
                  href={`tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-blue-700 transition-colors text-[#0F172A] font-semibold tabular-nums"
                >
                  {storeConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="hover:text-blue-700 transition-colors truncate"
                >
                  {storeConfig.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Sunrise Legacy Interior, I would like to enquire about your showroom stock.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F8F9FA] hover:bg-blue-700 text-[#0F172A] hover:text-white border border-slate-200 hover:border-blue-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Chat on WhatsApp ({storeConfig.whatsappDisplay})</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>&copy; {currentYear} Sunrise Legacy Interior. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300">|</span>
            <p className="text-[11px] text-slate-400">
              Shops 21 &amp; 22, Block B, 1st Floor, Greater Path Mall, Dopemu, Lagos
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8F9FA] hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-colors cursor-pointer text-xs font-semibold"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-700" />
          </button>
        </div>
      </div>
    </footer>
  );
};
