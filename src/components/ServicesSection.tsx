import React from 'react';
import { Store, PackageCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { StoreConfig } from '../types';

interface ServicesSectionProps {
  storeConfig: StoreConfig;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ storeConfig }) => {
  const prefersReducedMotion = useReducedMotion();

  const services = [
    {
      num: '01',
      icon: Store,
      title: 'In-Store Showroom',
      desc: 'Inspect blenders, fans, chandeliers, clothing, footwear, and perfumes in person at our Dopemu showroom in Greater Path Mall.',
      action: 'Visit Showroom',
      href: '#visit',
      external: false,
    },
    {
      num: '02',
      icon: MessageCircle,
      title: 'Direct WhatsApp Orders',
      desc: 'Order from anywhere. Confirm live stock, request product videos or sizing, and arrange same-day Lagos dispatch.',
      action: 'Chat on WhatsApp',
      href: `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
        'Hello Sunrise Legacy Interior, I would like to place an order or enquire about available stock.'
      )}`,
      external: true,
    },
    {
      num: '03',
      icon: PackageCheck,
      title: 'Wholesale & Bulk Orders',
      desc: 'Stocking your store or buying multiple units? Request wholesale pricing on appliances, lighting fixtures, electronics, clothing, and footwear.',
      action: 'Ask for Wholesale Prices',
      href: `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
        'Hello Sunrise Legacy Interior, I would like to enquire about wholesale pricing for appliances, lighting, electronics, clothing, and footwear.'
      )}`,
      external: true,
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block mb-2">
            06. How You Can Shop
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-[-0.03em]">
            Walk-in retail, WhatsApp &amp; <span className="italic text-blue-700 font-serif">wholesale orders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.title}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 sm:p-8 rounded-xl bg-[#F8F9FA] border border-slate-200 flex flex-col justify-between transition-colors hover:border-blue-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                    <span className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                      {srv.num}
                    </span>
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#0F172A] font-medium mb-3 group-hover:text-blue-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-8">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href={srv.href}
                  target={srv.external ? '_blank' : undefined}
                  rel={srv.external ? 'noopener noreferrer' : undefined}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 hover:text-blue-800 inline-flex items-center gap-2 transition-colors self-start"
                >
                  <span>{srv.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
