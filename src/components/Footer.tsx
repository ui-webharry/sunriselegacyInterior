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
    <footer className="bg-[#F3EFE8] text-[#1A1714] border-t border-[#E8E3DA] relative overflow-hidden">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-[#E8E3DA] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] text-[#966B24] flex items-center justify-center shrink-0 border border-[#EBE6DC]">
                <MapPin className="w-5 h-5 text-[#966B24]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#1A1714] block truncate">Walk-In Showroom</span>
                <span className="text-[11px] text-[#786E65] font-light block truncate">
                  Greater Path Mall, Dopemu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] text-[#966B24] flex items-center justify-center shrink-0 border border-[#EBE6DC]">
                <Truck className="w-5 h-5 text-[#966B24]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#1A1714] block truncate">Prompt Lagos Dispatch</span>
                <span className="text-[11px] text-[#786E65] font-light block truncate">
                  Same-day &amp; interstate courier
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] text-[#966B24] flex items-center justify-center shrink-0 border border-[#EBE6DC]">
                <ShieldCheck className="w-5 h-5 text-[#966B24]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#1A1714] block truncate">Tested Quality</span>
                <span className="text-[11px] text-[#786E65] font-light block truncate">
                  Genuine merchandise inspected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] text-[#966B24] flex items-center justify-center shrink-0 border border-[#EBE6DC]">
                <CreditCard className="w-5 h-5 text-[#966B24]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#1A1714] block truncate">Flexible Payment</span>
                <span className="text-[11px] text-[#786E65] font-light block truncate">
                  Cash, Transfer &amp; POS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        {/* VIP Stock Alerts & Newsletter Strip */}
        <div className="pb-12 mb-12 border-b border-[#E8E3DA] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-6 space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E3DA] text-[#966B24] text-[10px] font-bold uppercase tracking-widest shadow-xs">
              <Bell className="w-3 h-3 text-[#966B24]" />
              <span>Direct Stock Alerts</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1714] tracking-tight">
              Get notified when new containers and showroom pieces arrive.
            </h3>
            <p className="text-xs sm:text-sm text-[#786E65] font-light max-w-lg">
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
                className="flex-1 px-4 sm:px-5 py-3 rounded-full bg-white border border-[#E8E3DA] text-xs sm:text-sm text-[#1A1714] placeholder-[#857A6F] focus:outline-hidden focus:border-[#966B24] transition-all shadow-xs"
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs active:scale-95 ${
                  subscribed
                    ? 'bg-[#059669] text-white'
                    : 'bg-[#1A1714] text-white hover:bg-[#2E2822]'
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
                    <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Navigation Grid (4 Balanced Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 text-left pb-12">
          {/* Column 1: Brand & Identity (4 Cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/Screenshot_20261015-234655.jpg"
                alt="Sunrise Legacy Interior"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#966B24]/30 shadow-xs shrink-0"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo.png';
                }}
              />
              <div>
                <span className="font-serif text-2xl font-semibold tracking-tight text-[#1A1714] block leading-none">
                  Sunrise Legacy
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#966B24] uppercase leading-none block mt-1">
                  Interior &amp; General Merchandise
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#574F46] font-light leading-relaxed max-w-sm">
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
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#25D366]/15 text-[#13612D] hover:text-white hover:bg-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                </svg>
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Merchandise Collections (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#966B24]">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#574F46]">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Appliances & Gadgets')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Blenders, Kettles &amp; Fans</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Lighting & Fans')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Chandeliers &amp; POP Lights</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Kitchen & Dining')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Cooking Pots &amp; Cutlery Sets</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Clothing & Footwear')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Canvas Shoes, Crocs &amp; Polos</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Fragrances')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Arabic Perfumes &amp; Royal Oud</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Home Décor & Accents')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Folding Ladders &amp; Umbrellas</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Bedding & Bedrooms')}
                  className="hover:text-[#966B24] transition-colors text-left cursor-pointer flex items-center justify-between w-full group"
                >
                  <span>Luxury Bed Linen Duvet Sets</span>
                  <span className="text-[10px] text-[#857A6F] group-hover:text-[#966B24]">&rarr;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Showroom (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#966B24]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#574F46]">
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#966B24] transition-colors block"
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
                  className="hover:text-[#966B24] transition-colors block"
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
                  className="hover:text-[#966B24] transition-colors block"
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
                  className="hover:text-[#966B24] transition-colors block"
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
                  className="hover:text-[#966B24] transition-colors block"
                >
                  Showroom Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Showroom & Direct Contact (3 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#966B24]">
              Showroom &amp; Contact
            </h4>

            <div className="space-y-3 text-xs text-[#574F46]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#966B24] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#1A1714] font-medium">
                  {storeConfig.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#966B24] shrink-0" />
                <span>{storeConfig.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#966B24] shrink-0" />
                <a
                  href={`tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-[#966B24] transition-colors text-[#1A1714] font-semibold"
                >
                  {storeConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 fill-[#25D366] shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                </svg>
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Sunrise Legacy Interior, I would like to enquire about your showroom stock.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#13612D] transition-colors text-[#1A1714] font-semibold"
                >
                  WhatsApp: {storeConfig.whatsappDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#966B24] shrink-0" />
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="hover:text-[#966B24] transition-colors truncate"
                >
                  {storeConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786E65]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>&copy; {currentYear} Sunrise Legacy Interior. All rights reserved.</p>
            <span className="hidden sm:inline text-[#DCD6CA]">|</span>
            <p className="text-[11px] text-[#857A6F]">
              Greater Path Mall, Dopemu, Lagos &middot; General Merchandise
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#FAF9F6] border border-[#E8E3DA] hover:border-[#966B24] text-[#1A1714] hover:text-[#966B24] transition-all cursor-pointer text-xs font-medium shadow-xs"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#966B24]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
