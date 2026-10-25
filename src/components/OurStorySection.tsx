import React from 'react';

export const OurStorySection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#0A072E] border-t border-[#1E1868]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#00D4FF] font-bold block mb-2">
              Our Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12] mb-5">
              Your preferred shop for <span className="italic text-[#00D4FF]">household items &amp; general merchandise.</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed">
              <p>
                Sunrise Legacy Interior was established to make household shopping reliable, comprehensive, and effortless.
                Instead of searching across disjointed markets for cookware, appliances, bed linen, lighting, and textiles,
                we curate everyday essentials and lifestyle merchandise under one trusted roof.
              </p>
              <p>
                Every product is inspected for genuine build quality; every kitchen appliance is tested for lasting performance;
                and our fabrics and lifestyle goods are selected with an eye for durability, comfort, and value.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 mt-6 border-t border-[#1E1868] text-left">
              <div>
                <span className="font-serif text-3xl text-white block tabular-nums font-semibold">8+</span>
                <span className="text-[11px] text-[#00D4FF] font-medium mt-0.5 block">Store Categories</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-white block tabular-nums font-semibold">500+</span>
                <span className="text-[11px] text-[#00D4FF] font-medium mt-0.5 block">Showroom Pieces</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-white block tabular-nums font-semibold">100%</span>
                <span className="text-[11px] text-[#00D4FF] font-medium mt-0.5 block">Inspected Quality</span>
              </div>
            </div>
          </div>

          {/* Right Single Atmospheric Image with Logo Accent Border & Overlay */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#070422] border border-[#1E1868] shadow-2xl">
              <img
                src="images/cat_bedding.jpg"
                alt="Belgian washed linen duvet and natural oak bed in morning light"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070422]/70 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,212,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
