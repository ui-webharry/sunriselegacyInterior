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
          NEVER touches the edges of the viewport on any screen size (from 375px to 1920px).
      */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 px-3 sm:px-6 md:px-8 lg:px-12 ${
          isScrolled ? 'pt-2 pb-2' : 'pt-3 sm:pt-4 pb-2'
        }`}
      >
        {/* 
          Navbar Container Shell:
          - Centered max-w-5xl capsule on larger screens.
          - Single, unified, balanced row across ALL viewports.
          - Never stretches awkwardly or crowds elements.
        */}
        <div
          className={`max-w-5xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 relative overflow-hidden px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 ${
            isScrolled ? 'liquid-glass-shell-scrolled' : 'liquid-glass-shell'
          }`}
        >
          {/* Subtle Glass Highlights */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

          {/* Single-Row Unified Bar */}
          <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-4">
            
            {/* LEFT: Brand Logo Emblem & Wordmark */}
            <a
              href="#"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-full shrink-0"
              aria-label="Sunrise Legacy Interior Home"
            >
              <div className="relative">
                <img
                  src="/images/Screenshot_20261015-234655.jpg"
                  alt="Sunrise Legacy Interior"
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-[#00D4FF]/50 shadow-[0_0_16px_rgba(0,212,255,0.4)] group-hover:ring-[#00D4FF] group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/logo.png';
                  }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#0A072E] shadow-sm" title="Showroom Open" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-white leading-tight group-hover:text-[#00D4FF] transition-colors">
                  Sunrise Legacy
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-[#00D4FF] font-semibold leading-none hidden xs:block">
                  Interior &middot; Dopemu
                </span>
              </div>
            </a>

            {/* CENTER: Quick Search Trigger (Adaptive on Tablet / Laptop / Desktop) */}
            <div className="hidden sm:flex flex-1 max-w-xs md:max-w-sm mx-2">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-[#00D4FF]/12 border border-white/[0.1] hover:border-[#00D4FF]/50 text-xs text-[#94A3B8] hover:text-white transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                aria-label="Search catalog"
              >
                <div className="flex items-center gap-2 truncate">
                  <Search className="w-3.5 h-3.5 text-[#00D4FF] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate text-[11px] lg:text-xs">Search cookware, blenders...</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#00D4FF] bg-[#00D4FF]/15 px-2 py-0.5 rounded-full font-semibold border border-[#00D4FF]/30 shrink-0">
                  Search
                </span>
              </button>
            </div>

            {/* RIGHT: Actions + Universal Hamburger Menu Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Mobile Search Icon Button (visible only when search pill is hidden) */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="sm:hidden p-2 text-white hover:text-[#00D4FF] bg-white/[0.05] hover:bg-[#00D4FF]/15 border border-white/[0.1] hover:border-[#00D4FF]/40 rounded-full transition-all cursor-pointer backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4 stroke-[1.8]" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="p-2 sm:p-2.5 rounded-full bg-white/[0.05] hover:bg-[#00D4FF]/15 border border-white/[0.1] hover:border-[#00D4FF]/70 backdrop-blur-xl text-white hover:text-[#00D4FF] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_0_16px_rgba(0,212,255,0.35)] transition-all relative cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                aria-label={`Saved items (${wishlistCount})`}
                title="Saved Items"
              >
                <Heart className="w-4 h-4 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#00D4FF] to-[#38BDF8] text-[#070422] text-[9.5px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,212,255,0.6)]">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Subtle Hairline Divider */}
              <div className="w-[1px] h-5 bg-white/[0.12] mx-0.5" />

              {/* 
                THE UNIVERSAL HAMBURGER MENU BUTTON:
                - Present on ALL screen sizes (Mobile, Tablet, Laptop, Desktop, 4K).
                - Accessible <button> with proper aria-expanded and aria-label.
                - Visually balanced with clear feedback.
              */}
              <button
                type="button"
                id="main-navigation-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="main-navigation-drawer"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className={`relative flex items-center justify-center gap-2 h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer group active:scale-95 border focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF] ${
                  isMenuOpen
                    ? 'bg-[#00D4FF]/20 border-[#00D4FF]/70 text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                    : 'bg-white/[0.06] hover:bg-[#00D4FF]/12 border-white/[0.12] hover:border-[#00D4FF]/50 text-white hover:text-[#00D4FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]'
                }`}
              >
                {/* 3 Animated Morphing Bars */}
                <div className="relative w-4.5 sm:w-5 h-3.5 flex flex-col justify-between items-center pointer-events-none">
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isMenuOpen
                        ? 'w-4.5 sm:w-5 bg-[#00D4FF] translate-y-[6px] rotate-45'
                        : 'w-4.5 sm:w-5 bg-white group-hover:bg-[#00D4FF]'
                    }`}
                  />
                  <span
                    className={`h-[2px] rounded-full transition-all duration-200 ease-out ${
                      isMenuOpen
                        ? 'w-0 opacity-0 bg-[#00D4FF]'
                        : 'w-3.5 group-hover:w-4.5 sm:w-4 sm:group-hover:w-5 bg-[#00D4FF] opacity-100'
                    }`}
                  />
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isMenuOpen
                        ? 'w-4.5 sm:w-5 bg-[#00D4FF] -translate-y-[6px] -rotate-45'
                        : 'w-4.5 sm:w-5 bg-white group-hover:bg-[#00D4FF]'
                    }`}
                  />
                </div>

                {/* Text Label on Tablet / Desktop for utmost clarity */}
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
        - Active on ALL SCREEN SIZES (mobile, tablet, laptop, desktop, ultra-wide).
        - Smooth slide-in from the right side.
        - Backing blur overlay that closes when clicked.
        - Esc key listener.
        - Fully keyboard accessible and structured navigation.
      */}
      {isMenuOpen && (
        <div
          id="main-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Backdrop with Ambient Radial Brand Glow */}
          <div
            className="fixed inset-0 bg-[#070422]/85 backdrop-blur-md bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.18)_0%,_rgba(22,104,255,0.12)_35%,_transparent_75%)] transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-12">
            <div className="w-screen max-w-md bg-gradient-to-b from-[#0A072E] via-[#0E0A3C] to-[#070422] shadow-[-25px_0_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,212,255,0.15)] flex flex-col z-10 overflow-y-auto border-l border-white/[0.1] backdrop-blur-2xl animate-in slide-in-from-right duration-300 ease-out text-white">
              
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.08] bg-[#070422]/90 backdrop-blur-xl sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/Screenshot_20261015-234655.jpg"
                    alt="Sunrise Legacy Interior"
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[#00D4FF]/50 shadow-[0_0_16px_rgba(0,212,255,0.35)] shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = '/images/logo.png';
                    }}
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-lg font-semibold tracking-tight text-white leading-tight">
                      Sunrise Legacy
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#00D4FF] font-bold">
                      Greater Path Mall, Dopemu
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[#00D4FF]/20 active:scale-95 border border-white/[0.12] hover:border-[#00D4FF]/60 text-white hover:text-[#00D4FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 stroke-[2] group-hover:rotate-90 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>

              {/* Quick Search Bar within Drawer */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#120E48]/80 via-[#1a1464]/65 to-[#120E48]/80 border border-white/[0.12] hover:border-[#00D4FF]/60 rounded-full text-xs text-[#94A3B8] hover:text-white shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Search className="w-4 h-4 text-[#00D4FF] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Search cookware, blenders, fans...</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#00D4FF] bg-[#00D4FF]/15 px-2.5 py-0.5 rounded-full font-semibold border border-[#00D4FF]/40 shrink-0">
                    Search
                  </span>
                </button>
              </div>

              {/* Navigation Categories Body */}
              <div className="p-4 sm:p-5 flex-1 space-y-6 overflow-y-auto">
                {/* 1. Collections Category Links */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[10px] uppercase tracking-[0.2em] text-[#00D4FF] font-bold shadow-[0_0_10px_rgba(0,212,255,0.15)]">
                      Shop By Category
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-light">
                      Wholesale &amp; Retail
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {navCategories.map((item) => (
                      <button
                        key={item.cat}
                        type="button"
                        onClick={() => handleNavClick(item.cat)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl text-left hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] transition-all group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-sm font-semibold text-white group-hover:text-[#00D4FF] transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-light truncate">
                            {item.desc}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#00D4FF] shrink-0 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Showroom & Story Pages */}
                <div className="pt-2 border-t border-white/[0.08]">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[10px] uppercase tracking-[0.2em] text-[#00D4FF] font-bold shadow-[0_0_10px_rgba(0,212,255,0.15)]">
                      Showroom &amp; Services
                    </span>
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => handleSectionClick('about')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                    >
                      <span>Our Story &amp; Quality Standards</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSectionClick('services')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                    >
                      <span>Wholesale, Carton &amp; Dispatch Services</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSectionClick('visit')}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] text-left transition-colors cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
                    >
                      <span>Visit Showroom &amp; Google Map</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>

                {/* 3. Showroom Verification Details */}
                <div className="p-4 rounded-2xl bg-[#0E0A3C]/70 border border-[#1E1868] space-y-2.5 text-xs text-[#CBD5E1]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#00D4FF] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
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
                      className="hover:text-[#00D4FF] transition-colors text-white font-medium"
                    >
                      {storeConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Action: WhatsApp Orders */}
              <div className="p-4 sm:p-5 bg-gradient-to-t from-[#05031D] via-[#070422] to-transparent border-t border-white/[0.08] space-y-2 text-center sticky bottom-0 z-20">
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Sunrise Legacy Interior, I am chatting from your store menu.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-[#070422] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all cursor-pointer active:scale-98"
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
