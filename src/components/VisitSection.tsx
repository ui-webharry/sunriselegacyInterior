import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send, Check, MessageCircle, Globe } from 'lucide-react';
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
    <section id="visit" className="py-16 sm:py-24 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block mb-2">
            07. Visit &amp; Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.08]">
            Visit our store, or <span className="italic text-blue-700 font-serif">reach us directly on WhatsApp.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-3 leading-relaxed">
            Find us at Greater Path Mall, Dopemu, Lagos (Shops 21 and 22, Block B, First Floor). Inspect lighting, test appliances and electronics, browse clothing and footwear, or message us directly on WhatsApp.
          </p>
        </div>

        {/* 2-Column Split: Contact Info & Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
          {/* Left: Verified Contact Info */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 divide-y divide-slate-100">
              <div className="flex items-start gap-3.5 pb-5">
                <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-700 block">
                    Showroom Address
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mt-1 leading-relaxed">
                    {storeConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-5">
                <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-700 block">
                    Opening Hours
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mt-1">
                    {storeConfig.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-5">
                <Phone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-700 block">
                    Telephone
                  </span>
                  <a
                    href={`tel:${storeConfig.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs sm:text-sm font-semibold text-[#0F172A] hover:text-blue-700 mt-1 block transition-colors tabular-nums"
                  >
                    {storeConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-5">
                <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-700 block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${storeConfig.email}`}
                    className="text-xs sm:text-sm font-semibold text-[#0F172A] hover:text-blue-700 mt-1 block transition-colors break-all"
                  >
                    {storeConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-5">
                <MessageCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-700 block">
                    WhatsApp Orders &amp; Chat
                  </span>
                  <a
                    href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                      'Hello Sunrise Legacy Interior, I would like to enquire about visiting or ordering.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-[#0F172A] hover:text-blue-700 mt-1 block transition-colors tabular-nums"
                  >
                    {storeConfig.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-5">
                <Globe className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-700 block mb-2">
                    Social Media Handles
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="font-semibold text-[#0F172A]">Facebook</span>
                      <a
                        href={storeConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-700 transition-colors"
                      >
                        {storeConfig.socialHandles.facebook}
                      </a>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="font-semibold text-[#0F172A]">WhatsApp</span>
                      <a
                        href={storeConfig.social.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-700 transition-colors tabular-nums"
                      >
                        {storeConfig.socialHandles.whatsapp}
                      </a>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="font-semibold text-[#0F172A]">Instagram</span>
                      <a
                        href={storeConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-700 transition-colors"
                      >
                        {storeConfig.socialHandles.instagram}
                      </a>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="font-semibold text-[#0F172A]">TikTok</span>
                      <a
                        href={storeConfig.social.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-700 transition-colors"
                      >
                        {storeConfig.socialHandles.tiktok}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Enquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-4"
            >
              <div>
                <h3 className="font-serif text-2xl font-normal text-[#0F172A]">
                  Direct Store Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Send us the item you are looking for and we will open your enquiry directly on WhatsApp.
                </p>
              </div>

              <div>
                <label htmlFor="visit-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-blue-700">*</span>
                </label>
                <input
                  id="visit-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F8F9FA] text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="visit-item" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Item or Category (Optional)
                </label>
                <input
                  id="visit-item"
                  type="text"
                  value={productLookingFor}
                  onChange={(e) => setProductLookingFor(e.target.value)}
                  placeholder="e.g. Blender, POP Light, Polo Shirt, Canvas Sneakers, Arabic Perfume"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F8F9FA] text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="visit-msg" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message / Request Details
                </label>
                <textarea
                  id="visit-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about availability, sizing, specifications, or dispatch..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-[#F8F9FA] text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-lg text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  submitted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-700 hover:bg-blue-800 text-white'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-2">
          <iframe
            src={storeConfig.mapEmbedUrl}
            title="Sunrise Legacy Interior Showroom Location"
            className="w-full h-72 sm:h-80 rounded-lg border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
