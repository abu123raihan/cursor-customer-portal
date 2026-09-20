export interface StoreCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface StoreProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  brand: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  unit: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: "new" | "sale" | "featured";
  image: string;
  features: string[];
}
