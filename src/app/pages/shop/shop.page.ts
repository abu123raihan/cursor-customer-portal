import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { map } from "rxjs";
import { CatalogService } from "../../core/catalog/catalog.service";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-shop-page",
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, ProductCardComponent],
  templateUrl: "./shop.page.html",
  styleUrl: "./shop.page.scss"
})
export class ShopPage {
  private readonly route = inject(ActivatedRoute);
  readonly catalog = inject(CatalogService);

  private readonly categorySlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get("categorySlug"))),
    { initialValue: null as string | null }
  );
  private readonly query = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get("q") ?? "")),
    { initialValue: "" }
  );

  readonly sort = signal<"default" | "price-asc" | "price-desc" | "name">("default");

  readonly category = computed(() => {
    const slug = this.categorySlug();
    return slug ? this.catalog.categoryBySlug(slug) : undefined;
  });

  readonly products = computed(() => {
    const q = this.query().trim();
    let list = q ? this.catalog.search(q) : this.catalog.byCategory(this.categorySlug());

    switch (this.sort()) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  });

  readonly title = computed(() => {
    if (this.query()) {
      return `Search: “${this.query()}”`;
    }
    return this.category()?.name ?? "Products For You";
  });
}
