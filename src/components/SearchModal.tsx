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
  onSelectCategory: _onSelectCategory,
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

  // Handle ESC
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
        (p.materials && p.materials.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  const popularSearches = [
    'Blender',
    'Chandelier',
    'Ceiling Fan',
    'Cooking Pots',
    'Rechargeable Fan',
    'Electric Kettle',
    'Crocs',
    'Arabic Perfumes',
    'Ladders',
    'Solar Light',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1714]/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(30,25,20,0.18)] border border-[#E8E3DA] z-10 animate-in fade-in zoom-in-95 duration-200 text-[#1A1714]">
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-[#E8E3DA] flex items-center gap-3 bg-[#F8F7F4]">
            <Search className="w-5 h-5 text-[#966B24] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cookware, blenders, fans, bed linen, fabrics..."
              className="flex-1 bg-transparent border-0 text-sm sm:text-base text-[#1A1714] placeholder-[#857A6F] focus:outline-hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#857A6F] hover:text-[#1A1714] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#786E65] hover:text-[#1A1714] px-2 py-1 rounded-md bg-white border border-[#E8E3DA] cursor-pointer shadow-xs"
              >
                ESC
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-5 max-h-[60vh] overflow-y-auto bg-[#FAF9F6]">
            {!query.trim() ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#966B24] mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs bg-white border border-[#E8E3DA] text-[#574F46] hover:border-[#966B24] hover:bg-[#F8F7F4] hover:text-[#966B24] transition-all cursor-pointer shadow-xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-xl text-[#1A1714] mb-1">No products found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-[#786E65] font-light">
                  Try searching for general keywords like &lsquo;blender&rsquo;, &lsquo;pot&rsquo;, &lsquo;fan&rsquo;, or &lsquo;fabric&rsquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#966B24] mb-2">
                  Results ({searchResults.length})
                </p>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-white border border-[#E8E3DA] hover:border-[#966B24]/60 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#F5F2EB] shrink-0 border border-[#E8E3DA]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base text-[#1A1714] group-hover:text-[#966B24] transition-colors truncate font-medium">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#786E65]">
                        <span className="text-[#966B24] font-medium">{product.category}</span>
                        <span>&middot;</span>
                        <span className="font-semibold text-[#1A1714] tabular-nums">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#857A6F] group-hover:text-[#966B24] group-hover:translate-x-1 transition-all mr-2" />
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
