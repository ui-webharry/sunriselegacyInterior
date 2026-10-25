import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, StoreConfig } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  storeConfig: StoreConfig;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  storeConfig,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExplore,
}) => {
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [_orderPlaced, setOrderPlaced] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowDirectForm(false);
      setOrderPlaced(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = storeConfig.freeShippingThreshold || 50000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const itemsSummary = items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (x${item.quantity})` +
          (item.selectedSize ? ` - ${item.selectedSize}` : '') +
          (item.selectedColor ? ` [Color: ${item.selectedColor}]` : '') +
          ` — ₦${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const totalStr = `₦${subtotal.toLocaleString()}`;
    const shippingNote =
      subtotal >= freeShippingThreshold
        ? 'Qualified for Complimentary Delivery'
        : 'Delivery to be confirmed';

    const message =
      `Hello Sunrise Legacy Interior,\n\n` +
      `I would like to place an order for the following items:\n\n` +
      `${itemsSummary}\n\n` +
      `*Subtotal:* ${totalStr}\n` +
      `*Delivery:* ${shippingNote}\n\n` +
      `Please confirm stock availability and send payment details.`;

    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDirectFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const itemsSummary = items
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* (x${item.quantity})` +
          (item.selectedSize ? ` - ${item.selectedSize}` : '') +
          (item.selectedColor ? ` [Color: ${item.selectedColor}]` : '') +
          ` — ₦${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const message =
      `Hello Sunrise Legacy Interior,\n\n` +
      `*NEW STORE ORDER*\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Delivery Address:* ${deliveryAddress}\n\n` +
      `*Items Requested:*\n${itemsSummary}\n\n` +
      `*Total Estimate:* ₦${subtotal.toLocaleString()}\n\n` +
      `Please confirm invoice and estimated dispatch time.`;

    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setOrderPlaced(true);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with Logo Accent Colours Overlay */}
      <div
        className="fixed inset-0 bg-[#070422]/85 backdrop-blur-md bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.18)_0%,_rgba(22,104,255,0.12)_35%,_transparent_70%)] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A072E] shadow-2xl flex flex-col z-10 border-l border-[#1E1868] animate-in slide-in-from-right duration-300 text-white">
          {/* Header */}
          <div className="p-5 border-b border-[#1E1868] flex items-center justify-between bg-[#070422]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00D4FF]" />
              <h2 className="font-serif text-xl font-medium text-white">Your Shopping Bag</h2>
              <span className="text-xs text-[#94A3B8] font-medium">({items.length} items)</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#CBD5E1] hover:text-[#00D4FF] rounded-full hover:bg-[#120E48] cursor-pointer transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator in Cyan/Blue */}
          {items.length > 0 && (
            <div className="bg-[#120E48] px-5 py-3 border-b border-[#1E1868] text-xs">
              <div className="flex items-center justify-between text-white mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#00D4FF]" />
                  {amountToFreeShipping === 0 ? (
                    <span className="text-emerald-400 font-semibold">You qualify for Complimentary Delivery!</span>
                  ) : (
                    <span>Add ₦{amountToFreeShipping.toLocaleString()} more for Free Delivery</span>
                  )}
                </span>
                <span className="text-[#00D4FF] tabular-nums font-semibold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#070422] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00D4FF] to-[#1668FF] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#120E48] text-[#00D4FF] flex items-center justify-center mx-auto mb-4 border border-[#00D4FF]/30 shadow-inner">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">Your bag is empty</h3>
                <p className="text-xs text-[#94A3B8] font-light max-w-xs mx-auto mb-6">
                  Explore our curated cookware, fans, bedding, lighting, and general merchandise.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#00D4FF] text-[#070422] text-xs font-bold hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(0,212,255,0.35)] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[#0E0A3C] border border-[#1E1868] shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#070422] shrink-0 border border-[#1E1868]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-base text-white font-medium truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#94A3B8] hover:text-[#E11D48] p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Metadata */}
                      <div className="text-[11px] text-[#94A3B8] space-x-2 mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>&middot; Color: {item.selectedColor}</span>}
                      </div>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1E1868]">
                      <div className="flex items-center border border-[#1E1868] rounded-full bg-[#120E48] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 text-xs text-[#CBD5E1] hover:text-[#00D4FF] rounded-full flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 text-xs text-[#CBD5E1] hover:text-[#00D4FF] rounded-full flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-sans font-semibold text-sm text-white tabular-nums">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Module */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#1E1868] bg-[#070422] space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#94A3B8]">Subtotal</span>
                <span className="font-sans font-bold text-lg text-white tabular-nums">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              {/* Delivery Note */}
              <div className="text-[11px] text-[#94A3B8] flex items-center justify-between pb-1">
                <span>Estimated Delivery</span>
                <span className="font-medium text-[#00D4FF]">
                  {subtotal >= freeShippingThreshold ? 'Complimentary Free' : 'Calculated at checkout'}
                </span>
              </div>

              {/* Optional Inline Details Form */}
              {showDirectForm ? (
                <form onSubmit={handleDirectFormSubmit} className="space-y-2.5 pt-2 border-t border-[#1E1868]">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1E1868] rounded-xl bg-[#120E48] text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 08012345678)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1E1868] rounded-xl bg-[#120E48] text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF]"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Delivery Address (City, State)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#1E1868] rounded-xl bg-[#120E48] text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00D4FF]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#00D4FF] text-[#070422] font-bold text-xs hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(0,212,255,0.35)] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit &amp; Open WhatsApp Order</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#070422] stroke-[2.5]" />
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 rounded-full bg-[#00D4FF] text-[#070422] font-bold text-xs sm:text-sm hover:bg-[#38BDF8] shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#070422] stroke-[2.5]" />
                    <span>Checkout via WhatsApp Concierge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDirectForm(true)}
                    className="w-full py-2.5 rounded-full border border-[#1E1868] text-[#CBD5E1] text-xs font-medium hover:bg-[#120E48] hover:border-[#00D4FF] hover:text-white transition-colors cursor-pointer"
                  >
                    Add Delivery Address Details First
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#94A3B8] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Verified WhatsApp Concierge Order Processing</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
