import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
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

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q)) ||
        (p.materials && p.materials.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  const popularSearches = [
    'Blender',
    'Portable Juicer',
    'Electric Kettle',
    'Microwave',
    'Rechargeable Fan',
    'Bluetooth Speaker',
    'Headphones',
    'Fast-Charging Cable',
    'POP Light',
    'Chandelier',
    'Solar Light',
    'Ladders',
    'Polo Shirt',
    'T-Shirt',
    'Jeans',
    'Canvas Sneakers',
    "Children's Shoes",
    'Crocs',
    'Arabic Perfumes',
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search store catalogue"
    >
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 z-10 text-[#0F172A]">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-[#F8F9FA]">
            <Search className="w-5 h-5 text-blue-700 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blenders, speakers, chandeliers, polo shirts, crocs, perfumes..."
              className="flex-1 bg-transparent border-0 text-sm sm:text-base text-[#0F172A] placeholder-slate-400 focus:outline-hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-blue-700 px-2.5 py-1 rounded-md bg-white border border-slate-200 cursor-pointer"
              >
                ESC
              </button>
            )}
          </div>

          <div className="p-5 max-h-[60vh] overflow-y-auto bg-white">
            {!query.trim() ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-3">
                  Store Inventory Keywords
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-lg text-xs bg-[#F8F9FA] border border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-2xl text-[#0F172A] mb-1">
                  No products found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-500">
                  Try searching for keywords like blender, speaker, chandelier, polo, jeans, crocs, or perfume.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 mb-2.5">
                  Results ({searchResults.length})
                </p>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base text-[#0F172A] group-hover:text-blue-700 transition-colors truncate font-medium">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="text-blue-700 font-medium">{product.category}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="font-semibold text-[#0F172A] tabular-nums">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all mr-2 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
