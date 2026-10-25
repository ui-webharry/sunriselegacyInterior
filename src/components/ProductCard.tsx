import React from 'react';
import { Heart, Eye } from 'lucide-react';
import { Product, StoreConfig } from '../types';

interface ProductCardProps {
  product: Product;
  storeConfig: StoreConfig;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart?: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  storeConfig,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
}) => {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello Sunrise Legacy Interior, I am interested in ordering: *${product.name}* (Price: ₦${product.price.toLocaleString()}${product.unit ? ` ${product.unit}` : ''}).\n\nI want to buy this in bulk or in pieces. Please let me know the availability and wholesale/retail pricing.`;
    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group cursor-pointer flex flex-col justify-between transition-all"
    >
      {/* Product Image Frame with Logo Accent Hover Overlay & Border */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0E0A3C] mb-3.5 border border-[#1E1868] group-hover:border-[#00D4FF] transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient logo color overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070422]/60 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />

        {/* Subtle Top Badge - Crimson from Flyer for Hot Deals, Midnight Navy for Others */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md ${
              product.badge.toLowerCase().includes('sale') || product.badge.toLowerCase().includes('popular')
                ? 'bg-[#E11D48] text-white border border-rose-300/40'
                : 'bg-[#070422]/95 text-white border border-[#00D4FF]/40'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#00D4FF] text-[#070422] shadow-[0_0_10px_rgba(0,212,255,0.5)]'
              : 'bg-[#070422]/80 backdrop-blur-xs text-[#CBD5E1] hover:text-[#00D4FF] hover:bg-[#070422] border border-[#1E1868]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-full bg-[#070422]/95 text-white text-xs font-semibold hover:bg-[#00D4FF] hover:text-[#070422] shadow-md flex items-center justify-center gap-1.5 transition-all border border-[#00D4FF]/50"
          >
            <Eye className="w-3.5 h-3.5 text-[#00D4FF] group-hover:text-[#070422]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#38BDF8] block mb-1 font-semibold">
            {product.category}
          </span>

          <h3 className="font-serif text-lg text-white group-hover:text-[#00D4FF] transition-colors leading-snug line-clamp-1 mb-1 font-medium">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-sans font-semibold text-sm text-white tabular-nums">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through tabular-nums font-light">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.unit && (
              <span className="text-[11px] text-[#94A3B8] font-light">
                ({product.unit})
              </span>
            )}
          </div>
        </div>

        {/* Action Row: Direct WhatsApp Buy (Bulk or in Pieces) */}
        <div className="pt-2.5 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="w-full py-2.5 px-3.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-[#070422] border border-[#25D366]/40 hover:border-[#25D366] text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_12px_rgba(37,211,102,0.15)] hover:shadow-[0_0_22px_rgba(37,211,102,0.45)] cursor-pointer group/btn active:scale-95"
            title="Order this product on WhatsApp"
            aria-label={`Buy ${product.name} on WhatsApp in bulk or in pieces`}
          >
            <svg
              className="w-4 h-4 fill-current shrink-0 group-hover/btn:scale-110 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
            </svg>
            <span>Buy in Bulk or in Pieces</span>
          </button>
        </div>
      </div>
    </div>
  );
};
