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
    { label: 'All Collections', cat: 'All' },
    { label: 'Home Appliances', cat: 'Home Appliances' },
    { label: 'Electronics & Accessories', cat: 'Electronics & Accessories' },
    { label: 'Lighting & Home Improvement', cat: 'Lighting & Home Improvement' },
    { label: 'Clothing', cat: 'Clothing' },
    { label: 'Footwear', cat: 'Footwear' },
    { label: 'Fragrances', cat: 'Fragrances' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

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
    <section id="catalog" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-blue-700 font-semibold block mb-2">
              04. Store Catalogue
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0F172A] font-normal tracking-[-0.03em] leading-[1.08]">
              Available <span className="italic text-blue-700 font-serif">Store Inventory</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-md leading-relaxed">
            Browse items stocked at our Dopemu store. Add items to your bag or message us directly on WhatsApp for retail and wholesale orders.
          </p>
        </div>

        {/* Clean Architectural Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((item) => (
              <button
                key={item.cat}
                type="button"
                onClick={() => onSelectCategory(item.cat)}
                className={`whitespace-nowrap shrink-0 px-3.5 min-h-[40px] rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === item.cat
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'bg-[#F8F9FA] text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Sort & Stock Controls */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 text-xs text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 min-h-[40px]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded-sm text-blue-700 focus:ring-blue-600 border-slate-300 accent-blue-700 cursor-pointer"
              />
              <span className="font-medium whitespace-nowrap">Showroom Available</span>
            </label>

            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-700 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="pl-8 pr-6 min-h-[40px] bg-[#F8F9FA] border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#F8F9FA] rounded-lg border border-slate-200 p-8">
            <p className="font-serif text-2xl text-[#0F172A] mb-2">No items matching this filter</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Reset the category or availability filters to browse the full catalogue.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors cursor-pointer min-h-[42px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
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
