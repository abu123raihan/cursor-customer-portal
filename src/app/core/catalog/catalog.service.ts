import { Injectable, computed, signal } from "@angular/core";
import { STORE_CATEGORIES, STORE_PRODUCTS } from "./catalog.data";
import { StoreCategory, StoreProduct } from "./product.model";

@Injectable({ providedIn: "root" })
export class CatalogService {
  private readonly products = signal<StoreProduct[]>(STORE_PRODUCTS);
  private readonly categories = signal<StoreCategory[]>(STORE_CATEGORIES);

  readonly allProducts = computed(() => this.products());
  readonly allCategories = computed(() => this.categories());
  readonly featured = computed(() =>
    this.products().filter((p) => p.badge === "featured" || p.badge === "sale").slice(0, 8)
  );
  readonly newArrivals = computed(() =>
    this.products().filter((p) => p.badge === "new" || p.badge === "featured").slice(0, 4)
  );

  byCategory(slug: string | null): StoreProduct[] {
    if (!slug) {
      return this.products();
    }
    const category = this.categories().find((c) => c.slug === slug);
    if (!category) {
      return this.products();
    }
    return this.products().filter((p) => p.categoryId === category.id);
  }

  bySlug(slug: string): StoreProduct | undefined {
    return this.products().find((p) => p.slug === slug);
  }

  byId(id: string): StoreProduct | undefined {
    return this.products().find((p) => p.id === id);
  }

  search(query: string): StoreProduct[] {
    const q = query.trim().toLowerCase();
    if (!q) {
      return this.products();
    }
    return this.products().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  categoryById(id: string): StoreCategory | undefined {
    return this.categories().find((c) => c.id === id);
  }

  categoryBySlug(slug: string): StoreCategory | undefined {
    return this.categories().find((c) => c.slug === slug);
  }
}
