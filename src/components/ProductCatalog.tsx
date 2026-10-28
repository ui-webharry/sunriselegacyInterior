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
    { label: 'Clothing & Apparel', cat: 'Clothing' },
    { label: 'Shoes & Footwear', cat: 'Footwear' },
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
    <section id="catalog" className="py-14 sm:py-20 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-blue-600 font-bold block mb-2">
              The Catalogue
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-normal tracking-[-0.038em] leading-[1.08] sm:leading-[1.12]">
              Selected <span className="italic text-blue-700 font-serif">Homeware &amp; General Merchandise</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-sm">
            Tap any item to review specifications, or message our Dopemu showroom directly on WhatsApp to buy in bulk or single pieces.
          </p>
        </div>

        {/* Minimalist, Clean Category Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
            {categories.map((item) => (
              <button
                key={item.cat}
                type="button"
                onClick={() => onSelectCategory(item.cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === item.cat
                    ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 shadow-xs'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 shrink-0 self-end lg:self-auto text-xs text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 bg-white accent-blue-600"
              />
              <span className="font-medium">In Stock Only</span>
            </label>

            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="pl-8 pr-7 py-1.5 bg-white border border-slate-200 hover:border-blue-400 rounded-full text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer transition-colors shadow-xs"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid with generous whitespace */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <p className="font-serif text-2xl text-slate-900 mb-2">No items found</p>
            <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto mb-6">
              There are currently no items matching this category filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
