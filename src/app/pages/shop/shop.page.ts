import { CurrencyPipe, DecimalPipe, UpperCasePipe } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { map } from "rxjs";
import { CatalogService } from "../../core/catalog/catalog.service";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-shop-page",
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    UpperCasePipe,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatSliderModule,
    ProductCardComponent
  ],
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
  readonly pageSize = signal(12);
  readonly view = signal<"grid" | "comfortable" | "list">("grid");
  readonly priceMin = signal(0);
  readonly priceMax = signal(1000);

  readonly colors = [
    "#2196f3",
    "#4caf50",
    "#f44336",
    "#9c27b0",
    "#e91e63",
    "#009688",
    "#03a9f4",
    "#ffeb3b",
    "#9e9e9e",
    "#795548",
    "#607d8b",
    "#000000",
    "#ffffff",
    "#ff9800",
    "#cddc39",
    "#3f51b5"
  ];

  readonly priceCeiling = computed(() => Math.max(this.catalog.maxPrice(), 100));

  readonly category = computed(() => {
    const slug = this.categorySlug();
    return slug ? this.catalog.categoryBySlug(slug) : undefined;
  });

  readonly products = computed(() => {
    const q = this.query().trim();
    let list = q ? this.catalog.search(q) : this.catalog.byCategory(this.categorySlug());
    list = list.filter((p) => p.price >= this.priceMin() && p.price <= this.priceMax());

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
    return list.slice(0, this.pageSize());
  });

  readonly title = computed(() => {
    if (this.query()) {
      return `Search: “${this.query()}”`;
    }
    return (this.category()?.name ?? "All Products").toUpperCase();
  });

  constructor() {
    effect(() => {
      const ceiling = this.priceCeiling();
      if (this.priceMax() > ceiling || this.priceMax() < 1) {
        this.priceMax.set(ceiling);
      }
      if (this.priceMin() > ceiling) {
        this.priceMin.set(0);
      }
    });
  }
}
