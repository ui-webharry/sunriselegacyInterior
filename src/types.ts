export type ProductCategory =
  | 'All'
  | 'Kitchen & Dining'
  | 'Bedding & Bedrooms'
  | 'Home Décor & Accents'
  | 'Lighting & Fans'
  | 'Home Textiles & Rugs'
  | 'Fabrics & Materials'
  | 'Clothing'
  | 'Footwear'
  | 'Clothing & Footwear'
  | 'Appliances & Gadgets'
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
  originalPrice?: number;
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
  unit?: string; // e.g. "per meter", "per pair", "set"
  inStock: boolean;
  rating: number;
  reviewsCount: number;
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
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}
