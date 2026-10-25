import React, { useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, Send, Check } from 'lucide-react';
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
    <section id="visit" className="py-16 sm:py-20 bg-[#0A072E] border-t border-[#1E1868]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-xl mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#00D4FF] font-bold block mb-2">
            Showroom &amp; Enquiry
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
            Visit our showroom, or <span className="italic text-[#00D4FF]">message our concierge.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            Located at Greater Path Mall, Dopemu, Lagos (Shop 21 &amp; 22, Block B, 1st Floor). Touch fabrics, explore appliances &amp; cookware, or receive instant WhatsApp recommendations.
          </p>
        </div>

        {/* 2-Column Split: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0E0A3C] border border-[#1E1868] space-y-5 shadow-lg">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#16105A] text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#38BDF8] block">
                    Showroom Address
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white mt-0.5">{storeConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#1E1868]">
                <div className="w-9 h-9 rounded-xl bg-[#16105A] text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#38BDF8] block">
                    Opening Hours
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white mt-0.5">{storeConfig.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#1E1868]">
                <div className="w-9 h-9 rounded-xl bg-[#16105A] text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#38BDF8] block">
                    Telephone
                  </span>
                  <a
                    href={`tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs sm:text-sm font-medium text-white hover:text-[#00D4FF] mt-0.5 block transition-colors"
                  >
                    {storeConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#1E1868]">
                <div className="w-9 h-9 rounded-xl bg-[#16105A] text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#38BDF8] block">
                    WhatsApp Concierge
                  </span>
                  <a
                    href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                      'Hello Sunrise Legacy Interior, I would like to enquire about visiting or ordering.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-medium text-white hover:text-[#00D4FF] mt-0.5 block transition-colors"
                  >
                    {storeConfig.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                'Hello Sunrise Legacy Interior, I am planning a visit to your showroom.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-[#120E48] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#181358] border border-[#00D4FF]/50 hover:border-[#00D4FF] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#00D4FF]" />
              <span>Chat with Showroom on WhatsApp</span>
            </a>
          </div>

          {/* Right: Direct Enquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-[#0E0A3C] border border-[#1E1868] shadow-lg space-y-4"
            >
              <div>
                <h3 className="font-serif text-2xl font-normal text-white">Direct Store Enquiry</h3>
                <p className="text-xs text-[#94A3B8] font-light mt-1">
                  Leave a note with what you need. We format your inquiry and connect directly to our concierge on WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Full Name <span className="text-[#00D4FF]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harrison Ifebhor"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1E1868] bg-[#120E48] text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Item or Category (Optional)
                </label>
                <input
                  type="text"
                  value={productLookingFor}
                  onChange={(e) => setProductLookingFor(e.target.value)}
                  placeholder="e.g. Blender, Electric Kettle, Cookware Set, Bed Linen, Fabric Meterage"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1E1868] bg-[#120E48] text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Message / Special Request
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about dimensions, product specifications, showroom stock, or dispatch..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1E1868] bg-[#120E48] text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF] transition-colors"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  submitted
                    ? 'bg-[#059669] text-white'
                    : 'bg-[#00D4FF] text-[#070422] hover:bg-[#38BDF8] shadow-[0_0_20px_rgba(0,212,255,0.35)]'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#070422] stroke-[2.5]" />
                    <span>Send via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Real Google Map Embed */}
        <div className="rounded-3xl overflow-hidden border border-[#1E1868] bg-[#0E0A3C] p-2 shadow-lg">
          <iframe
            src={storeConfig.mapEmbedUrl}
            title="Sunrise Legacy Interior Showroom Location"
            className="w-full h-72 sm:h-80 rounded-2xl border-0 filter brightness-[0.9] contrast-[1.1]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
