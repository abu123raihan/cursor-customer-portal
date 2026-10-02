import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { STATIC_BANNERS, STORE_BRAND } from "../../core/catalog/catalog.data";
import { CatalogService } from "../../core/catalog/catalog.service";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [FormsModule, RouterLink, ProductCardComponent],
  templateUrl: "./home.page.html",
  styleUrl: "./home.page.scss"
})
export class HomePage {
  readonly catalog = inject(CatalogService);
  readonly brand = STORE_BRAND;
  readonly banners = STATIC_BANNERS;

  readonly filterCategory = signal<string>("all");
  readonly filterSort = signal<"default" | "price-asc" | "price-desc" | "rating" | "discount">("default");
  readonly filterMinRating = signal<number>(0);
  readonly filterMaxPrice = signal<number>(2000);
  readonly filterOnSale = signal(false);

  readonly priceCeiling = computed(() => Math.max(this.catalog.maxPrice(), 500));

  readonly filteredProducts = computed(() => {
    const cat = this.filterCategory();
    let list =
      cat === "all" ? this.catalog.allProducts() : this.catalog.byCategory(cat);

    const maxPrice = this.filterMaxPrice();
    list = list.filter((p) => p.price <= maxPrice);

    const minRating = this.filterMinRating();
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    if (this.filterOnSale()) {
      list = list.filter((p) => !!p.compareAtPrice && p.compareAtPrice > p.price);
    }

    switch (this.filterSort()) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list = [...list].sort((a, b) => {
          const da = a.compareAtPrice ? 1 - a.price / a.compareAtPrice : 0;
          const db = b.compareAtPrice ? 1 - b.price / b.compareAtPrice : 0;
          return db - da;
        });
        break;
      default:
        break;
    }

    return list;
  });

  setCategory(slug: string): void {
    this.filterCategory.set(slug);
  }

  clearFilters(): void {
    this.filterCategory.set("all");
    this.filterSort.set("default");
    this.filterMinRating.set(0);
    this.filterMaxPrice.set(this.priceCeiling());
    this.filterOnSale.set(false);
  }
}
