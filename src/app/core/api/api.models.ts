export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiEnvelope<T> {
  data: T;
}

export interface HealthStatus {
  status: "ok";
  service: string;
}

export interface WebsiteNavMenu {
  id: string;
  menuId: string;
  parentId: string | null;
  label: string;
  route: string;
  sortOrder: number;
}

export interface PublicStoreCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface PublicStoreProduct {
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

export interface PublicStore {
  name: string;
  slug: string;
  companyType: string;
  currency: string;
  categories: PublicStoreCategory[];
  products: PublicStoreProduct[];
  catalog: PublicStoreProduct[];
  message?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
  principalType: "super_admin" | "admin" | "admin_staff" | "employee" | "customer" | "agent";
  companyId: string | null;
  permissions: string[];
  mfaEnabled: boolean;
}

export interface CustomerSession {
  requiresOtp: false;
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
  created: boolean;
  partyId: string;
}

export interface ForgotPasswordResult {
  message: string;
  sent?: boolean;
  emailHint?: string;
  transport?: "smtp" | "ethereal";
  /** Ethereal preview (local/dev without SMTP). */
  previewUrl?: string;
  /** Present in non-production so local testing works without opening mail. */
  devResetUrl?: string;
}

export interface ResetPasswordResult {
  message: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  rating: number;
  body: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  updated?: boolean;
}

export interface ProductReviewList {
  productId: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}
