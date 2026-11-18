import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProductCategory } from '../types';

interface EditorialShowcaseProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({ onSelectCategory }) => {
  const prefersReducedMotion = useReducedMotion();

  const jumpToCategory = (cat: ProductCategory) => {
    onSelectCategory(cat);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inspiration" className="bg-white border-t border-slate-200">
      {/* CHAPTER 02: CLOTHING & FOOTWEAR SEPARATED EDITORIAL LOOKBOOK */}
      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-slate-200">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block mb-2">
              02. Clothing &amp; Footwear
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.08]">
              Clothing &amp; Footwear <span className="italic text-blue-700 font-serif">Collections</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            Browse our Clothing and Footwear sections separately, featuring real showroom video of fabrics, cuts, and everyday styles stocked in Dopemu.
          </p>
        </div>

        {/* Responsive Lookbook Split: Clothing vs Footwear */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 02.A Clothing Department */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/11] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mb-5">
              <video
                src="/assets/aistudio/clothing_showcase_video.mp4"
                poster="images/cat_clothing_poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-1.5">
                  <span>02.A</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Clothing Department</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] font-normal mb-2">
                  Polo Shirts, Graphic Tees, Jeans &amp; Casual Shirts
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                  Structured honeycomb piqué polos, heavyweight cotton t-shirts, tailored stretch denim jeans, and breathable short-sleeved shirts selected for daily wear.
                </p>
              </div>

              <button
                type="button"
                onClick={() => jumpToCategory('Clothing')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0F172A] hover:bg-blue-700 text-white text-xs uppercase tracking-wider font-semibold transition-colors shrink-0 self-start sm:self-end cursor-pointer min-h-[42px]"
              >
                <span>Shop Clothing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* 02.B Footwear Department */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:mt-8 group"
          >
            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mb-5">
              <video
                src="/assets/aistudio/footwear_showcase_video.mp4"
                poster="images/cat_footwear_poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-1.5">
                <span>02.B</span>
                <span aria-hidden="true">&middot;</span>
                <span>Footwear Department</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] font-normal mb-2">
                Canvas Sneakers, Children&apos;s Shoes &amp; Crocs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                Durable cotton canvas low-top sneakers, breathable lightweight kids&apos; shoes, and water-friendly cushioned Crocs clogs in sizes for the whole household.
              </p>

              <button
                type="button"
                onClick={() => jumpToCategory('Footwear')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                <span>Shop Footwear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CHAPTER 03: LIGHTING, HOME APPLIANCES & ELECTRONICS CONTRAST SPREAD */}
      <div className="bg-[#F8F9FA] border-t border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Image Composition */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src="images/photo-9.jpg"
                  alt="Crystal chandeliers, POP ceiling lighting, and outdoor solar flood lights"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mt-8">
                <img
                  src="images/photo-0.jpg"
                  alt="Heavy-duty blenders, portable juicers, electric kettles, microwaves, and handheld fans"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right Narrative & Quick Department Links */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block">
                03. Home, Lighting &amp; Daily Gear
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.08]">
                Built for everyday <span className="italic text-blue-700 font-serif">Nigerian homes.</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Alongside clothing and footwear, Sunrise Legacy Interior stocks kitchen appliances, home lighting fixtures, audio accessories, and imported Arabic perfumes tested before handover.
              </p>

              {/* Editorial Index Rows */}
              <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => jumpToCategory('Home Appliances')}
                  className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-xl text-slate-900 group-hover:text-blue-700 transition-colors block">
                      Home Appliances
                    </span>
                    <span className="text-xs text-slate-500">
                      Blenders &middot; Portable Juicers &middot; Electric Kettles &middot; Microwaves &middot; Rechargeable Handheld Fans
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </button>

                <button
                  type="button"
                  onClick={() => jumpToCategory('Lighting & Home Improvement')}
                  className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-xl text-slate-900 group-hover:text-blue-700 transition-colors block">
                      Lighting &amp; Home Improvement
                    </span>
                    <span className="text-xs text-slate-500">
                      POP Lights &middot; Crystal Chandeliers &middot; Solar Flood Lights &middot; Aluminum Ladders
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </button>

                <button
                  type="button"
                  onClick={() => jumpToCategory('Electronics & Accessories')}
                  className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-xl text-slate-900 group-hover:text-blue-700 transition-colors block">
                      Electronics &amp; Accessories
                    </span>
                    <span className="text-xs text-slate-500">
                      Bluetooth Speakers &middot; Headphones &middot; Fast-Charging &amp; Regular Cables
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </button>

                <button
                  type="button"
                  onClick={() => jumpToCategory('Fragrances')}
                  className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div>
                    <span className="font-serif text-xl text-slate-900 group-hover:text-blue-700 transition-colors block">
                      Fragrances
                    </span>
                    <span className="text-xs text-slate-500">
                      Authentic Arabic Perfumes &middot; Concentrated Perfume Oils
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
