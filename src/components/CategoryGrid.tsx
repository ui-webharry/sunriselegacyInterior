import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CATEGORIES_METADATA } from '../data/products';
import { ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 sm:mb-14 border-b border-slate-200">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block mb-2">
              01. Store Departments
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.08]">
              Shop Our <span className="italic text-blue-700 font-serif">Six Departments</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            Browse every section stocked at our Dopemu store, from home appliances and ceiling lighting to separate Clothing and Footwear departments.
          </p>
        </div>

        {/* Clean Architectural Responsive Grid */}
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
          {CATEGORIES_METADATA.map((cat, idx) => (
            <motion.article
              key={cat.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : idx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                onSelectCategory(cat.category);
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Media Frame */}
              <div className="relative aspect-[4/3] min-[600px]:aspect-[4/5] rounded-lg overflow-hidden bg-slate-100 mb-4 border border-slate-200 group-hover:border-blue-600 transition-colors duration-300">
                {cat.video ? (
                  <video
                    src={cat.video}
                    poster={cat.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Clean Unboxed Editorial Caption */}
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-2.5 mb-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[11px] font-mono tabular-nums text-blue-700 font-semibold">
                    {cat.number}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#0F172A] group-hover:text-blue-700 transition-colors font-medium">
                    {cat.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0" />
              </div>

              <p className="text-xs font-medium text-blue-700 mb-1">
                {cat.count}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {cat.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
