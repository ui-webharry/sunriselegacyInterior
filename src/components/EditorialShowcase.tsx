import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface EditorialShowcaseProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="inspiration" className="py-16 sm:py-24 bg-[#070422] border-t border-[#1E1868]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#00D4FF] font-bold block mb-2">
            The Living Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
            Materials that <span className="italic text-[#00D4FF]">age with grace</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            We focus on natural fibers, durable cookware, and ceramics that become richer with daily use.
          </p>
        </div>

        {/* 2-Column Balanced Editorial Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Column 1: Luxury Chandeliers & Fans */}
          <div className="rounded-3xl bg-[#0E0A3C] p-6 sm:p-8 border border-[#1E1868] hover:border-[#00D4FF] flex flex-col justify-between shadow-lg transition-colors group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#070422] mb-6 border border-[#1E1868]">
                <img
                  src="images/photo-9.jpg"
                  alt="Model 8140 Grand Crystal Spiral Chandelier"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Logo accent color overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070422]/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-[#00D4FF] font-bold block mb-1">
                Showroom Collection
              </span>
              <h3 className="font-serif text-2xl text-white font-medium tracking-[-0.03em] leading-[1.15] mb-3">
                Grand Crystal Chandeliers &amp; Smart Ceiling Fans
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                From our Art No 8140 2-meter spiral chandeliers to 42-inch retractable blade chandelier fans with Bluetooth speakers and POP ceiling LED fixtures.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('Lighting & Fans');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#00D4FF] hover:text-[#38BDF8] transition-colors self-start cursor-pointer"
            >
              <span>Explore Chandeliers &amp; Fans</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF]" />
            </button>
          </div>

          {/* Column 2: Granite Pots & Everyday Appliances */}
          <div className="rounded-3xl bg-[#0E0A3C] p-6 sm:p-8 border border-[#1E1868] hover:border-[#00D4FF] flex flex-col justify-between shadow-lg transition-colors group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#070422] mb-6 border border-[#1E1868]">
                <img
                  src="images/photo-2.jpg"
                  alt="Granite non-stick cooking pots and tableware"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Logo accent color overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070422]/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-[#00D4FF] font-bold block mb-1">
                Kitchen &amp; Household
              </span>
              <h3 className="font-serif text-2xl text-white font-medium tracking-[-0.03em] leading-[1.15] mb-3">
                Granite Cooking Pots, Blenders &amp; Cutlery Sets
              </h3>
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                Equip your home with heavy-duty non-stick cooking pot sets, commercial 1200W blenders, electric kettles, and luxury 24-piece stainless cutlery in gift presentation boxes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('Kitchen & Dining');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#00D4FF] hover:text-[#38BDF8] transition-colors self-start cursor-pointer"
            >
              <span>Explore Cookware &amp; Appliances</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
