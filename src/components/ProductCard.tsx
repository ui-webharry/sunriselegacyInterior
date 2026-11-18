import React from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
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
  onAddToCart,
  onQuickView,
}) => {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello Sunrise Legacy Interior, I am interested in ordering: *${product.name}* (₦${product.price.toLocaleString()}${product.unit ? ` ${product.unit}` : ''}).\n\nPlease confirm current availability and bulk/piece pricing.`;
    window.open(`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBagAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(
        product,
        1,
        product.colors && product.colors.length > 0 ? product.colors[0].name : undefined,
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
      );
    }
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group cursor-pointer flex flex-col justify-between bg-white border border-slate-200 hover:border-blue-600 rounded-lg overflow-hidden transition-colors duration-200"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-[1.03] ${
            product.secondaryImage ? 'group-hover:opacity-0' : ''
          }`}
          loading="lazy"
        />

        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}

        {/* Single Quiet Corner Label */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#0F172A] border border-slate-200/80 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-blue-700 text-white'
              : 'bg-white/95 text-slate-600 hover:text-blue-700 border border-slate-200/90'
          }`}
          aria-label={isWishlisted ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Bar */}
        <div className="hidden sm:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-lg bg-white/95 hover:bg-blue-700 text-[#0F172A] hover:text-white text-xs font-semibold border border-slate-200 hover:border-blue-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-blue-700 font-semibold block mb-1">
            {product.category}
          </span>

          <h3 className="font-serif text-base sm:text-lg text-[#0F172A] group-hover:text-blue-700 transition-colors leading-snug line-clamp-2 font-medium mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3 hidden sm:block">
            {product.shortDesc}
          </p>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <span className="font-sans font-semibold text-sm sm:text-base text-[#0F172A] tabular-nums">
              ₦{product.price.toLocaleString()}
            </span>
            {product.unit && (
              <span className="text-[11px] text-slate-500">
                {product.unit}
              </span>
            )}
          </div>

          {/* Action Row: WhatsApp & Add to Bag */}
          <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex-1 h-10 px-2.5 rounded-lg bg-[#F8F9FA] hover:bg-blue-700 text-[#0F172A] hover:text-white border border-slate-200 hover:border-blue-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
              title="Order this item via WhatsApp"
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <span>
                WhatsApp<span className="hidden min-[440px]:inline"> Order</span>
              </span>
            </button>

            {onAddToCart && (
              <button
                type="button"
                onClick={handleBagAdd}
                className="w-10 h-10 rounded-lg bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Add to Shopping Bag"
                aria-label={`Add ${product.name} to bag`}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
