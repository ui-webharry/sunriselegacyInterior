import React from 'react';

export const OurStorySection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FAF9F6] border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#966B24] font-bold block mb-2">
              Who We Are
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1714] font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12] mb-5">
              Your preferred shop for <span className="italic text-[#966B24]">household items &amp; general merchandise.</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#574F46] font-light leading-relaxed">
              <p>
                Sunrise Legacy Interior was established to make household shopping in Lagos reliable, comprehensive, and effortless.
                Instead of searching through crowded open-air markets for cookware, appliances, bed linen, lighting, and textiles,
                we provide everyday home essentials and general merchandise under one trusted roof at Greater Path Mall, Dopemu.
              </p>
              <p>
                Every pot set is inspected for thickness and non-stick durability; every blender and rechargeable fan is tested for performance;
                and our duvet sets and lifestyle fabrics are selected to ensure comfort and lasting value.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 mt-6 border-t border-[#E8E3DA] text-left">
              <div>
                <span className="font-serif text-3xl text-[#1A1714] block tabular-nums font-semibold">8+</span>
                <span className="text-[11px] text-[#966B24] font-medium mt-0.5 block">Store Categories</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#1A1714] block tabular-nums font-semibold">500+</span>
                <span className="text-[11px] text-[#966B24] font-medium mt-0.5 block">Showroom Pieces</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#1A1714] block tabular-nums font-semibold">100%</span>
                <span className="text-[11px] text-[#966B24] font-medium mt-0.5 block">Tested Before Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Single Atmospheric Image with Warm Frame */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#EFECE6] border border-[#E8E3DA] shadow-[0_12px_40px_rgba(45,38,30,0.06)]">
              <img
                src="images/cat_bedding.jpg"
                alt="Luxury duvet sets, bedding, and home textiles at Sunrise Legacy Interior showroom"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
