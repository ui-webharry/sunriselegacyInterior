import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowDirectForm(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
          ` - ₦${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const totalStr = `₦${subtotal.toLocaleString()}`;
    const shippingNote =
      subtotal >= freeShippingThreshold
        ? 'Qualified for Complimentary Delivery'
        : 'Delivery fee to be confirmed';

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
          ` - ₦${(item.price * item.quantity).toLocaleString()}`
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
      `Please confirm availability and estimated dispatch time.`;

    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClearCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-full flex justify-end pl-4 sm:pl-10">
        <div className="w-full max-w-md bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200 text-[#0F172A]">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FA]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-blue-700" />
              <h2 className="font-serif text-xl font-medium text-[#0F172A]">Shopping Bag</h2>
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                ({items.length})
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 text-slate-500 hover:text-blue-700 rounded-lg hover:bg-slate-200/70 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length > 0 && (
            <div className="bg-blue-50/60 px-5 py-3 border-b border-blue-100 text-xs">
              <div className="flex items-center justify-between text-slate-800 mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-700" />
                  {amountToFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">Complimentary Lagos Delivery Unlocked</span>
                  ) : (
                    <span>Add ₦{amountToFreeShipping.toLocaleString()} more for Complimentary Delivery</span>
                  )}
                </span>
                <span className="text-blue-700 tabular-nums font-semibold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-700 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#0F172A] mb-2">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6 leading-relaxed">
                  Explore home appliances, electronics, lighting fixtures, clothing, footwear, and Arabian perfumes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-slate-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#0F172A] font-medium truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer shrink-0"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 space-x-2 mt-0.5">
                        {item.selectedSize && <span>Option: {item.selectedSize}</span>}
                        {item.selectedColor && <span>&middot; Color: {item.selectedColor}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-[#F8F9FA] px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 text-xs text-slate-700 hover:text-blue-700 flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#0F172A] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 text-xs text-slate-700 hover:text-blue-700 flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-sans font-semibold text-sm text-[#0F172A] tabular-nums">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-[#F8F9FA] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-sans font-bold text-lg text-[#0F172A] tabular-nums">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between pb-1">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-blue-700">
                  {subtotal >= freeShippingThreshold ? 'Complimentary Free' : 'Confirmed via WhatsApp'}
                </span>
              </div>

              {showDirectForm ? (
                <form onSubmit={handleDirectFormSubmit} className="space-y-2.5 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 08012345678)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Delivery Address (City, State)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-blue-700 text-white font-semibold text-xs hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit &amp; Open WhatsApp Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Bag Order via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDirectForm(true)}
                    className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white hover:border-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    Add Delivery Details First
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Safe Lagos &amp; Nationwide Delivery via WhatsApp</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
