import React, { useState, useEffect } from 'react';
import { STORE_CONFIG, PRODUCTS } from './data/products';
import { Product, CartItem, ProductCategory } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCatalog } from './components/ProductCatalog';
import { EditorialShowcase } from './components/EditorialShowcase';
import { OurStorySection } from './components/OurStorySection';
import { ServicesSection } from './components/ServicesSection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [storeConfig] = useState(STORE_CONFIG);
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sunrise_legacy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sunrise_legacy_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sunrise_legacy_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sunrise_legacy_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Failed to save wishlist to localStorage', err);
    }
  }, [wishlist]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const itemKey = `${product.id}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === itemKey);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity,
            selectedColor,
            selectedSize,
            unit: product.unit,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleCategorySelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreHero = () => {
    setSelectedCategory('All');
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="liquid-canvas min-h-screen flex flex-col bg-[#F8F9FA] text-[#0F172A]">
      {/* Global Header */}
      <Header
        storeConfig={storeConfig}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero storeConfig={storeConfig} onExploreClick={handleExploreHero} />

        {/* 2. Visual Category Cards */}
        <CategoryGrid onSelectCategory={handleCategorySelect} />

        {/* 3. Product Catalog with Filters & Sort */}
        <ProductCatalog
          products={products}
          storeConfig={storeConfig}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* 4. Home Inspiration / Editorial Storytelling */}
        <EditorialShowcase onSelectCategory={handleCategorySelect} />

        {/* 5. Our Story & Craft Heritage */}
        <OurStorySection />

        {/* 6. Bespoke Services & Shopping Options */}
        <ServicesSection storeConfig={storeConfig} />

        {/* 7. Showroom Location & Contact */}
        <VisitSection storeConfig={storeConfig} />
      </main>

      {/* Footer */}
      <Footer storeConfig={storeConfig} onSelectCategory={handleCategorySelect} />

      {/* Floating Action */}
      <FloatingWhatsApp storeConfig={storeConfig} />

      {/* Modals & Slide-Out Drawers */}
      <ProductModal
        product={selectedProduct}
        storeConfig={storeConfig}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        storeConfig={storeConfig}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExplore={handleExploreHero}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onExplore={handleExploreHero}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectCategory={handleCategorySelect}
      />
    </div>
  );
}
