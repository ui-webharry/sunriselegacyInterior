import React from 'react';
import { CATEGORIES_METADATA } from '../data/products';
import { ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] text-blue-600 font-bold block mb-2">
            The Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-[-0.035em] leading-[1.1] sm:leading-[1.12]">
            Curated by <span className="italic text-blue-700 font-serif">Room &amp; Purpose</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2">
            Explore our foundational pieces for the table, bedroom, living spaces, and tailoring atelier.
          </p>
        </div>

        {/* Clean, Modern Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_METADATA.map((cat) => (
            <div
              key={cat.title}
              onClick={() => {
                onSelectCategory(cat.category);
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Frame with Clean Border & Hover Lift */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-200 group-hover:border-blue-500 transition-all shadow-xs group-hover:shadow-md">
                {cat.video ? (
                  <video
                    src={cat.video}
                    poster={cat.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                {/* Subtle soft gradient scrim for image polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Title & Count Below Image */}
              <div className="text-left">
                <h3 className="font-serif text-base sm:text-lg text-slate-900 group-hover:text-blue-700 transition-colors leading-[1.16] tracking-[-0.028em] font-medium">
                  {cat.title}
                </h3>
                <span className="text-[11px] text-slate-500 font-normal block mt-0.5">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
