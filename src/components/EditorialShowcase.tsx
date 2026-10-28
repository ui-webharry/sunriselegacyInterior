import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

interface EditorialShowcaseProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="inspiration" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.22em] text-blue-600 font-bold block mb-2">
            Everyday Household Essentials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
            Built for Real Living in <span className="italic text-blue-700 font-serif">Nigerian Homes</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2">
            High-torque blenders that handle tough beans and peppers, non-stick granite pots that resist scorching, and rechargeable fans that keep your family cool.
          </p>
        </div>

        {/* 2-Column Balanced Editorial Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Column 1: Luxury Chandeliers & Fans */}
          <div className="rounded-3xl bg-[#F8F9FA] p-6 sm:p-8 border border-slate-200 hover:border-blue-400 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-slate-200">
                <img
                  src="images/photo-9.jpg"
                  alt="Model 8140 Grand Crystal Spiral Chandelier"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-blue-600 font-bold block mb-1">
                Showroom Collection
              </span>
              <h3 className="font-serif text-2xl text-slate-900 font-medium tracking-[-0.03em] leading-[1.15] mb-3">
                Grand Crystal Chandeliers &amp; Smart Ceiling Fans
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                From our Art No 8140 2-meter spiral chandeliers to 42-inch retractable blade chandelier fans with Bluetooth speakers and POP ceiling LED fixtures.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('Lighting & Fans');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-blue-600 hover:text-blue-800 transition-colors self-start cursor-pointer"
            >
              <span>Explore Chandeliers &amp; Fans</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>

          {/* Column 2: Granite Pots & Everyday Appliances */}
          <div className="rounded-3xl bg-[#F8F9FA] p-6 sm:p-8 border border-slate-200 hover:border-blue-400 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-slate-200">
                <img
                  src="images/photo-2.jpg"
                  alt="Granite non-stick cooking pots and tableware"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.18em] text-blue-600 font-bold block mb-1">
                Kitchen &amp; Household
              </span>
              <h3 className="font-serif text-2xl text-slate-900 font-medium tracking-[-0.03em] leading-[1.15] mb-3">
                Granite Cooking Pots, Blenders &amp; Cutlery Sets
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Equip your home with heavy-duty non-stick cooking pot sets, commercial 1200W blenders, electric kettles, and luxury 24-piece stainless cutlery in gift presentation boxes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCategory('Kitchen & Dining');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-blue-600 hover:text-blue-800 transition-colors self-start cursor-pointer"
            >
              <span>Explore Cookware &amp; Appliances</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
