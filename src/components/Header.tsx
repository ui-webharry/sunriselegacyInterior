import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, MessageCircle, MapPin } from 'lucide-react';
import { ProductCategory, StoreConfig } from '../types';

interface HeaderProps {
  storeConfig: StoreConfig;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeConfig,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navCategories: { label: string; cat: ProductCategory }[] = [
    { label: 'All Merchandise', cat: 'All' },
    { label: 'Appliances & Gadgets', cat: 'Appliances & Gadgets' },
    { label: 'Lighting & Fans', cat: 'Lighting & Fans' },
    { label: 'Kitchen & Pots', cat: 'Kitchen & Dining' },
    { label: 'Clothing & Shoes', cat: 'Clothing & Footwear' },
    { label: 'Arabic Perfumes', cat: 'Fragrances' },
    { label: 'Bedding & Linen', cat: 'Bedding & Bedrooms' },
    { label: 'Ladders & Utility', cat: 'Home Décor & Accents' },
  ];

  const handleNavClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setIsMobileMenuOpen(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>

      {/* 2. Main Navigation Bar with Authentic Logo Image & Liquid Style Layout */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-2 sm:py-2.5 bg-[#05031D]/60 backdrop-blur-md'
            : 'py-2.5 sm:py-3.5 bg-transparent'
        }`}
      >
        {/* Liquid Glass Shell (Selected Element) */}
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl sm:rounded-3xl transition-all duration-500 relative overflow-hidden ${
            isScrolled ? 'liquid-glass-shell-scrolled' : 'liquid-glass-shell'
          }`}
        >
          {/* Soft Neutral Specular Highlights */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

          {/* =========================================================
              DESKTOP VIEW: Liquid Symmetrical & Balanced Navigation
             ========================================================= */}
          <div className="hidden lg:block py-3 relative z-10">
            {/* Top Row: Official Logo Image | Search Bar | Customer Actions */}
            <div className="flex items-center justify-between gap-6">
              {/* Left: Official Brand Logo Image with Liquid Cyan Halo */}
              <a
                href="#"
                className="group flex items-center shrink-0 focus:outline-hidden"
                aria-label="Sunrise Legacy Interior Home"
              >
                <img
                  src="/images/Screenshot_20261015-234655.jpg"
                  alt="Sunrise Legacy Interior"
                  referrerPolicy="no-referrer"
                  className="h-13 w-13 rounded-full object-cover ring-2 ring-[#00D4FF]/50 shadow-[0_0_22px_rgba(0,212,255,0.45)] group-hover:ring-[#00D4FF] group-hover:scale-105 transition-all duration-300"
                  onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
                />
              </a>

              {/* Center: Liquid Search Bar Pill */}
              <div className="flex-1 max-w-xl mx-auto">
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-gradient-to-r from-[#120E48]/75 via-[#1a1464]/60 to-[#120E48]/75 backdrop-blur-xl border border-white/[0.12] hover:border-[#00D4FF]/60 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22),0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_22px_rgba(0,212,255,0.35),inset_0_1px_2px_rgba(255,255,255,0.35)] transition-all text-left text-xs text-[#94A3B8] hover:text-white group cursor-pointer"
                  aria-label="Search store catalogue"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Search className="w-4 h-4 text-[#00D4FF] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Search cookware, blenders, fans, bed linen, fabrics...</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#00D4FF] bg-gradient-to-r from-[#00D4FF]/20 to-[#1668FF]/20 px-3 py-0.5 rounded-full font-semibold border border-[#00D4FF]/40 shadow-[0_0_10px_rgba(0,212,255,0.25)]">
                    Search
                  </span>
                </button>
              </div>

              {/* Right: Showroom & Shopping Actions with Liquid Glass Accents */}
              <div className="flex items-center gap-3.5 shrink-0">
                <a
                  href="#visit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.14em] font-medium text-[#CBD5E1] hover:text-[#00D4FF] hover:bg-white/[0.06] transition-all hidden xl:block"
                >
                  Showroom
                </a>

                {/* Hairline Divider */}
                <div className="w-[1px] h-4 bg-white/[0.12] hidden xl:block" />

                {/* Wishlist Button in Liquid Glass */}
                <button
                  type="button"
                  onClick={onOpenWishlist}
                  className="p-2.5 rounded-full bg-white/[0.06] hover:bg-[#00D4FF]/15 border border-white/[0.12] hover:border-[#00D4FF]/70 backdrop-blur-xl text-white hover:text-[#00D4FF] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.25),0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[0_0_18px_rgba(0,212,255,0.4)] transition-all relative cursor-pointer"
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

                {/* Shopping Bag Pill Button in Liquid Gradient Glass */}
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#120E48]/85 via-[#1a1464]/80 to-[#120E48]/85 text-white hover:bg-[#181358] border border-[#00D4FF]/50 hover:border-[#00D4FF] shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_0_18px_rgba(0,212,255,0.3)] hover:shadow-[0_0_26px_rgba(0,212,255,0.5)] transition-all cursor-pointer group"
                  aria-label={`Shopping bag with ${cartCount} items`}
                >
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4 text-[#00D4FF] group-hover:scale-105 transition-transform" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-gradient-to-r from-[#00D4FF] to-[#38BDF8] text-[#070422] text-[8.5px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,212,255,0.7)]">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold tracking-wide">
                    {cartCount > 0 ? `Bag (${cartCount})` : 'Bag'}
                  </span>
                  {cartTotal > 0 && (
                    <span className="text-xs text-[#00D4FF] font-bold border-l border-white/20 pl-2">
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Row: Liquid Category Navigation Menu */}
            <nav className="flex items-center justify-center gap-3 lg:gap-5 pt-2.5 mt-2 border-t border-white/[0.08] text-[12px] uppercase tracking-[0.14em] font-medium text-[#CBD5E1]">
              {navCategories.map((item) => (
                <button
                  key={item.cat}
                  type="button"
                  onClick={() => handleNavClick(item.cat)}
                  className="px-2.5 py-1 rounded-full hover:bg-white/[0.08] hover:text-[#00D4FF] transition-all duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-full hover:bg-white/[0.08] hover:text-[#00D4FF] transition-all duration-200"
              >
                Our Story
              </a>

              <a
                href="#visit"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1 rounded-full bg-[#00D4FF]/15 border border-[#00D4FF]/40 text-[#00D4FF] hover:bg-[#00D4FF]/25 shadow-[0_0_12px_rgba(0,212,255,0.25)] transition-all font-semibold"
              >
                Visit Us
              </a>
            </nav>
          </div>

          {/* =========================================================
              MOBILE VIEW: Logo on Left, SVGs & Buttons in Liquid Glass Pills
             ========================================================= */}
          <div className="flex lg:hidden items-center justify-between py-2 relative z-10">
            {/* Left: Official Brand Logo Emblem */}
            <a
              href="#"
              className="flex items-center shrink-0 group focus:outline-hidden"
              aria-label="Sunrise Legacy Interior Home"
            >
              <img
                src="/images/Screenshot_20261015-234655.jpg"
                alt="Sunrise Legacy Interior"
                referrerPolicy="no-referrer"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#00D4FF]/50 shadow-[0_0_15px_rgba(0,212,255,0.45)] group-hover:scale-105 transition-transform"
                onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
              />
            </a>

            {/* Right: All SVG Action Buttons in Liquid Glass Capsules */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search SVG Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-white hover:text-[#00D4FF] bg-white/[0.05] hover:bg-[#00D4FF]/15 border border-white/[0.08] hover:border-[#00D4FF]/40 rounded-full transition-all cursor-pointer backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4 stroke-[1.8]" />
              </button>


              {/* Animated Liquid Hamburger / Close Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer group active:scale-95 border ${
                  isMobileMenuOpen
                    ? 'bg-[#00D4FF]/20 border-[#00D4FF]/60 text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.1] hover:border-[#00D4FF]/50 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] hover:shadow-[0_0_16px_rgba(0,212,255,0.3)]'
                }`}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {/* Glow Halo behind bars on active/open */}
                <div
                  className={`absolute inset-0 rounded-full bg-[#00D4FF]/25 blur-sm transition-opacity duration-300 pointer-events-none ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                />

                {/* 3 Morphing Liquid Bars */}
                <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
                  {/* Top Bar */}
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isMobileMenuOpen
                        ? 'w-5 bg-[#00D4FF] translate-y-[7px] rotate-45'
                        : 'w-5 bg-white group-hover:bg-[#00D4FF]'
                    }`}
                  />

                  {/* Middle Bar (fades and shrinks out on open) */}
                  <span
                    className={`h-[2px] rounded-full transition-all duration-200 ease-out ${
                      isMobileMenuOpen
                        ? 'w-0 opacity-0 bg-[#00D4FF]'
                        : 'w-3.5 group-hover:w-5 bg-[#00D4FF] opacity-100'
                    }`}
                  />

                  {/* Bottom Bar */}
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${
                      isMobileMenuOpen
                        ? 'w-5 bg-[#00D4FF] -translate-y-[7px] -rotate-45'
                        : 'w-5 bg-white group-hover:bg-[#00D4FF]'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Brand Midnight Navy & Cyan Styling */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay with logo accent colors */}
          <div
            className="fixed inset-0 bg-[#070422]/85 backdrop-blur-md bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.15)_0%,_rgba(22,104,255,0.1)_40%,_transparent_75%)] transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 max-w-sm w-full bg-gradient-to-b from-[#0A072E]/98 via-[#0E0A3C]/95 to-[#070422]/98 shadow-[25px_0_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,212,255,0.15)] flex flex-col z-10 overflow-y-auto border-r border-white/[0.1] backdrop-blur-2xl animate-in slide-in-from-left duration-300 ease-out">
            {/* Drawer Header with Logo Image (CSS selector 2) */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/[0.08] bg-gradient-to-r from-[#070422]/95 via-[#0E0A3C]/90 to-[#070422]/95 backdrop-blur-xl relative shadow-[inset_0_-1px_0_rgba(0,212,255,0.15)] text-white">
              <div className="flex items-center gap-3">
                <img
                  src="/images/Screenshot_20261015-234655.jpg"
                  alt="Sunrise Legacy Interior"
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-[#00D4FF]/50 shadow-[0_0_16px_rgba(0,212,255,0.35)]"
                  onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
                />
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#00D4FF] font-bold">
                    Sunrise Legacy
                  </span>
                  <span className="text-[10px] tracking-[0.14em] text-[#94A3B8]">
                    Dopemu Showroom &middot; Lagos
                  </span>
                </div>
              </div>

              {/* Improved Liquid X Close Button (CSS selector 1) */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] hover:bg-[#00D4FF]/20 active:scale-95 border border-white/[0.12] hover:border-[#00D4FF]/60 text-white hover:text-[#00D4FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 backdrop-blur-md cursor-pointer group"
                aria-label="Close navigation"
              >
                {/* Glow Halo behind X on hover */}
                <div className="absolute inset-0 rounded-full bg-[#00D4FF]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <X className="w-5 h-5 stroke-[2] group-hover:rotate-90 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              </button>
            </div>

            {/* Quick Search Row (CSS selector 3) */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
              {/* Search Pill Button (CSS selector 4) */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#120E48]/75 via-[#1a1464]/60 to-[#120E48]/75 border border-white/[0.12] hover:border-[#00D4FF]/60 rounded-full text-xs text-[#94A3B8] hover:text-white shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Search className="w-4 h-4 text-[#00D4FF] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">Search cookware, fans, fabrics...</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#00D4FF] bg-[#00D4FF]/15 px-2.5 py-0.5 rounded-full font-semibold border border-[#00D4FF]/40 shadow-[0_0_8px_rgba(0,212,255,0.25)]">
                  Search
                </span>
              </button>
            </div>

            {/* Category Navigation Links Container (CSS selector 5) */}
            <div className="py-4 px-5 sm:px-6 flex-1 space-y-1.5 overflow-y-auto">
              {/* Collections Header Tag (CSS selector 6) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[10px] uppercase tracking-[0.22em] text-[#00D4FF] font-bold mb-3 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
                <span>Collections</span>
              </div>

              {navCategories.map((item) => (
                <button
                  key={item.cat}
                  onClick={() => handleNavClick(item.cat)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#E2E8F0] hover:text-white hover:bg-white/[0.07] border border-transparent hover:border-white/[0.1] text-left transition-all duration-200 cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}

              <div className="pt-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[10px] uppercase tracking-[0.22em] text-[#00D4FF] font-bold mb-3 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
                  <span>Showroom &amp; Story</span>
                </div>
              </div>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Our Story &amp; Ethos
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Bespoke Services &amp; Fit-Out
              </a>

              <a
                href="#visit"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Visit Dopemu Showroom
              </a>
            </div>

            {/* Mobile Drawer Footer with Compact WhatsApp Action */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-t from-[#05031D] via-[#070422] to-transparent border-t border-white/[0.08] space-y-2 text-center">
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Sunrise Legacy Interior, I am chatting from your mobile site.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#38BDF8] text-[#070422] text-[11px] font-bold tracking-wider uppercase hover:brightness-110 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#070422]" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="text-[10px] text-[#94A3B8]">
                <span>Greater Path Mall, Dopemu, Lagos</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
