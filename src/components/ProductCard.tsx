import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, MessageCircle, Check } from 'lucide-react';
import { Product, StoreConfig } from '../types';

interface ProductCardProps {
  product: Product;
  storeConfig: StoreConfig;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  storeConfig,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : undefined;
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    onAddToCart(product, 1, defaultColor, defaultSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWhatsAppAsk = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello Sunrise Legacy, I would like to check availability for: *${product.name}* (Price: ₦${product.price.toLocaleString()}${product.unit ? ` ${product.unit}` : ''}).`;
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

        {/* Action Row */}
        <div className="pt-2 border-t border-[#1E1868] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex-1 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isAdded
                ? 'bg-[#059669] text-white shadow-xs'
                : 'bg-[#120E48] text-white hover:bg-[#00D4FF] hover:text-[#070422] border border-[#00D4FF]/40 hover:border-[#00D4FF]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppAsk}
            className="p-2 rounded-full border border-[#1E1868] text-[#94A3B8] hover:text-[#00D4FF] hover:border-[#00D4FF] hover:bg-[#120E48] transition-colors cursor-pointer"
            title="Ask on WhatsApp"
            aria-label={`Ask about ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
