import { Injectable, computed, inject, signal } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { ApiService } from "../api/api.service";
import { PublicStore, PublicStoreCategory, PublicStoreProduct } from "../api/api.models";
import { STORE_BRAND } from "./catalog.data";
import { StoreCategory, StoreProduct } from "./product.model";

@Injectable({ providedIn: "root" })
export class CatalogService {
  private readonly api = inject(ApiService);

  private readonly products = signal<StoreProduct[]>([]);
  private readonly categories = signal<StoreCategory[]>([]);
  private readonly storeName = signal<string>(STORE_BRAND.name);
  private readonly storeCurrency = signal<string>("INR");

  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly ready = signal(false);

  readonly allProducts = computed(() => this.products());
  readonly allCategories = computed(() => this.categories());
  readonly name = computed(() => this.storeName());
  readonly currency = computed(() => this.storeCurrency());

  readonly featured = computed(() => {
    const list = this.products();
    const tagged = list.filter((p) => p.badge === "featured" || p.badge === "sale");
    return (tagged.length ? tagged : list).slice(0, 8);
  });

  readonly newArrivals = computed(() => this.products().slice(0, 4));

  readonly maxPrice = computed(() => {
    const prices = this.products().map((p) => p.price);
    if (!prices.length) {
      return 1000;
    }
    return Math.ceil(Math.max(...prices) / 100) * 100 || 1000;
  });

  constructor() {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.loadError.set(null);
    this.api
      .getPublicStore()
      .pipe(
        tap((envelope) => this.applyStore(envelope.data)),
        catchError((err: unknown) => {
          const message =
            err && typeof err === "object" && "message" in err
              ? String((err as { message: unknown }).message)
              : "Could not load store catalog from API.";
          this.loadError.set(message);
          this.loading.set(false);
          this.ready.set(true);
          return of(null);
        })
      )
      .subscribe();
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

  private applyStore(store: PublicStore): void {
    this.storeName.set(store.name || STORE_BRAND.name);
    this.storeCurrency.set("INR");
    this.categories.set(store.categories.map((c) => this.mapCategory(c)));
    this.products.set((store.products?.length ? store.products : store.catalog).map((p) => this.mapProduct(p)));
    this.loading.set(false);
    this.ready.set(true);
    this.loadError.set(null);
  }

  private mapCategory(c: PublicStoreCategory): StoreCategory {
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      image: c.image
    };
  }

  private mapProduct(p: PublicStoreProduct): StoreProduct {
    return {
      id: p.id,
      sku: p.sku,
      name: p.name,
      slug: p.slug,
      categoryId: p.categoryId,
      brand: p.brand || "Store",
      description: p.description ?? "",
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice != null ? Number(p.compareAtPrice) : undefined,
      currency: "INR",
      unit: p.unit || "pcs",
      rating: p.rating ?? 4.5,
      reviewCount: p.reviewCount ?? 0,
      inStock: p.inStock !== false,
      badge: p.badge,
      image: p.image,
      features: p.features ?? []
    };
  }
}
