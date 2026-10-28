import React, { useState, useEffect } from 'react';
import { Search, Heart, X, ChevronRight, MapPin, Phone, Clock } from 'lucide-react';
import { ProductCategory, StoreConfig } from '../types';

interface HeaderProps {
  storeConfig: StoreConfig;
  cartCount?: number;
  cartTotal?: number;
  wishlistCount: number;
  onOpenCart?: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeConfig,
  cartCount: _cartCount,
  cartTotal: _cartTotal,
  wishlistCount,
  onOpenCart: _onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when hamburger menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navCategories: { label: string; cat: ProductCategory; desc: string }[] = [
    { label: 'All Merchandise', cat: 'All', desc: 'Browse our complete Dopemu showroom catalogue' },
    { label: 'Appliances & Gadgets', cat: 'Appliances & Gadgets', desc: 'Heavy-duty blenders, kettles & rechargeable fans' },
    { label: 'Lighting & Fans', cat: 'Lighting & Fans', desc: 'Crystal spiral chandeliers, ceiling & mist fans' },
    { label: 'Kitchen & Dining', cat: 'Kitchen & Dining', desc: 'Granite cookware pot sets & luxury cutlery' },
    { label: 'Clothing & Footwear', cat: 'Clothing & Footwear', desc: 'Canvas footwear, comfort crocs & apparel' },
    { label: 'Arabic Perfumes', cat: 'Fragrances', desc: 'Authentic oud, Arabian musks & oil fragrances' },
    { label: 'Bedding & Linens', cat: 'Bedding & Bedrooms', desc: 'Luxury duvet sets, pillows & hotel bed sheets' },
    { label: 'Ladders & Utility', cat: 'Home Décor & Accents', desc: 'Heavy-duty aluminum ladders & rain umbrellas' },
  ];

