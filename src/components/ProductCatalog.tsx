import React, { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Product, ProductCategory, StoreConfig, SortOption } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  storeConfig: StoreConfig;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  storeConfig,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: { label: string; cat: ProductCategory }[] = [
    { label: 'All Merchandise', cat: 'All' },
    { label: 'Appliances & Gadgets', cat: 'Appliances & Gadgets' },
    { label: 'Lighting & Fans', cat: 'Lighting & Fans' },
    { label: 'Kitchen & Dining', cat: 'Kitchen & Dining' },
    { label: 'Clothing & Shoes', cat: 'Clothing & Footwear' },
    { label: 'Arabic Perfumes', cat: 'Fragrances' },
    { label: 'Bedding & Linens', cat: 'Bedding & Bedrooms' },
    { label: 'Ladders & Utility', cat: 'Home Décor & Accents' },
  ];

  // Filtering & Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, inStockOnly, sortBy]);

  return (
    <section id="catalog" className="py-14 sm:py-20 bg-[#0A072E] border-t border-[#1E1868]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#00D4FF] font-bold block mb-2">
              The Catalogue
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
              Selected <span className="italic text-[#00D4FF]">Homeware &amp; General Merchandise</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#94A3B8] font-light max-w-sm">
            Tap any item to review specifications, or message our Dopemu showroom directly on WhatsApp to buy in bulk or single pieces.
          </p>
        </div>

        {/* Minimalist, Clean Category Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#1E1868]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
            {categories.map((item) => (
              <button
                key={item.cat}
                type="button"
                onClick={() => onSelectCategory(item.cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === item.cat
                    ? 'bg-[#00D4FF] text-[#070422] font-bold shadow-[0_0_15px_rgba(0,212,255,0.35)]'
                    : 'bg-[#120E48] text-[#CBD5E1] hover:text-white hover:bg-[#181358] border border-[#1E1868]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 shrink-0 self-end lg:self-auto text-xs text-[#94A3B8]">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#CBD5E1]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#00D4FF] focus:ring-[#00D4FF] border-[#1E1868] bg-[#120E48] accent-[#00D4FF]"
              />
              <span>In Stock Only</span>
            </label>

            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#00D4FF] absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="pl-8 pr-7 py-1.5 bg-[#120E48] border border-[#1E1868] hover:border-[#00D4FF] rounded-full text-xs font-medium text-white focus:outline-hidden focus:border-[#00D4FF] cursor-pointer transition-colors"
              >
                <option value="featured" className="bg-[#0A072E] text-white">Featured</option>
                <option value="newest" className="bg-[#0A072E] text-white">New Arrivals</option>
                <option value="price-asc" className="bg-[#0A072E] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0A072E] text-white">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid with generous whitespace */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#0E0A3C] rounded-3xl border border-[#1E1868] p-8">
            <p className="font-serif text-2xl text-white mb-2">No items found</p>
            <p className="text-xs text-[#94A3B8] font-light max-w-sm mx-auto mb-6">
              There are currently no items matching this category filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setInStockOnly(false);
              }}
              className="px-6 py-2 rounded-full bg-[#00D4FF] text-[#070422] text-xs font-bold hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(0,212,255,0.35)] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-7 sm:gap-y-12">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeConfig={storeConfig}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
