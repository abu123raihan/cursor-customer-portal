import { Injectable, computed, signal } from "@angular/core";
import { STATIC_CATEGORIES, STATIC_PRODUCTS, STORE_BRAND } from "./catalog.data";
import { StoreCategory, StoreProduct } from "./product.model";

/**
 * Demo catalog is static (Meesho-style marketplace UI).
 * API catalog can be re-enabled later without changing page contracts.
 */
@Injectable({ providedIn: "root" })
export class CatalogService {
  private readonly products = signal<StoreProduct[]>([...STATIC_PRODUCTS]);
  private readonly categories = signal<StoreCategory[]>([...STATIC_CATEGORIES]);
  private readonly storeName = signal<string>(STORE_BRAND.name);
  private readonly storeCurrency = signal<string>("INR");

  readonly loading = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly ready = signal(true);

  readonly allProducts = computed(() => this.products());
  readonly allCategories = computed(() => this.categories());
  readonly name = computed(() => this.storeName());
  readonly currency = computed(() => this.storeCurrency());

  readonly featured = computed(() => {
    const list = this.products();
    const tagged = list.filter((p) => p.badge === "featured" || p.badge === "sale");
    return (tagged.length ? tagged : list).slice(0, 8);
  });

  readonly newArrivals = computed(() => this.products().slice(0, 8));

  readonly maxPrice = computed(() => {
    const prices = this.products().map((p) => p.price);
    if (!prices.length) {
      return 1000;
    }
    return Math.ceil(Math.max(...prices) / 100) * 100 || 1000;
  });

  reload(): void {
    this.products.set([...STATIC_PRODUCTS]);
    this.categories.set([...STATIC_CATEGORIES]);
    this.storeName.set(STORE_BRAND.name);
    this.loading.set(false);
    this.ready.set(true);
    this.loadError.set(null);
  }

  byCategory(slug: string | null): StoreProduct[] {
    if (!slug) {
      return this.products();
    }
    const category = this.categories().find((c) => c.slug === slug);
    if (!category) {
      return [];
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
