import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  X,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProductCategory, StoreConfig } from '../types';

interface HeaderProps {
  storeConfig: StoreConfig;
  selectedCategory: ProductCategory;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

interface DepartmentNavItem {
  num: string;
  label: string;
  cat: ProductCategory;
  count: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  storeConfig,
  selectedCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const navPanelRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => closeBtnRef.current?.focus(), 60);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setTimeout(() => menuToggleRef.current?.focus(), 30);
        return;
      }

      if (e.key === 'Tab' && navPanelRef.current) {
        const focusable = navPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navCategories: DepartmentNavItem[] = [
    {
      num: '00',
      label: 'All Collections',
      cat: 'All',
      count: '22 items',
      subtitle: 'Complete Greater Path Mall retail and wholesale inventory',
    },
    {
      num: '01',
      label: 'Home Appliances',
      cat: 'Home Appliances',
      count: '5 items',
      subtitle: 'Blenders, electric kettles, air fryers, and steam irons',
    },
    {
      num: '02',
      label: 'Electronics & Accessories',
      cat: 'Electronics & Accessories',
      count: '4 items',
      subtitle: 'Portable audio speakers, extension boxes, and charging gear',
    },
    {
      num: '03',
      label: 'Lighting & Home Improvement',
      cat: 'Lighting & Home Improvement',
      count: '4 items',
      subtitle: 'LED fixtures, rechargeable bulbs, switches, and sockets',
    },
    {
      num: '04',
      label: 'Clothing',
      cat: 'Clothing',
      count: '4 items',
      subtitle: 'Tailored two-piece sets, shirts, and everyday apparel',
    },
    {
      num: '05',
      label: 'Footwear',
      cat: 'Footwear',
      count: '3 items',
      subtitle: 'Leather loafers, structured sandals, and casual sneakers',
    },
    {
      num: '06',
      label: 'Fragrances',
      cat: 'Fragrances',
      count: '2 items',
      subtitle: 'Long-lasting bottled scents for home and personal wear',
    },
  ];

  const pageSections = [
    { label: 'Store Departments', target: 'categories' },
    { label: 'Clothing & Footwear Lookbook', target: 'inspiration' },
    { label: 'Store Catalogue', target: 'catalog' },
    { label: 'About Our Store', target: 'about' },
    { label: 'How You Can Shop', target: 'services' },
    { label: 'Visit & Contact', target: 'visit' },
  ];

  const closeMenu = (restoreFocus = false) => {
    setIsMenuOpen(false);
    if (restoreFocus) {
      setTimeout(() => menuToggleRef.current?.focus(), 40);
    }
  };

  const handleNavClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    closeMenu(false);
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 140);
  };

  const handleSectionClick = (sectionId: string) => {
    closeMenu(false);
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 140);
  };

  const overlayDuration = prefersReducedMotion ? 0 : 0.24;
  const itemDuration = prefersReducedMotion ? 0 : 0.22;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
          isScrolled ? 'editorial-nav-bar-scrolled' : 'editorial-nav-bar'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-3">
          {/* LEFT: Single-Line Brand Mark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 rounded-md min-w-0"
            aria-label="Sunrise Legacy Interior Home"
          >
            <img
              src="/images/Screenshot_20261015-234655.jpg"
              alt="Sunrise Legacy Interior logo"
              referrerPolicy="no-referrer"
              className="h-8 w-8 min-[360px]:h-9 min-[360px]:w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-1 ring-slate-200 group-hover:ring-blue-700 transition-all duration-300 shrink-0"
              onError={(e) => {
                e.currentTarget.src = '/images/logo.png';
              }}
            />
            <span className="font-serif text-[15px] min-[360px]:text-[17px] sm:text-xl font-semibold tracking-tight text-[#0F172A] leading-none group-hover:text-blue-700 transition-colors whitespace-nowrap">
              Sunrise Legacy<span className="hidden min-[440px]:inline"> Interior</span>
            </span>
          </a>

          {/* RIGHT: Utility Actions + Architectural Hamburger Toggle */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center justify-center gap-2 min-w-[44px] h-11 md:w-auto md:px-3 text-xs font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-md transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
              aria-label="Search store catalogue"
              title="Search"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.75]" />
              <span className="hidden md:inline whitespace-nowrap">Search</span>
            </button>

            {/* Saved Items Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="hidden sm:flex relative items-center justify-center min-w-[44px] h-11 text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-md transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
              aria-label={`Saved items (${wishlistCount})`}
              title="Saved Items"
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 bg-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center justify-center gap-1.5 min-w-[44px] h-11 sm:w-auto sm:px-3 text-slate-700 hover:text-blue-700 hover:bg-slate-100/80 rounded-md transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
              aria-label={`Shopping bag (${cartCount})`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.75]" />
              <span className="hidden md:inline text-xs font-medium whitespace-nowrap">Bag</span>
              {cartCount > 0 && (
                <span className="min-w-[17px] h-[17px] px-1 bg-blue-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums leading-none absolute sm:static top-1.5 right-1">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="w-[1px] h-5 bg-slate-200 mx-1 hidden sm:block" aria-hidden="true" />

            {/* Universal Hamburger Menu Button (Visible on all viewports, >= 44x44 touch target) */}
            <button
              ref={menuToggleRef}
              type="button"
              id="main-navigation-toggle"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation-drawer"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`group inline-flex items-center justify-center gap-2.5 min-w-[44px] h-11 px-2.5 min-[420px]:px-3.5 rounded-md border transition-colors duration-200 active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 ${
                isMenuOpen
                  ? 'bg-blue-700 border-blue-700 text-white hover:bg-blue-800'
                  : 'bg-white border-slate-300 text-[#0F172A] hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <span
                className="relative w-[18px] h-[14px] flex items-center justify-center pointer-events-none shrink-0"
                aria-hidden="true"
              >
                <span
                  className={`absolute left-0 w-[18px] h-[1.5px] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    isMenuOpen
                      ? 'top-[6.25px] rotate-45 bg-white'
                      : 'top-[1.25px] bg-current'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6.25px] w-[18px] h-[1.5px] transition-all duration-150 origin-center ${
                    isMenuOpen
                      ? 'opacity-0 scale-x-50 bg-white'
                      : 'opacity-100 scale-x-100 bg-current'
                  }`}
                />
                <span
                  className={`absolute left-0 w-[18px] h-[1.5px] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    isMenuOpen
                      ? 'top-[6.25px] -rotate-45 bg-white'
                      : 'top-[11.25px] bg-current'
                  }`}
                />
              </span>
              <span className="hidden min-[420px]:inline text-[11px] font-semibold tracking-[0.14em] uppercase leading-none">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className="h-16 sm:h-[72px] shrink-0 pt-[env(safe-area-inset-top)]" aria-hidden="true" />

      {/* FULL-CANVAS ARCHITECTURAL NAVIGATION MENU (320px to 1920px) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            id="main-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Store Navigation Menu"
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Subtle Backdrop behind architectural panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: overlayDuration }}
              onClick={() => closeMenu(true)}
              className="fixed inset-0 bg-slate-950/35 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Main Navigation Surface */}
            <motion.nav
              ref={navPanelRef}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: overlayDuration, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Store Departments and Showroom Information"
              className="relative z-10 w-full h-full bg-white text-[#0F172A] flex flex-col overflow-hidden"
            >
              {/* Menu Header Bar (Aligned directly to storefront header grid) */}
              <div className="border-b border-slate-200 bg-white shrink-0 pt-[env(safe-area-inset-top)]">
                <div className="max-w-7xl mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 rounded-md min-w-0"
                  >
                    <img
                      src="/images/Screenshot_20261015-234655.jpg"
                      alt="Sunrise Legacy Interior logo"
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 min-[360px]:h-9 min-[360px]:w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = '/images/logo.png';
                      }}
                    />
                    <div className="min-w-0">
                      <span className="font-serif text-[16px] min-[360px]:text-lg sm:text-xl font-semibold tracking-tight text-[#0F172A] group-hover:text-blue-700 transition-colors block leading-none truncate">
                        Sunrise Legacy Interior
                      </span>
                      <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-slate-500 font-medium mt-1">
                        Greater Path Mall, Dopemu
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Subtle desktop shortcut status */}
                    <span className="hidden lg:inline-block text-xs text-slate-500 mr-2 tabular-nums">
                      {cartCount} in bag · {wishlistCount} saved
                    </span>

                    <button
                      ref={closeBtnRef}
                      type="button"
                      onClick={() => closeMenu(true)}
                      className="inline-flex items-center justify-center gap-2 min-w-[44px] h-11 px-2.5 min-[420px]:px-3.5 rounded-md border border-slate-300 bg-white hover:border-[#0F172A] hover:bg-slate-50 active:scale-[0.98] text-[#0F172A] transition-colors duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 shrink-0"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-4 h-4 stroke-[1.85]" />
                      <span className="hidden min-[420px]:inline text-[11px] font-semibold uppercase tracking-[0.14em] leading-none">
                        Close
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Scrollable Body */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col">
                <div className="max-w-7xl mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-10 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
                    {/* COLUMN 1: PRIMARY DEPARTMENTS */}
                    <div className="md:col-span-7 lg:col-span-5 py-6 sm:py-8 lg:py-10 md:pr-8 lg:pr-8 xl:pr-10">
                      {/* Mobile & Compact Screen Utility Row */}
                      <div className="md:hidden mb-6 space-y-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            closeMenu(false);
                            onOpenSearch();
                          }}
                          className="w-full flex items-center justify-between px-4 min-h-[44px] py-2.5 bg-[#F8F9FA] hover:bg-blue-50/60 border border-slate-200 hover:border-blue-600 rounded-md text-xs font-medium text-slate-700 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                        >
                          <span className="flex items-center gap-2.5">
                            <Search className="w-4 h-4 text-blue-700 shrink-0" />
                            <span>Search store catalogue...</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </button>

                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              closeMenu(false);
                              onOpenWishlist();
                            }}
                            className="flex items-center justify-between gap-2 px-3.5 min-h-[44px] py-2 rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-800 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                          >
                            <span className="flex items-center gap-2">
                              <Heart className="w-4 h-4 text-blue-700 shrink-0" />
                              <span>Saved</span>
                            </span>
                            <span className="text-[11px] font-semibold tabular-nums text-blue-700">
                              {wishlistCount}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              closeMenu(false);
                              onOpenCart();
                            }}
                            className="flex items-center justify-between gap-2 px-3.5 min-h-[44px] py-2 rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-800 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                          >
                            <span className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-blue-700 shrink-0" />
                              <span>Bag</span>
                            </span>
                            <span className="text-[11px] font-semibold tabular-nums text-blue-700">
                              {cartCount}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between pb-3 border-b border-slate-200">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-blue-700 font-semibold">
                          Departments
                        </span>
                        <span className="text-xs text-slate-500">
                          Retail and Wholesale
                        </span>
                      </div>

                      <ul className="divide-y divide-slate-100 mt-1">
                        {navCategories.map((item, idx) => {
                          const isActive = selectedCategory === item.cat;
                          return (
                            <motion.li
                              key={item.cat}
                              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: itemDuration,
                                delay: prefersReducedMotion ? 0 : 0.03 + idx * 0.025,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => handleNavClick(item.cat)}
                                className={`w-full flex items-center justify-between gap-3 py-3.5 sm:py-4 px-2.5 min-h-[52px] text-left transition-colors duration-150 group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 rounded-md ${
                                  isActive
                                    ? 'bg-blue-50/75'
                                    : 'hover:bg-[#F8F9FA]'
                                }`}
                              >
                                <div className="flex items-baseline gap-3.5 min-w-0">
                                  <span
                                    className={`text-xs font-mono tabular-nums font-semibold shrink-0 transition-colors ${
                                      isActive
                                        ? 'text-blue-700'
                                        : 'text-slate-400 group-hover:text-blue-700'
                                    }`}
                                  >
                                    {item.num}
                                  </span>
                                  <div className="min-w-0">
                                    <span
                                      className={`font-serif text-[22px] sm:text-[26px] leading-[1.15] block transition-colors ${
                                        isActive
                                          ? 'text-blue-700 font-semibold'
                                          : 'text-[#0F172A] font-normal group-hover:text-blue-700'
                                      }`}
                                    >
                                      {item.label}
                                    </span>
                                    <span className="hidden sm:block text-xs text-slate-500 mt-0.5 leading-snug">
                                      {item.subtitle}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5 shrink-0">
                                  <span
                                    className={`text-xs tabular-nums whitespace-nowrap ${
                                      isActive
                                        ? 'text-blue-700 font-semibold'
                                        : 'text-slate-500'
                                    }`}
                                  >
                                    {isActive ? `Active · ${item.count}` : item.count}
                                  </span>
                                  <ArrowRight
                                    className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
                                      isActive
                                        ? 'text-blue-700'
                                        : 'text-slate-400 group-hover:text-blue-700'
                                    }`}
                                  />
                                </div>
                              </button>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* RIGHT WRAPPER: STORE GUIDE + DOPEMU SHOWROOM CONCIERGE */}
                    <div className="md:col-span-5 lg:col-span-7 md:border-l md:border-slate-200 flex flex-col lg:grid lg:grid-cols-12">
                      {/* COLUMN 2: STORE SECTIONS & SEARCH/TOOLS */}
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: itemDuration,
                          delay: prefersReducedMotion ? 0 : 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="lg:col-span-6 xl:col-span-5 py-6 sm:py-8 lg:py-10 md:pl-7 lg:px-6 xl:px-8 border-t border-slate-200 md:border-t-0 flex flex-col justify-between gap-7"
                      >
                        <div className="space-y-6">
                          {/* Desktop / Tablet Search & Bag Quick Actions */}
                          <div className="hidden md:block space-y-2.5">
                            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold block pb-2 border-b border-slate-200">
                              Quick Access
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                closeMenu(false);
                                onOpenSearch();
                              }}
                              className="w-full flex items-center justify-between gap-2 px-3.5 min-h-[44px] py-2.5 bg-[#F8F9FA] hover:bg-blue-50/70 border border-slate-200 hover:border-blue-600 rounded-md text-xs font-medium text-slate-700 hover:text-[#0F172A] transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                            >
                              <span className="flex items-center gap-2 whitespace-nowrap">
                                <Search className="w-4 h-4 text-blue-700 shrink-0" />
                                <span>Search catalogue...</span>
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            </button>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  closeMenu(false);
                                  onOpenWishlist();
                                }}
                                className="flex items-center justify-between gap-1.5 px-2.5 xl:px-3 min-h-[44px] py-2 rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 whitespace-nowrap"
                              >
                                <span className="flex items-center gap-1.5">
                                  <Heart className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                                  <span>Saved</span>
                                </span>
                                <span className="text-[11px] font-semibold tabular-nums text-slate-900">
                                  {wishlistCount}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  closeMenu(false);
                                  onOpenCart();
                                }}
                                className="flex items-center justify-between gap-1.5 px-2.5 xl:px-3 min-h-[44px] py-2 rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-700 hover:text-blue-700 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 whitespace-nowrap"
                              >
                                <span className="flex items-center gap-1.5">
                                  <ShoppingBag className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                                  <span>Bag</span>
                                </span>
                                <span className="text-[11px] font-semibold tabular-nums text-slate-900">
                                  {cartCount}
                                </span>
                              </button>
                            </div>
                          </div>

                          {/* Storefront Chapters */}
                          <div>
                            <div className="pb-3 mb-2 border-b border-slate-200">
                              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                                Inside the Store
                              </span>
                            </div>

                            <ul className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-1 gap-1">
                              {pageSections.map((sec) => (
                                <li key={sec.target}>
                                  <button
                                    type="button"
                                    onClick={() => handleSectionClick(sec.target)}
                                    className="w-full flex items-center justify-between px-2.5 min-h-[44px] py-2 rounded-md text-[13px] font-medium text-slate-700 hover:text-blue-700 hover:bg-[#F8F9FA] text-left transition-colors group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                                  >
                                    <span className="leading-snug">{sec.label}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Subtle Payment & Pickup Assurances */}
                        <div className="hidden lg:block pt-5 border-t border-slate-200 text-xs text-slate-500 leading-relaxed space-y-1.5">
                          <p className="font-medium text-slate-800">
                            In-Store Pickup &amp; Lagos Dispatch
                          </p>
                          <p>
                            Inspect items directly at Greater Path Mall or request doorstep delivery across Lagos and nationwide.
                          </p>
                        </div>
                      </motion.div>

                      {/* COLUMN 3: DOPEMU FLAGSHIP CONCIERGE */}
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: itemDuration,
                          delay: prefersReducedMotion ? 0 : 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="lg:col-span-6 xl:col-span-7 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-5 xl:px-8 border-t border-slate-200 lg:border-t-0 lg:border-l bg-[#F8F9FA] flex flex-col justify-between gap-6 rounded-md lg:rounded-none mb-6 md:mb-0"
                      >
                        <div className="space-y-5">
                          <div>
                            <span className="text-[11px] uppercase tracking-[0.18em] text-blue-700 font-semibold block">
                              Dopemu Showroom
                            </span>
                            <h2 className="font-serif text-2xl font-semibold text-[#0F172A] mt-1">
                              Visit Us in Person
                            </h2>
                          </div>

                          {/* Showroom Photo */}
                          <div className="overflow-hidden rounded-md border border-slate-200 bg-white aspect-[16/9]">
                            <img
                              src="/images/hero_showroom_desktop_800.webp"
                              alt="Inside Sunrise Legacy Interior showroom at Greater Path Mall, Dopemu"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center"
                              onError={(e) => {
                                e.currentTarget.src = '/images/hero_showroom_desktop.jpg';
                              }}
                            />
                          </div>

                          {/* Contact & Social Information */}
                          <div className="space-y-3 text-xs text-slate-700">
                            <div className="flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                              <span className="leading-relaxed font-medium text-slate-900">
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
                                className="font-semibold text-slate-900 hover:text-blue-700 transition-colors tabular-nums py-0.5"
                              >
                                {storeConfig.phone}
                              </a>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                              <a
                                href={`mailto:${storeConfig.email}`}
                                className="text-[11px] sm:text-xs font-medium text-slate-900 hover:text-blue-700 transition-colors break-words py-0.5"
                              >
                                {storeConfig.email}
                              </a>
                            </div>
                          </div>

                          {/* Social Channels */}
                          <div className="pt-4 border-t border-slate-200">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500 font-semibold block mb-2.5">
                              Follow Sunrise Legacy Interior
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              <a
                                href={storeConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 min-h-[40px] rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-800 hover:text-blue-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                              >
                                <span>Facebook</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              </a>
                              <a
                                href={storeConfig.social.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 min-h-[40px] rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-800 hover:text-blue-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                              >
                                <span>WhatsApp</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              </a>
                              <a
                                href={storeConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 min-h-[40px] rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-800 hover:text-blue-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                              >
                                <span>Instagram</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              </a>
                              <a
                                href={storeConfig.social.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 min-h-[40px] rounded-md border border-slate-200 bg-white hover:border-blue-600 text-xs font-medium text-slate-800 hover:text-blue-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700"
                              >
                                <span>TikTok</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Direct WhatsApp Concierge Action */}
                        <div className="pt-2">
                          <a
                            href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                              'Hello Sunrise Legacy Interior, I would like to enquire about items in your Dopemu store.'
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full min-h-[44px] py-3 px-4 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 whitespace-nowrap"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" />
                            <span>Message on WhatsApp</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