  const handleNavClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setIsMenuOpen(false);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 
        Sticky Navbar Wrapper:
        - Consistent horizontal padding (px-3 sm:px-6 md:px-8 lg:px-12) guarantees the navbar
          NEVER touches the edges of the viewport on any screen size.
      */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 px-3 sm:px-6 md:px-8 lg:px-12 ${
          isScrolled ? 'pt-2 pb-2' : 'pt-3 sm:pt-4 pb-2'
        }`}
      >
        {/* 
          Navbar Container Shell:
          - Centered max-w-5xl capsule on larger screens.
          - Warm frosted ivory finish that blends with the off-white background.
        */}
        <div
          className={`max-w-5xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 relative overflow-hidden px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 ${
            isScrolled ? 'liquid-glass-shell-scrolled' : 'liquid-glass-shell'
          }`}
        >
          {/* Subtle Warm Highlight lines */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8E3DA]/60 to-transparent pointer-events-none" />

          {/* Single-Row Unified Bar */}
          <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-4">
            
            {/* LEFT: Brand Logo Emblem & Wordmark */}
            <a
              href="#"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24] rounded-full shrink-0"
              aria-label="Sunrise Legacy Interior Home"
            >
              <div className="relative">
                <img
                  src="/images/Screenshot_20261015-234655.jpg"
                  alt="Sunrise Legacy Interior"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-[#966B24]/30 shadow-[0_2px_8px_rgba(150,107,36,0.18)] group-hover:ring-[#966B24] group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/logo.png';
                  }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white shadow-xs" title="Showroom Open" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#1A1714] leading-tight group-hover:text-[#966B24] transition-colors">
                  Sunrise Legacy
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#966B24] font-semibold leading-none hidden xs:block">
                  Interior &middot; Dopemu
                </span>
              </div>
            </a>

            {/* CENTER: Quick Search Trigger */}
            <div className="hidden sm:flex flex-1 max-w-xs md:max-w-sm mx-2">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#E8E3DA] hover:border-[#966B24]/40 text-xs text-[#73685E] hover:text-[#1A1714] transition-all cursor-pointer shadow-[0_1px_3px_rgba(35,30,24,0.03)] group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                aria-label="Search catalog"
              >
                <div className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-[#966B24] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate text-[11px] lg:text-xs">Search cookware, blenders...</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#966B24] bg-[#966B24]/10 px-2 py-0.5 rounded-full font-semibold border border-[#966B24]/20 shrink-0">
                  Search
                </span>
              </button>
            </div>

            {/* RIGHT: Actions + Universal Hamburger Menu Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Mobile Search Icon Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="sm:hidden p-2 text-[#1A1714] hover:text-[#966B24] bg-white/80 hover:bg-white border border-[#E8E3DA] hover:border-[#966B24]/40 rounded-full transition-all cursor-pointer shadow-[0_1px_3px_rgba(35,30,24,0.04)] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4 stroke-[1.8]" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white border border-[#E8E3DA] hover:border-[#966B24] text-[#1A1714] hover:text-[#966B24] shadow-[0_1px_4px_rgba(35,30,24,0.05)] hover:shadow-[0_2px_8px_rgba(150,107,36,0.15)] transition-all relative cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                aria-label={`Saved items (${wishlistCount})`}
                title="Saved Items"
              >
                <Heart className="w-4 h-4 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#966B24] text-white text-[9.5px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Subtle Hairline Divider */}
              <div className="w-[1px] h-5 bg-[#E8E3DA] mx-0.5" />

              {/* 
                THE UNIVERSAL HAMBURGER MENU BUTTON:
                - Present on ALL screen sizes.
              */}
              <button
                type="button"
                id="main-navigation-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="main-navigation-drawer"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className={`relative flex items-center justify-center gap-2 h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-full transition-all duration-300 cursor-pointer group active:scale-95 border focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24] ${
                  isMenuOpen
                    ? 'bg-[#966B24]/10 border-[#966B24] text-[#966B24] shadow-[0_2px_8px_rgba(150,107,36,0.15)]'
                    : 'bg-white/90 hover:bg-[#F6F3ED] border-[#E8E3DA] hover:border-[#966B24] text-[#1A1714] hover:text-[#966B24] shadow-[0_1px_4px_rgba(35,30,24,0.05)]'
                }`}
              >
                {/* 3 Animated Morphing Bars */}
                <div className="relative w-4.5 sm:w-5 h-3.5 flex flex-col justify-between items-center pointer-events-none">
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isMenuOpen
                        ? 'w-4.5 sm:w-5 bg-[#966B24] translate-y-[6px] rotate-45'
                        : 'w-4.5 sm:w-5 bg-[#1A1714] group-hover:bg-[#966B24]'
                    }`}
                  />
                  <span
                    className={`h-[2px] rounded-full transition-all duration-200 ease-out ${
                      isMenuOpen
                        ? 'w-0 opacity-0 bg-[#966B24]'
                        : 'w-3.5 group-hover:w-4.5 sm:w-4 sm:group-hover:w-5 bg-[#966B24] opacity-100'
                    }`}
                  />
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isMenuOpen
                        ? 'w-4.5 sm:w-5 bg-[#966B24] -translate-y-[6px] -rotate-45'
                        : 'w-4.5 sm:w-5 bg-[#1A1714] group-hover:bg-[#966B24]'
                    }`}
                  />
                </div>

                {/* Text Label on Tablet / Desktop */}
                <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
                  {isMenuOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        EXPANDED NAVIGATION PANEL (HAMBURGER DRAWER):
        - Active on ALL SCREEN SIZES.
        - Warm off-white / ivory luxury aesthetic.
      */}
      {isMenuOpen && (
        <div
          id="main-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Backdrop with Subtle Dark Warmth */}
          <div
            className="fixed inset-0 bg-[#1A1714]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-12">
            <div className="w-screen max-w-md bg-[#FAF9F6] shadow-[-20px_0_50px_rgba(28,24,20,0.12)] flex flex-col z-10 overflow-y-auto border-l border-[#E8E3DA] animate-in slide-in-from-right duration-300 ease-out text-[#1A1714]">
              
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E8E3DA] bg-[#F8F7F4]/95 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/Screenshot_20261015-234655.jpg"
                    alt="Sunrise Legacy Interior"
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#966B24]/30 shadow-xs shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = '/images/logo.png';
                    }}
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-lg font-semibold tracking-tight text-[#1A1714] leading-tight">
                      Sunrise Legacy
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#966B24] font-bold">
                      Greater Path Mall, Dopemu
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-[#F2EFEB] active:scale-95 border border-[#E8E3DA] hover:border-[#966B24]/50 text-[#1A1714] hover:text-[#966B24] shadow-xs transition-all duration-300 cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 stroke-[2] group-hover:rotate-90 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>

              {/* Quick Search Bar within Drawer */}
              <div className="p-4 sm:p-5 border-b border-[#E8E3DA] bg-[#F4F1EA]/50">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#FAF9F6] border border-[#E8E3DA] hover:border-[#966B24]/50 rounded-full text-xs text-[#73685E] hover:text-[#1A1714] shadow-xs transition-all cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Search className="w-4 h-4 text-[#966B24] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Search cookware, blenders, fans...</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#966B24] bg-[#966B24]/10 px-2.5 py-0.5 rounded-full font-semibold border border-[#966B24]/20 shrink-0">
                    Search
                  </span>
                </button>
              </div>

              {/* Navigation Categories Body */}
              <div className="p-4 sm:p-5 flex-1 space-y-6 overflow-y-auto">
                {/* 1. Collections Category Links */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#966B24]/10 border border-[#966B24]/25 text-[10px] uppercase tracking-[0.2em] text-[#966B24] font-bold">
                      Shop By Category
                    </span>
                    <span className="text-[11px] text-[#857A6F] font-light">
                      Wholesale &amp; Retail
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {navCategories.map((item) => (
                      <button
                        key={item.cat}
                        type="button"
                        onClick={() => handleNavClick(item.cat)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl text-left bg-white hover:bg-[#F4F1EA] border border-[#EFECE6] hover:border-[#DCD6CA] transition-all group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24] shadow-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-sm font-semibold text-[#1A1714] group-hover:text-[#966B24] transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#857A6F] font-light truncate">
                            {item.desc}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#966B24] shrink-0 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Showroom & Story Pages */}
                <div className="pt-2 border-t border-[#E8E3DA]">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#966B24]/10 border border-[#966B24]/25 text-[10px] uppercase tracking-[0.2em] text-[#966B24] font-bold">
                      Showroom &amp; Services
                    </span>
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => handleSectionClick('about')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#574F46] hover:text-[#1A1714] hover:bg-[#F2EFEB] text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                    >
                      <span>Our Story &amp; Quality Standards</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#857A6F] group-hover:text-[#966B24] group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSectionClick('services')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#574F46] hover:text-[#1A1714] hover:bg-[#F2EFEB] text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                    >
                      <span>Wholesale, Carton &amp; Dispatch Services</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#857A6F] group-hover:text-[#966B24] group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSectionClick('visit')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#574F46] hover:text-[#1A1714] hover:bg-[#F2EFEB] text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#966B24]"
                    >
                      <span>Visit Showroom &amp; Google Map</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#857A6F] group-hover:text-[#966B24] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>

                {/* 3. Showroom Verification Details */}
                <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#E8E3DA] space-y-2.5 text-xs text-[#574F46]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#966B24] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
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
                      className="hover:text-[#966B24] transition-colors text-[#1A1714] font-medium"
                    >
                      {storeConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Action: WhatsApp Orders */}
              <div className="p-4 sm:p-5 bg-gradient-to-t from-[#F4F1EA] via-[#FAF9F6] to-transparent border-t border-[#E8E3DA] space-y-2 text-center sticky bottom-0 z-20">
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Sunrise Legacy Interior, I am chatting from your store menu.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-[0_2px_12px_rgba(37,211,102,0.25)] transition-all cursor-pointer active:scale-98"
                >
                  <svg
                    className="w-4.5 h-4.5 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                  </svg>
                  <span>Chat With Dopemu Showroom</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
