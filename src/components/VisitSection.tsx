import React, { useState } from 'react';
import { MapPin, Clock, Phone, Send, Check } from 'lucide-react';
import { StoreConfig } from '../types';

interface VisitSectionProps {
  storeConfig: StoreConfig;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ storeConfig }) => {
  const [name, setName] = useState('');
  const [productLookingFor, setProductLookingFor] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted =
      `Hello Sunrise Legacy Interior,\n\n` +
      `My name is *${name}*.\n` +
      (productLookingFor ? `Looking for: *${productLookingFor}*\n` : '') +
      `Message: ${message}\n\n` +
      `Please let me know availability or showroom directions.`;

    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(formatted)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setProductLookingFor('');
      setMessage('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section id="visit" className="py-16 sm:py-20 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-xl mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.24em] text-blue-600 font-bold block mb-2">
            Showroom &amp; Enquiry
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
            Visit our showroom, or <span className="italic text-blue-700 font-serif">connect on WhatsApp.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2">
            Located at Greater Path Mall, Dopemu, Lagos (Shop 21 &amp; 22, Block B, 1st Floor). Inspect fabrics, test appliances &amp; cookware, or get instant assistance on WhatsApp.
          </p>
        </div>

        {/* 2-Column Split: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 block">
                    Showroom Address
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{storeConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 block">
                    Opening Hours
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{storeConfig.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 block">
                    Telephone
                  </span>
                  <a
                    href={`tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-blue-700 mt-0.5 block transition-colors"
                  >
                    {storeConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <svg
                    className="w-4.5 h-4.5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 block">
                    WhatsApp Orders &amp; Chat
                  </span>
                  <a
                    href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                      'Hello Sunrise Legacy Interior, I would like to enquire about visiting or ordering.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-emerald-700 mt-0.5 block transition-colors"
                  >
                    {storeConfig.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Enquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
            >
              <div>
                <h3 className="font-serif text-2xl font-normal text-slate-900">Direct Store Enquiry</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">
                  Leave a note with the items you need. We format your request and connect directly with you on WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-blue-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harrison Ifebhor"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Item or Category (Optional)
                </label>
                <input
                  type="text"
                  value={productLookingFor}
                  onChange={(e) => setProductLookingFor(e.target.value)}
                  placeholder="e.g. Blender, Electric Kettle, Cookware Set, Bed Linen, Fabric Meterage"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message / Special Request
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about dimensions, product specifications, showroom stock, or dispatch..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-98 ${
                  submitted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                    <span>Send via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Real Google Map Embed */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white p-2 shadow-xs">
          <iframe
            src={storeConfig.mapEmbedUrl}
            title="Sunrise Legacy Interior Showroom Location"
            className="w-full h-72 sm:h-80 rounded-2xl border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
