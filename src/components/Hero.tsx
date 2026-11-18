import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProductCategory, StoreConfig } from '../types';

interface HeroProps {
  storeConfig: StoreConfig;
  onExploreClick: () => void;
  onSelectCategory?: (cat: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ storeConfig, onExploreClick, onSelectCategory }) => {
  const prefersReducedMotion = useReducedMotion();

  const quickDepartments: { label: string; cat: ProductCategory }[] = [
    { label: 'Home Appliances', cat: 'Home Appliances' },
    { label: 'Electronics', cat: 'Electronics & Accessories' },
    { label: 'Lighting', cat: 'Lighting & Home Improvement' },
    { label: 'Clothing', cat: 'Clothing' },
    { label: 'Footwear', cat: 'Footwear' },
    { label: 'Arabic Perfumes', cat: 'Fragrances' },
  ];

  const handleJump = (cat: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      onExploreClick();
    }
  };

  return (
    <section id="hero" className="relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/*
          Breakpoint architecture:
          - 320px to 599px: Stacked copy + full-width 4:5 portrait showroom frame
          - 600px to 1023px (medium tablets): Stacked copy + full-width padded 16:10 rounded showcase container (no empty voids or tall crop)
          - 1024px+ (small laptops & desktops): Asymmetric 5/7 split so 4:3 showroom photo maintains crisp natural width without chopping left/right racks
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch lg:min-h-[500px] xl:min-h-[560px]">
          {/* Left Editorial Column (5 cols on lg+) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 px-4 sm:px-6 lg:px-10 py-7 sm:py-10 lg:py-12 xl:py-16 flex flex-col justify-between bg-[#F8F9FA] lg:bg-white lg:border-r border-slate-200"
          >
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-blue-700 font-semibold mb-3">
                <span>Greater Path Mall</span>
                <span aria-hidden="true">&middot;</span>
                <span>Dopemu, Lagos</span>
              </div>

              <h1
                className="font-serif text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.06] mb-4 sm:mb-5"
                style={{ fontSize: 'clamp(1.95rem, 3.6vw, 3.55rem)' }}
              >
                Home appliances, lighting, <span className="italic text-blue-700 font-serif">fashion &amp; daily electronics.</span>
              </h1>

              <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed mb-6 lg:mb-7 max-w-lg">
                Visit our Lagos store or order via WhatsApp for tested kitchen appliances, wireless audio and charging cables, POP and chandelier lighting, cotton clothing, everyday footwear, and imported Arabic perfumes.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3 mb-7 lg:mb-8">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                >
                  <span>Browse Catalogue</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Sunrise Legacy Interior, I would like to enquire about items in your store.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-blue-50/70 text-[#0F172A] border border-slate-300 hover:border-blue-400 text-xs uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer min-h-[44px] whitespace-nowrap"
                >
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Department Quick Index */}
            <div className="pt-4 sm:pt-5 border-t border-slate-200">
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold block mb-2">
                Store Departments
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-700">
                {quickDepartments.map((dept, index) => (
                  <React.Fragment key={dept.cat}>
                    <button
                      type="button"
                      onClick={() => handleJump(dept.cat)}
                      className="hover:text-blue-700 underline-offset-4 hover:underline transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {dept.label}
                    </button>
                    {index < quickDepartments.length - 1 && (
                      <span className="text-slate-300 select-none" aria-hidden="true">
                        /
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Media Column (7 cols on lg+): Intentional framing across all 11 breakpoints */}
          <div className="lg:col-span-7 px-4 pb-6 sm:px-6 sm:pb-8 lg:p-0 bg-[#F8F9FA] lg:bg-slate-100 flex items-stretch">
            <div className="relative w-full aspect-[4/5] min-[600px]:aspect-[16/10] lg:aspect-auto lg:min-h-full rounded-xl lg:rounded-none overflow-hidden bg-slate-100 border border-slate-200 lg:border-0">
              <motion.picture
                initial={prefersReducedMotion ? { opacity: 1 } : { scale: 1.02, opacity: 0.95 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="block w-full h-full"
              >
                {/* Dedicated portrait composition for phones (< 600px) */}
                <source
                  media="(max-width: 599px)"
                  type="image/webp"
                  srcSet="images/hero_showroom_mobile_600.webp 600w, images/hero_showroom_mobile_896.webp 896w"
                  sizes="100vw"
                />
                <source
                  media="(max-width: 599px)"
                  srcSet="images/hero_showroom_mobile.jpg"
                />

                {/* Medium tablets (600px-1023px) & Laptops/Desktops (1024px+) */}
                <source
                  type="image/webp"
                  srcSet="images/hero_showroom_desktop_800.webp 800w, images/hero_showroom_desktop_1200.webp 1200w"
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />
                <img
                  src="images/hero_showroom_desktop.jpg"
                  alt="Illustrative modern showroom and warehouse display featuring household appliances, electronics, lighting fixtures, organized clothing racks, and footwear shelving"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_42%] lg:object-center"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.picture>

              {/* Compact measured bottom scrim preserves visibility of footwear & lower shelves */}
              <div
                className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 text-white">
                <p className="text-[10px] uppercase tracking-[0.16em] text-blue-200 font-semibold mb-0.5">
                  Illustrative Display &middot; Shops 21 &amp; 22, Block B
                </p>
                <p className="font-serif text-base sm:text-xl font-normal leading-snug text-white max-w-lg">
                  Walk-in inspection and prompt dispatch from Greater Path Mall, Dopemu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Highlights Hairline Strip */}
      <div className="bg-[#F8F9FA] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <div className="grid grid-cols-1 min-[600px]:grid-cols-3 gap-5 md:gap-6 divide-y min-[600px]:divide-y-0 min-[600px]:divide-x divide-slate-200">
            <div className="flex items-center gap-3 pt-1 min-[600px]:pt-0">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">Inspected Before Handover</p>
                <p className="text-[11px] text-slate-500">Appliances, audio, lighting &amp; fashion checked pre-dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 min-[600px]:pt-0 min-[600px]:pl-5">
              <MapPin className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">Walk-In Store in Dopemu</p>
                <p className="text-[11px] text-slate-500">Mon to Sat, 8:30 AM to 7:00 PM at Greater Path Mall</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 min-[600px]:pt-0 min-[600px]:pl-5">
              <MessageCircle className="w-5 h-5 text-blue-700 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900">Single Pieces &amp; Wholesale</p>
                <p className="text-[11px] text-slate-500">Direct WhatsApp confirmation on live stock &amp; delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
