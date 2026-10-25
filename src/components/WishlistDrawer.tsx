import React, { useEffect } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onExplore,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
              <Heart className="w-5 h-5 text-[#00D4FF] fill-current" />
              <h2 className="font-serif text-xl font-medium text-white">Your Saved Pieces</h2>
              <span className="text-xs text-[#94A3B8] font-medium">({wishlistProducts.length})</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#CBD5E1] hover:text-[#00D4FF] rounded-full hover:bg-[#120E48] cursor-pointer transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#120E48] text-[#00D4FF] flex items-center justify-center mx-auto mb-4 border border-[#00D4FF]/30 shadow-inner">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">No saved items yet</h3>
                <p className="text-xs text-[#94A3B8] font-light max-w-xs mx-auto mb-6">
                  Save pieces by tapping the heart icon on any product card while browsing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#00D4FF] text-[#070422] text-xs font-bold hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(0,212,255,0.35)] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[#0E0A3C] border border-[#1E1868] shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#070422] shrink-0 border border-[#1E1868]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-base text-white font-medium truncate">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#94A3B8] hover:text-[#E11D48] p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${product.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#38BDF8]">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1E1868]">
                      <span className="font-sans font-semibold text-sm text-white tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#00D4FF] text-[#070422] text-xs font-bold hover:bg-[#38BDF8] shadow-[0_0_10px_rgba(0,212,255,0.35)] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#070422] stroke-[2.5]" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
