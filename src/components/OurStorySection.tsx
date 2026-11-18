import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const OurStorySection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Narrative */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block mb-2">
              05. About Our Store
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.08] mb-5">
              A trusted Lagos store for <span className="italic text-blue-700 font-serif">appliances, lighting, and daily style.</span>
            </h2>

            <div className="space-y-4 text-sm text-slate-600 font-normal leading-relaxed">
              <p>
                Sunrise Legacy Interior makes everyday shopping in Lagos clear, reliable, and unhurried. At Greater Path Mall in Dopemu, customers inspect kitchen appliances, audio and charging gear, POP lights, chandeliers, clothing, footwear, and Arabic perfumes in one location.
              </p>
              <p>
                Every blender, portable juicer, electric kettle, and handheld fan is tested prior to handover. Lighting fixtures are checked before packing, and clothing and footwear shelves are grouped clearly for quick everyday selection.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-slate-200 text-left">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#0F172A] block tabular-nums font-medium">
                  06
                </span>
                <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
                  Store Departments
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#0F172A] block tabular-nums font-medium">
                  22
                </span>
                <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
                  Product Lines
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#0F172A] block tabular-nums font-medium">
                  100%
                </span>
                <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
                  Checked Before Dispatch
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Illustrative Warehouse/Showroom Image */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <picture className="block w-full h-full">
                <source
                  type="image/webp"
                  srcSet="images/showroom_aisle_display_900.webp"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
                <img
                  src="images/showroom_aisle_display.jpg"
                  alt="Illustrative warehouse and showroom aisle showcasing boxed appliances, headphones, charging cables, solar lights, chandeliers, and a folding step ladder"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </picture>
            </div>
            <p className="text-[11px] text-slate-500 mt-2.5">
              Illustrative merchandising display representing categories stocked at Greater Path Mall, Dopemu.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
