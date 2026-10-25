import React from 'react';
import { Store, MessageCircle, Building2, ArrowRight } from 'lucide-react';
import { StoreConfig } from '../types';

interface ServicesSectionProps {
  storeConfig: StoreConfig;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ storeConfig }) => {
  const services = [
    {
      icon: Store,
      title: 'In-Store Showroom',
      desc: 'Browse cookware, fans, appliances, and touch fabric bolts in person at our Dopemu showroom in Greater Path Mall.',
      action: 'Visit Showroom',
      href: '#visit',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Concierge',
      desc: 'Order from anywhere. Check live stock, request product videos or swatches, and arrange same-day Lagos dispatch.',
      action: 'Chat Concierge',
      href: `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
        'Hello Sunrise Legacy Interior, I would like to enquire about your shopping concierge.'
      )}`,
      external: true,
    },
    {
      icon: Building2,
      title: 'Bulk & Project Supply',
      desc: 'Furnishing an entire residence, short-let apartment, or office? Speak with our team for bulk pricing and trade orders.',
      action: 'Request Quote',
      href: `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
        'Hello Sunrise Legacy Interior, I would like to request a quote for a bulk/fit-out project.'
      )}`,
      external: true,
    },
  ];

  return (
    <section id="services" className="py-14 sm:py-18 bg-[#070422] border-t border-[#1E1868]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                className="p-6 sm:p-8 rounded-3xl bg-[#0E0A3C] border border-[#1E1868] flex flex-col justify-between shadow-lg transition-all hover:border-[#00D4FF] hover:bg-[#120E48] group"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#16105A] text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center mb-4 shadow-inner group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium mb-2 group-hover:text-[#00D4FF] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <a
                  href={srv.href}
                  target={srv.external ? '_blank' : undefined}
                  rel={srv.external ? 'noopener noreferrer' : undefined}
                  className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF] hover:text-[#38BDF8] inline-flex items-center gap-1.5 transition-colors self-start"
                >
                  <span>{srv.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF]" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
