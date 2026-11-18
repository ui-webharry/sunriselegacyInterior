import React, { useState, useEffect } from 'react';
import { X, Heart, Shield, Truck, ChevronDown, ShoppingBag, Check } from 'lucide-react';
import { Product, StoreConfig } from '../types';

interface ProductModalProps {
  product: Product | null;
  storeConfig: StoreConfig;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  storeConfig,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToBag, setAddedToBag] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<'materials' | 'dimensions' | 'care' | 'delivery' | null>('materials');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
      setQuantity(1);
      setAddedToBag(false);
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleWhatsAppOrder = () => {
    const details = [
      `*Product:* ${product.name}`,
      `*Category:* ${product.category}`,
      `*Listed Price:* ₦${product.price.toLocaleString()}${product.unit ? ` (${product.unit})` : ''}`,
      quantity > 1 ? `*Desired Quantity:* ${quantity}` : null,
      selectedColor ? `*Color:* ${selectedColor}` : null,
      selectedSize ? `*Size/Option:* ${selectedSize}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const message = `Hello Sunrise Legacy Interior, I am interested in ordering:\n\n${details}\n\nPlease confirm availability and single-piece or wholesale pricing.`;
    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBagAction = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1800);
  };

  const galleryImages = [
    product.image,
    ...(product.secondaryImage ? [product.secondaryImage] : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Media Gallery */}
            <div className="p-6 sm:p-8 bg-[#F8F9FA] flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4 border border-slate-200">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 border border-slate-200 text-[#0F172A] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-blue-700' : 'border-slate-200 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Inspected Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Nationwide Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Purchase Module */}
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto bg-white text-[#0F172A]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-1.5">
                {product.category}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0F172A] font-normal leading-tight mb-3">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2.5 mb-4">
                <span className="font-sans font-semibold text-2xl text-[#0F172A] tabular-nums">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.unit && (
                  <span className="text-xs text-slate-500">({product.unit})</span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Color: <span className="text-blue-700">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          selectedColor === c.name ? 'border-blue-700 scale-110' : 'border-slate-300'
                        }`}
                        title={c.name}
                        aria-label={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Available Size / Option:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedSize === s
                            ? 'bg-blue-700 text-white font-semibold'
                            : 'bg-[#F8F9FA] border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Showroom Note */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg bg-[#F8F9FA] px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md text-base font-semibold text-slate-700 hover:text-blue-700 hover:bg-white flex items-center justify-center cursor-pointer transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md text-base font-semibold text-slate-700 hover:text-blue-700 hover:bg-white flex items-center justify-center cursor-pointer transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span className="text-xs text-slate-500 font-medium">
                  Retail &amp; Wholesale Enquiry
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleBagAction}
                    className={`flex-1 py-3 px-5 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      addedToBag
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-700 hover:bg-blue-800 text-white'
                    }`}
                  >
                    {addedToBag ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`w-11 h-11 rounded-lg border border-slate-200 hover:border-blue-400 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isWishlisted ? 'bg-blue-700 text-white border-blue-700' : 'bg-[#F8F9FA] text-slate-700 hover:text-blue-700'
                    }`}
                    aria-label={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-5 rounded-lg bg-[#F8F9FA] hover:bg-slate-900 text-[#0F172A] hover:text-white border border-slate-300 hover:border-slate-900 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Confirm Stock &amp; Order via WhatsApp</span>
                </button>
              </div>

              {/* Collapsible Specifications */}
              <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
                {product.materials && (
                  <div className="border-b border-slate-100 pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
                      className="w-full flex items-center justify-between text-left font-semibold text-slate-900 py-1 cursor-pointer hover:text-blue-700 transition-colors"
                    >
                      <span>Materials &amp; Build</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-blue-700 transition-transform ${
                          openSection === 'materials' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'materials' && (
                      <p className="mt-2 text-slate-600 leading-relaxed">{product.materials}</p>
                    )}
                  </div>
                )}

                {product.dimensions && (
                  <div className="border-b border-slate-100 pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'dimensions' ? null : 'dimensions')}
                      className="w-full flex items-center justify-between text-left font-semibold text-slate-900 py-1 cursor-pointer hover:text-blue-700 transition-colors"
                    >
                      <span>Dimensions &amp; Sizing</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-blue-700 transition-transform ${
                          openSection === 'dimensions' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'dimensions' && (
                      <p className="mt-2 text-slate-600 leading-relaxed tabular-nums">{product.dimensions}</p>
                    )}
                  </div>
                )}

                {product.care && (
                  <div className="border-b border-slate-100 pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
                      className="w-full flex items-center justify-between text-left font-semibold text-slate-900 py-1 cursor-pointer hover:text-blue-700 transition-colors"
                    >
                      <span>Care &amp; Handling</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-blue-700 transition-transform ${
                          openSection === 'care' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'care' && (
                      <p className="mt-2 text-slate-600 leading-relaxed">{product.care}</p>
                    )}
                  </div>
                )}

                <div className="pb-1">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'delivery' ? null : 'delivery')}
                    className="w-full flex items-center justify-between text-left font-semibold text-slate-900 py-1 cursor-pointer hover:text-blue-700 transition-colors"
                  >
                    <span>Delivery &amp; Showroom Pickup</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-blue-700 transition-transform ${
                        openSection === 'delivery' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSection === 'delivery' && (
                    <div className="mt-2 text-slate-600 space-y-1 leading-relaxed">
                      <p>&bull; Lagos same-day or next-day courier delivery available.</p>
                      <p>&bull; Nationwide dispatch across Nigerian states via verified logistics.</p>
                      <p>&bull; Walk-in inspection &amp; pickup at Greater Path Mall, Dopemu (Shops 21 &amp; 22, Block B, 1st Floor).</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
