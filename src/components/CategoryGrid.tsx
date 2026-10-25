import React from 'react';
import { CATEGORIES_METADATA } from '../data/products';
import { ProductCategory } from '../types';

interface CategoryGridProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#070422] border-t border-[#1E1868]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#00D4FF] font-bold block mb-2">
            The Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-[-0.035em] leading-[1.1] sm:leading-[1.12]">
            Curated by <span className="italic text-[#00D4FF]">Room &amp; Purpose</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
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
              {/* Image Frame with Logo Accent Overlay & Border */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#0E0A3C] mb-3 border border-[#1E1868] group-hover:border-[#00D4FF] transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle logo color gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070422] via-[#070422]/30 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Cyan highlight sweep on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,212,255,0.2)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Title & Count Below Image */}
              <div className="text-left">
                <h3 className="font-serif text-base sm:text-lg text-white group-hover:text-[#00D4FF] transition-colors leading-[1.16] tracking-[-0.028em] font-medium">
                  {cat.title}
                </h3>
                <span className="text-[11px] text-[#94A3B8] font-light block mt-0.5">
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
