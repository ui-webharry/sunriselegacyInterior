import React from 'react';
import { Store, Building2, ArrowRight } from 'lucide-react';
import { StoreConfig } from '../types';

interface ServicesSectionProps {
  storeConfig: StoreConfig;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className || 'w-5 h-5 fill-current'}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
  </svg>
);

export const ServicesSection: React.FC<ServicesSectionProps> = ({ storeConfig }) => {
  const services = [
    {
      icon: Store,
      title: 'In-Store Showroom',
      desc: 'Browse cookware, fans, appliances, and touch fabric bolts in person at our Dopemu showroom in Greater Path Mall.',
      action: 'Visit Showroom',
      href: '#visit',
      external: false,
      boxClass: 'bg-[#16105A] text-[#00D4FF] border-[#00D4FF]/30',
      titleClass: 'group-hover:text-[#00D4FF]',
      actionClass: 'text-[#00D4FF] hover:text-[#38BDF8]',
    },
    {
      icon: WhatsAppIcon,
      title: 'Direct WhatsApp Orders',
      desc: 'Order from anywhere. Check live stock, request product videos or swatches, and arrange same-day Lagos dispatch.',
      action: 'Chat on WhatsApp',
      href: `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
        'Hello Sunrise Legacy Interior, I would like to place an order or enquire about available stock.'
      )}`,
      external: true,
      boxClass: 'bg-[#25D366]/15 text-[#25D366] border-[#25D366]/40 shadow-[0_0_15px_rgba(37,211,102,0.25)]',
      titleClass: 'group-hover:text-[#25D366]',
      actionClass: 'text-[#25D366] hover:text-emerald-300',
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
      boxClass: 'bg-[#16105A] text-[#00D4FF] border-[#00D4FF]/30',
      titleClass: 'group-hover:text-[#00D4FF]',
      actionClass: 'text-[#00D4FF] hover:text-[#38BDF8]',
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
                  <div
                    className={`w-10 h-10 rounded-2xl border flex items-center justify-center mb-4 shadow-inner group-hover:scale-105 transition-transform ${srv.boxClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className={`font-serif text-xl text-white font-medium mb-2 transition-colors ${srv.titleClass}`}
                  >
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
                  className={`text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors self-start ${srv.actionClass}`}
                >
                  <span>{srv.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
