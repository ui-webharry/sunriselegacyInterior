import React, { useEffect } from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1714]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-[-20px_0_50px_rgba(28,24,20,0.12)] flex flex-col z-10 border-l border-[#E8E3DA] animate-in slide-in-from-right duration-300 text-[#1A1714]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E3DA] flex items-center justify-between bg-[#F8F7F4]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#966B24] fill-current" />
              <h2 className="font-serif text-xl font-medium text-[#1A1714]">Your Saved Pieces</h2>
              <span className="text-xs text-[#786E65] font-medium">({wishlistProducts.length})</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#574F46] hover:text-[#1A1714] rounded-full hover:bg-white cursor-pointer transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F8F7F4] text-[#966B24] flex items-center justify-center mx-auto mb-4 border border-[#EBE6DC] shadow-xs">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1714] mb-2">No saved items yet</h3>
                <p className="text-xs text-[#786E65] font-light max-w-xs mx-auto mb-6">
                  Save pieces by tapping the heart icon on any product card while browsing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#1A1714] text-white text-xs font-bold hover:bg-[#2F2922] shadow-xs transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-[#F5F2EB] shrink-0 border border-[#E8E3DA]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-base text-[#1A1714] font-medium truncate">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#857A6F] hover:text-[#C2410C] p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${product.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#966B24] font-medium">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E3DA]">
                      <span className="font-sans font-semibold text-sm text-[#1A1714] tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </span>

                      <a
                        href={`https://wa.me/2349131156580?text=${encodeURIComponent(
                          `Hello Sunrise Legacy Interior, I am interested in saved item: *${product.name}* (₦${product.price.toLocaleString()}). I want to buy this in bulk or in pieces. Please let me know availability.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#13612D] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-current shrink-0"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.74L5.53 16.71L5.34 16.41C4.55 15.16 4.13 13.71 4.13 11.91C4.13 7.37 7.83 3.67 12.04 3.67ZM8.73 7.34C8.54 7.34 8.24 7.41 7.99 7.68C7.74 7.95 7.03 8.62 7.03 9.98C7.03 11.34 8.02 12.65 8.16 12.84C8.3 13.03 10.11 15.82 12.87 17.02C13.53 17.31 14.04 17.48 14.44 17.61C15.11 17.82 15.72 17.79 16.2 17.72C16.74 17.64 17.86 17.04 18.09 16.39C18.32 15.74 18.32 15.19 18.25 15.07C18.18 14.95 17.99 14.88 17.71 14.74C17.43 14.6 16.07 13.93 15.81 13.84C15.56 13.75 15.37 13.7 15.18 13.98C14.99 14.25 14.46 14.88 14.3 15.07C14.14 15.25 13.98 15.28 13.7 15.14C13.42 15.0 12.52 14.71 11.46 13.76C10.63 13.02 10.07 12.11 9.91 11.83C9.75 11.55 9.89 11.4 10.03 11.26C10.16 11.14 10.31 10.94 10.45 10.78C10.59 10.62 10.64 10.5 10.73 10.32C10.82 10.14 10.78 9.98 10.71 9.84C10.64 9.7 10.08 8.33 9.85 7.78C9.62 7.24 9.39 7.32 9.22 7.31C9.06 7.3 8.87 7.34 8.73 7.34Z" />
                        </svg>
                        <span>Buy on WhatsApp</span>
                      </a>
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
