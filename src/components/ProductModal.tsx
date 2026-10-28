import React, { useState, useEffect } from 'react';
import { X, Heart, ChevronDown, Shield, Truck } from 'lucide-react';
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
}) => {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [openSection, setOpenSection] = useState<'materials' | 'dimensions' | 'care' | 'delivery' | null>('materials');

  // Sync state when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    setQuantity(1);
  }, [product]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleWhatsAppOrder = () => {
    const details = [
      `*Product:* ${product.name}`,
      `*Category:* ${product.category}`,
      `*Reference Price:* ₦${product.price.toLocaleString()}${product.unit ? ` (${product.unit})` : ''}`,
      quantity > 1 ? `*Desired Quantity:* ${quantity}` : null,
      selectedColor ? `*Color:* ${selectedColor}` : null,
      selectedSize ? `*Size/Option:* ${selectedSize}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const message = `Hello Sunrise Legacy Interior, I am interested in ordering:\n\n${details}\n\nI want to buy this in bulk or in pieces. Please let me know the availability and wholesale/retail pricing.`;
    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Image gallery items
  const galleryImages = [
    product.image,
    ...(product.secondaryImage ? [product.secondaryImage] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1714]/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(30,25,20,0.18)] border border-[#E8E3DA] z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-[#1A1714] hover:text-[#966B24] flex items-center justify-center transition-colors shadow-xs border border-[#E8E3DA] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Media Gallery */}
            <div className="p-6 sm:p-8 bg-[#F8F7F4] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E3DA]">
              {/* Main Image Showcase */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EFECE6] mb-4 border border-[#E8E3DA]">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs ${
                      product.badge.toLowerCase().includes('sale')
                        ? 'bg-[#C2410C] text-white'
                        : 'bg-[#1A1714] text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple images exist */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-[#966B24] scale-105 shadow-xs' : 'border-[#E8E3DA] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust markers */}
              <div className="mt-6 pt-4 border-t border-[#E8E3DA] grid grid-cols-2 gap-3 text-xs text-[#786E65]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#966B24] shrink-0" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#966B24] shrink-0" />
                  <span>Nationwide Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Product Purchase Module */}
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto bg-[#FAF9F6] text-[#1A1714]">
              {/* Category & Title */}
              <div className="text-xs font-bold uppercase tracking-wider text-[#966B24] mb-1">
                {product.category}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1714] font-normal leading-tight mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-sans font-bold text-2xl text-[#1A1714] tabular-nums">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#857A6F] line-through tabular-nums">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.unit && (
                  <span className="text-xs text-[#857A6F] font-medium">({product.unit})</span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#574F46] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Color Swatch Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#574F46] mb-2">
                    Color: <span className="font-normal text-[#966B24]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          selectedColor === c.name ? 'border-[#966B24] scale-110 shadow-xs' : 'border-transparent'
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

              {/* Size / Length Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#574F46] mb-2">
                    {product.unit?.includes('meter') ? 'Selected Meterage' : 'Size / Dimension'}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#1A1714] text-white font-bold shadow-xs'
                            : 'bg-white border border-[#E8E3DA] text-[#574F46] hover:border-[#966B24] hover:text-[#1A1714]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock status */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center border border-[#E8E3DA] rounded-full bg-white px-2 py-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full text-base font-semibold text-[#574F46] hover:text-[#1A1714] hover:bg-[#F8F7F4] flex items-center justify-center cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#1A1714] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full text-base font-semibold text-[#574F46] hover:text-[#1A1714] hover:bg-[#F8F7F4] flex items-center justify-center cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-[#13612D] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>In Stock &middot; Ready to dispatch</span>
                </div>
              </div>

              {/* Action Buttons: Direct WhatsApp Buy (Bulk / Pieces) */}
              <div className="flex items-center gap-2.5 mb-6">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_2px_12px_rgba(37,211,102,0.3)] cursor-pointer active:scale-98"
                >
                  <svg
                    className="w-5 h-5 fill-current shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                  </svg>
                  <span>Buy in Bulk or in Pieces</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-full border border-[#E8E3DA] hover:border-[#966B24] flex items-center justify-center transition-all cursor-pointer ${
                    isWishlisted ? 'bg-[#966B24] text-white shadow-xs' : 'bg-white text-[#574F46] hover:text-[#966B24]'
                  }`}
                  aria-label={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Collapsible Product Details Accordions */}
              <div className="border-t border-[#E8E3DA] pt-4 space-y-2 text-xs">
                {product.materials && (
                  <div className="border-b border-[#E8E3DA] pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
                      className="w-full flex items-center justify-between text-left font-semibold text-[#1A1714] py-1 cursor-pointer hover:text-[#966B24] transition-colors"
                    >
                      <span>Materials &amp; Craftsmanship</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#966B24] transition-transform ${
                          openSection === 'materials' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'materials' && (
                      <p className="mt-2 text-[#574F46] leading-relaxed font-light">{product.materials}</p>
                    )}
                  </div>
                )}

                {product.dimensions && (
                  <div className="border-b border-[#E8E3DA] pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'dimensions' ? null : 'dimensions')}
                      className="w-full flex items-center justify-between text-left font-semibold text-[#1A1714] py-1 cursor-pointer hover:text-[#966B24] transition-colors"
                    >
                      <span>Specifications &amp; Dimensions</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#966B24] transition-transform ${
                          openSection === 'dimensions' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'dimensions' && (
                      <p className="mt-2 text-[#574F46] leading-relaxed font-light">{product.dimensions}</p>
                    )}
                  </div>
                )}

                {product.care && (
                  <div className="border-b border-[#E8E3DA] pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
                      className="w-full flex items-center justify-between text-left font-semibold text-[#1A1714] py-1 cursor-pointer hover:text-[#966B24] transition-colors"
                    >
                      <span>Care &amp; Maintenance</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#966B24] transition-transform ${
                          openSection === 'care' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'care' && (
                      <p className="mt-2 text-[#574F46] leading-relaxed font-light">{product.care}</p>
                    )}
                  </div>
                )}

                <div className="pb-1">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'delivery' ? null : 'delivery')}
                    className="w-full flex items-center justify-between text-left font-semibold text-[#1A1714] py-1 cursor-pointer hover:text-[#966B24] transition-colors"
                  >
                    <span>Delivery &amp; Collection</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#966B24] transition-transform ${
                        openSection === 'delivery' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSection === 'delivery' && (
                    <div className="mt-2 text-[#574F46] space-y-1 font-light leading-relaxed">
                      <p>&bull; Lagos same-day or next-day courier delivery available.</p>
                      <p>&bull; Nationwide delivery to all states via secure logistics.</p>
                      <p>&bull; Complimentary in-store collection at our Dopemu showroom (Greater Path Mall).</p>
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
