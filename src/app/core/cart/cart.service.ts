import { Injectable, computed, signal } from "@angular/core";
import { CatalogService } from "../catalog/catalog.service";
import { StoreProduct } from "../catalog/product.model";

export interface CartLine {
  productId: string;
  quantity: number;
}

const STORAGE_KEY = "ak-electricals-cart";

@Injectable({ providedIn: "root" })
export class CartService {
  private readonly lines = signal<CartLine[]>(this.read());

  readonly count = computed(() => this.lines().reduce((sum, line) => sum + line.quantity, 0));
  readonly items = computed(() => this.lines());

  constructor(private readonly catalog: CatalogService) {}

  detailed() {
    return this.lines()
      .map((line) => {
        const product = this.catalog.byId(line.productId);
        if (!product) {
          return null;
        }
        return { product, quantity: line.quantity, lineTotal: product.price * line.quantity };
      })
      .filter((row): row is { product: StoreProduct; quantity: number; lineTotal: number } => !!row);
  }

  subtotal(): number {
    return this.detailed().reduce((sum, row) => sum + row.lineTotal, 0);
  }

  add(productId: string, quantity = 1): void {
    const next = [...this.lines()];
    const existing = next.find((line) => line.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      next.push({ productId, quantity });
    }
    this.persist(next);
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    const next = this.lines().map((line) =>
      line.productId === productId ? { ...line, quantity } : line
    );
    this.persist(next);
  }

  remove(productId: string): void {
    this.persist(this.lines().filter((line) => line.productId !== productId));
  }

  clear(): void {
    this.persist([]);
  }

  private persist(lines: CartLine[]): void {
    this.lines.set(lines);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }

  private read(): CartLine[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as CartLine[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
