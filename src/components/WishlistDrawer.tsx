import React, { useEffect } from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Items"
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
              <Heart className="w-5 h-5 text-blue-700 fill-current" />
              <h2 className="font-serif text-xl font-medium text-[#0F172A]">Saved Items</h2>
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                ({wishlistProducts.length})
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 text-slate-500 hover:text-blue-700 rounded-lg hover:bg-slate-200/70 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close saved items"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-4 border border-blue-200">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#0F172A] mb-2">No saved items yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6 leading-relaxed">
                  Tap the heart icon on any product card while browsing to keep items here.
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
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-slate-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#0F172A] font-medium truncate">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer shrink-0"
                          aria-label={`Remove ${product.name} from saved items`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-blue-700 font-medium">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 gap-2">
                      <span className="font-sans font-semibold text-sm text-[#0F172A] tabular-nums">
                        ₦{product.price.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-700 text-blue-700 hover:text-white border border-blue-200 transition-colors cursor-pointer"
                          title="Add to Bag"
                          aria-label={`Add ${product.name} to bag`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`https://wa.me/2349131156580?text=${encodeURIComponent(
                            `Hello Sunrise Legacy Interior, I am interested in saved item: *${product.name}* (₦${product.price.toLocaleString()}). Please let me know current availability.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-blue-700 text-[#0F172A] hover:text-white border border-slate-200 hover:border-blue-700 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          WhatsApp
                        </a>
                      </div>
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
