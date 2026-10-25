import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Check, ChevronDown, Shield, Truck } from 'lucide-react';
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
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<'materials' | 'dimensions' | 'care' | 'delivery' | null>('materials');

  // Sync state when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    setQuantity(1);
    setIsAdded(false);
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

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const details = [
      `*Product:* ${product.name}`,
      `*Category:* ${product.category}`,
      `*Quantity:* ${quantity}${product.unit ? ` (${product.unit})` : ''}`,
      selectedColor ? `*Color:* ${selectedColor}` : null,
      selectedSize ? `*Size/Option:* ${selectedSize}` : null,
      `*Total Estimate:* ₦${(product.price * quantity).toLocaleString()}`,
    ]
      .filter(Boolean)
      .join('\n');

    const message = `Hello Sunrise Legacy Interior, I would like to purchase:\n\n${details}\n\nPlease confirm availability and payment/delivery options.`;
    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Image gallery items
  const galleryImages = [
    product.image,
    ...(product.secondaryImage ? [product.secondaryImage] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with Logo Accent Colours Gradient Overlay */}
      <div
        className="fixed inset-0 bg-[#070422]/85 backdrop-blur-md bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.18)_0%,_rgba(22,104,255,0.12)_35%,_transparent_70%)] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-[#0A072E] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(0,212,255,0.18)] border border-[#1E1868] z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#120E48] text-[#CBD5E1] hover:text-[#00D4FF] hover:border-[#00D4FF] flex items-center justify-center transition-colors shadow-md border border-[#1E1868] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Media Gallery */}
            <div className="p-6 sm:p-8 bg-[#070422] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1E1868]">
              {/* Main Image Showcase with Logo Accent Overlay */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0A072E] mb-4 border border-[#1E1868]">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070422]/50 via-transparent to-transparent pointer-events-none" />
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md ${
                      product.badge.toLowerCase().includes('sale')
                        ? 'bg-[#E11D48] text-white border border-rose-300/40'
                        : 'bg-[#070422]/95 text-white border border-[#00D4FF]/40'
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
                        activeImage === img ? 'border-[#00D4FF] scale-105 shadow-[0_0_10px_rgba(0,212,255,0.4)]' : 'border-[#1E1868] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust markers */}
              <div className="mt-6 pt-4 border-t border-[#1E1868] grid grid-cols-2 gap-3 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  <span>Nationwide Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Product Purchase Module */}
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto bg-[#0A072E] text-white">
              {/* Category & Title */}
              <div className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] mb-1">
                {product.category}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight mb-2">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-sans font-bold text-2xl text-white tabular-nums">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through tabular-nums">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.unit && (
                  <span className="text-xs text-[#94A3B8] font-medium">({product.unit})</span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Color Swatch Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-2">
                    Color: <span className="font-normal text-[#00D4FF]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          selectedColor === c.name ? 'border-[#00D4FF] scale-110 shadow-[0_0_8px_rgba(0,212,255,0.6)]' : 'border-transparent'
                        }`}
                        title={c.name}
                        aria-label={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-white/20"
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
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-2">
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
                            ? 'bg-[#00D4FF] text-[#070422] font-bold shadow-[0_0_10px_rgba(0,212,255,0.4)]'
                            : 'bg-[#120E48] border border-[#1E1868] text-[#CBD5E1] hover:border-[#00D4FF] hover:text-white'
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
                <div className="flex items-center border border-[#1E1868] rounded-full bg-[#120E48] px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full text-base font-semibold text-[#CBD5E1] hover:text-white hover:bg-[#181358] flex items-center justify-center cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full text-base font-semibold text-[#CBD5E1] hover:text-white hover:bg-[#181358] flex items-center justify-center cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>In Stock &middot; Ready to dispatch</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer ${
                    isAdded
                      ? 'bg-[#059669] text-white'
                      : 'bg-[#00D4FF] text-[#070422] hover:bg-[#38BDF8] shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#070422] stroke-[2.5]" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#070422] stroke-[2.5]" />
                      <span>Add to Shopping Bag (₦{(product.price * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="col-span-3 py-3 rounded-full bg-[#120E48] hover:bg-[#181358] text-white border border-[#00D4FF]/40 hover:border-[#00D4FF] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00D4FF]" />
                    <span>Enquire / Order on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`py-3 rounded-full border border-[#1E1868] flex items-center justify-center transition-colors cursor-pointer ${
                      isWishlisted ? 'bg-[#00D4FF] text-[#070422] shadow-[0_0_10px_rgba(0,212,255,0.4)]' : 'bg-[#120E48] text-[#CBD5E1] hover:text-[#00D4FF]'
                    }`}
                    aria-label={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Collapsible Product Details Accordions */}
              <div className="border-t border-[#1E1868] pt-4 space-y-2 text-xs">
                {product.materials && (
                  <div className="border-b border-[#1E1868] pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
                      className="w-full flex items-center justify-between text-left font-semibold text-white py-1 cursor-pointer hover:text-[#00D4FF] transition-colors"
                    >
                      <span>Materials &amp; Craftsmanship</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#00D4FF] transition-transform ${
                          openSection === 'materials' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'materials' && (
                      <p className="mt-2 text-[#CBD5E1] leading-relaxed font-light">{product.materials}</p>
                    )}
                  </div>
                )}

                {product.dimensions && (
                  <div className="border-b border-[#1E1868] pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'dimensions' ? null : 'dimensions')}
                      className="w-full flex items-center justify-between text-left font-semibold text-white py-1 cursor-pointer hover:text-[#00D4FF] transition-colors"
                    >
                      <span>Specifications &amp; Dimensions</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#00D4FF] transition-transform ${
                          openSection === 'dimensions' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'dimensions' && (
                      <p className="mt-2 text-[#CBD5E1] leading-relaxed font-light">{product.dimensions}</p>
                    )}
                  </div>
                )}

                {product.care && (
                  <div className="border-b border-[#1E1868] pb-3">
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
                      className="w-full flex items-center justify-between text-left font-semibold text-white py-1 cursor-pointer hover:text-[#00D4FF] transition-colors"
                    >
                      <span>Care &amp; Maintenance</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#00D4FF] transition-transform ${
                          openSection === 'care' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === 'care' && (
                      <p className="mt-2 text-[#CBD5E1] leading-relaxed font-light">{product.care}</p>
                    )}
                  </div>
                )}

                <div className="pb-1">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'delivery' ? null : 'delivery')}
                    className="w-full flex items-center justify-between text-left font-semibold text-white py-1 cursor-pointer hover:text-[#00D4FF] transition-colors"
                  >
                    <span>Delivery &amp; Collection</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#00D4FF] transition-transform ${
                        openSection === 'delivery' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSection === 'delivery' && (
                    <div className="mt-2 text-[#CBD5E1] space-y-1 font-light leading-relaxed">
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
