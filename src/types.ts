export type ProductCategory =
  | 'All'
  | 'Home Appliances'
  | 'Electronics & Accessories'
  | 'Lighting & Home Improvement'
  | 'Clothing'
  | 'Footwear'
  | 'Fragrances';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  description: string;
  shortDesc: string;
  features: string[];
  materials?: string;
  dimensions?: string;
  care?: string;
  colors?: ProductColor[];
  sizes?: string[];
  unit?: string;
  inStock: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  unit?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface StoreConfig {
  name: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  currency: string;
  freeShippingThreshold: number;
  mapEmbedUrl: string;
  social: {
    facebook: string;
    whatsapp: string;
    instagram: string;
    tiktok: string;
  };
  socialHandles: {
    facebook: string;
    whatsapp: string;
    instagram: string;
    tiktok: string;
  };
}
