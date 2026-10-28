import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface EditorialShowcaseProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="inspiration" className="py-16 sm:py-24 bg-[#F4F1EA] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#966B24] font-bold block mb-2">
            Everyday Household Essentials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
            Built for Real Living in <span className="italic text-[#966B24]">Nigerian Homes</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#786E65] font-light mt-2">
            High-torque blenders that handle tough beans and peppers, non-stick granite pots that resist scorching, and rechargeable fans that keep your family cool.
          </p>
        </div>

        {/* 2-Column Balanced Editorial Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Column 1: Luxury Chandeliers & Fans */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#E8E3DA] hover:border-[#966B24]/60 flex flex-col justify-between shadow-[0_4px_20px_rgba(45,38,30,0.04)] hover:shadow-[0_12px_32px_rgba(45,38,30,0.07)] transition-all group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EFECE6] mb-6 border border-[#E8E3DA]">
                <img
                  src="images/photo-9.jpg"
                  alt="Model 8140 Grand Crystal Spiral Chandelier"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-[#966B24] font-bold block mb-1">
                Showroom Collection
              </span>
              <h3 className="font-serif text-2xl text-[#1A1714] font-medium tracking-[-0.03em] leading-[1.15] mb-3">
                Grand Crystal Chandeliers &amp; Smart Ceiling Fans
              </h3>
              <p className="text-xs sm:text-sm text-[#574F46] font-light leading-relaxed mb-6">
                From our Art No 8140 2-meter spiral chandeliers to 42-inch retractable blade chandelier fans with Bluetooth speakers and POP ceiling LED fixtures.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('Lighting & Fans');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#966B24] hover:text-[#835C1D] transition-colors self-start cursor-pointer"
            >
              <span>Explore Chandeliers &amp; Fans</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#966B24]" />
            </button>
          </div>

          {/* Column 2: Granite Pots & Everyday Appliances */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#E8E3DA] hover:border-[#966B24]/60 flex flex-col justify-between shadow-[0_4px_20px_rgba(45,38,30,0.04)] hover:shadow-[0_12px_32px_rgba(45,38,30,0.07)] transition-all group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#EFECE6] mb-6 border border-[#E8E3DA]">
                <img
                  src="images/photo-2.jpg"
                  alt="Granite non-stick cooking pots and tableware"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-[#966B24] font-bold block mb-1">
                Kitchen &amp; Household
              </span>
              <h3 className="font-serif text-2xl text-[#1A1714] font-medium tracking-[-0.03em] leading-[1.15] mb-3">
                Granite Cooking Pots, Blenders &amp; Cutlery Sets
              </h3>
              <p className="text-xs sm:text-sm text-[#574F46] font-light leading-relaxed mb-6">
                Equip your home with heavy-duty non-stick cooking pot sets, commercial 1200W blenders, electric kettles, and luxury 24-piece stainless cutlery in gift presentation boxes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('Kitchen & Dining');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#966B24] hover:text-[#835C1D] transition-colors self-start cursor-pointer"
            >
              <span>Explore Cookware &amp; Appliances</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#966B24]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
