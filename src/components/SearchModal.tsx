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
      {/* Backdrop with Logo Accent Colours Overlay */}
      <div
        className="fixed inset-0 bg-[#070422]/85 backdrop-blur-md bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.22)_0%,_rgba(22,104,255,0.15)_35%,_transparent_70%)] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-[#0A072E] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.2)] border border-[#1E1868] z-10 animate-in fade-in zoom-in-95 duration-200 text-white">
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-[#1E1868] flex items-center gap-3 bg-[#070422]">
            <Search className="w-5 h-5 text-[#00D4FF] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cookware, blenders, fans, bed linen, fabrics..."
              className="flex-1 bg-transparent border-0 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#94A3B8] hover:text-[#00D4FF] px-2 py-1 rounded-md bg-[#120E48] border border-[#1E1868] cursor-pointer"
              >
                ESC
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-5 max-h-[60vh] overflow-y-auto bg-[#0A072E]">
            {!query.trim() ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs bg-[#120E48] border border-[#1E1868] text-[#CBD5E1] hover:border-[#00D4FF] hover:bg-[#181358] hover:text-[#00D4FF] transition-all cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-xl text-white mb-1">No products found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-[#94A3B8] font-light">
                  Try searching for general keywords like &lsquo;blender&rsquo;, &lsquo;pot&rsquo;, &lsquo;fan&rsquo;, or &lsquo;fabric&rsquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] mb-2">
                  Results ({searchResults.length})
                </p>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-[#0E0A3C] border border-[#1E1868] hover:border-[#00D4FF] hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#070422] shrink-0 border border-[#1E1868]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base text-white group-hover:text-[#00D4FF] transition-colors truncate font-medium">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span className="text-[#38BDF8]">{product.category}</span>
                        <span>&middot;</span>
                        <span className="font-semibold text-white tabular-nums">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all mr-2" />
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
