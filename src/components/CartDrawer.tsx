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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200 animate-in slide-in-from-right duration-300 text-slate-900">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="font-serif text-xl font-medium text-slate-900">Your Shopping Bag</h2>
              <span className="text-xs text-slate-500 font-medium">({items.length} items)</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-200 cursor-pointer transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-blue-50/70 px-5 py-3 border-b border-blue-100 text-xs">
              <div className="flex items-center justify-between text-slate-800 mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  {amountToFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">You qualify for Complimentary Delivery!</span>
                  ) : (
                    <span>Add ₦{amountToFreeShipping.toLocaleString()} more for Free Delivery</span>
                  )}
                </span>
                <span className="text-blue-700 tabular-nums font-semibold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-slate-900 mb-2">Your bag is empty</h3>
                <p className="text-xs text-slate-500 font-normal max-w-xs mx-auto mb-6">
                  Explore our curated cookware, fans, bedding, lighting, and general merchandise.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-base text-slate-900 font-medium truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Metadata */}
                      <div className="text-[11px] text-slate-500 space-x-2 mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>&middot; Color: {item.selectedColor}</span>}
                      </div>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 text-xs text-slate-600 hover:text-blue-700 rounded-full flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 text-xs text-slate-600 hover:text-blue-700 rounded-full flex items-center justify-center font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-sans font-semibold text-sm text-slate-900 tabular-nums">
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
            <div className="p-5 border-t border-slate-200 bg-[#F8F9FA] space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-sans font-bold text-lg text-slate-900 tabular-nums">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              {/* Delivery Note */}
              <div className="text-[11px] text-slate-500 flex items-center justify-between pb-1">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-blue-700">
                  {subtotal >= freeShippingThreshold ? 'Complimentary Free' : 'Calculated at checkout'}
                </span>
              </div>

              {/* Optional Inline Details Form */}
              {showDirectForm ? (
                <form onSubmit={handleDirectFormSubmit} className="space-y-2.5 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 08012345678)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Delivery Address (City, State)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit &amp; Open WhatsApp Order</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <svg
                      className="w-4.5 h-4.5 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                    </svg>
                    <span>Send Order on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDirectForm(true)}
                    className="w-full py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:border-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    Add Delivery Address Details First
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Safe Lagos &amp; Nationwide Delivery via WhatsApp</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
