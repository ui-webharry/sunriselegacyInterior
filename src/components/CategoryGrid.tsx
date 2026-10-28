import React from 'react';
import { CATEGORIES_METADATA } from '../data/products';
import { ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#F8F7F4] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#966B24] font-bold block mb-2">
            The Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-[-0.035em] leading-[1.1] sm:leading-[1.12]">
            Curated by <span className="italic text-[#966B24]">Room &amp; Purpose</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#786E65] font-light mt-2">
            Explore our foundational pieces for the table, bedroom, living spaces, and tailoring atelier.
          </p>
        </div>

        {/* Clean, Mature Editorial Category Grid */}
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
              {/* Image Frame with Warm Ivory Finish & Subtle Lift */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFECE6] mb-3 border border-[#E8E3DA] group-hover:border-[#966B24]/60 transition-all shadow-[0_2px_10px_rgba(45,38,30,0.04)] group-hover:shadow-[0_8px_25px_rgba(45,38,30,0.08)]">
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

                {/* Subtle soft vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />

                {/* Warm amber highlight on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(184,134,11,0.12)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Title & Count Below Image */}
              <div className="text-left">
                <h3 className="font-serif text-base sm:text-lg text-[#1A1714] group-hover:text-[#966B24] transition-colors leading-[1.16] tracking-[-0.025em] font-medium">
                  {cat.title}
                </h3>
                <span className="text-[11px] text-[#857A6F] font-light block mt-0.5">
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
