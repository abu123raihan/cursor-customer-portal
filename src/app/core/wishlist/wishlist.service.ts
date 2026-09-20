import { Injectable, computed, signal } from "@angular/core";
import { CatalogService } from "../catalog/catalog.service";
import { StoreProduct } from "../catalog/product.model";

const STORAGE_KEY = "ak-electricals-wishlist";

@Injectable({ providedIn: "root" })
export class WishlistService {
  private readonly ids = signal<string[]>(this.read());

  readonly count = computed(() => this.ids().length);
  readonly productIds = computed(() => this.ids());

  constructor(private readonly catalog: CatalogService) {}

  products(): StoreProduct[] {
    return this.ids()
      .map((id) => this.catalog.byId(id))
      .filter((p): p is StoreProduct => !!p);
  }

  has(productId: string): boolean {
    return this.ids().includes(productId);
  }

  toggle(productId: string): void {
    if (this.has(productId)) {
      this.persist(this.ids().filter((id) => id !== productId));
      return;
    }
    this.persist([...this.ids(), productId]);
  }

  remove(productId: string): void {
    this.persist(this.ids().filter((id) => id !== productId));
  }

  private persist(ids: string[]): void {
    this.ids.set(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  private read(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as string[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
