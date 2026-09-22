import { Component, OnDestroy, OnInit, computed, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CatalogService } from "../../core/catalog/catalog.service";
import { STORE_BRAND } from "../../core/catalog/catalog.data";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, ProductCardComponent],
  templateUrl: "./home.page.html",
  styleUrl: "./home.page.scss"
})
export class HomePage implements OnInit, OnDestroy {
  readonly catalog = inject(CatalogService);
  readonly brand = STORE_BRAND;
  readonly slideIndex = signal(0);

  readonly slides = computed(() => {
    const name = this.brand.legalName;
    const cats = this.catalog.allCategories();
    const first = cats[0];
    const second = cats[1];
    return [
      {
        eyebrow: name,
        title: `Shop ${name} online`,
        text: "Guest catalog synced from AK Fussion inventory. Add to cart without signing in.",
        cta: "Shop bestsellers",
        link: "/shop",
        image:
          first?.image ??
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1600&q=80"
      },
      {
        eyebrow: first?.name ?? "Categories",
        title: first ? `Browse ${first.name}` : "Browse the catalogue",
        text: first?.description || "Categories and products from cursor-node-api.",
        cta: first ? `Shop ${first.name}` : "View all",
        link: first ? `/shop/${first.slug}` : "/shop",
        image:
          first?.image ??
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
      },
      {
        eyebrow: second?.name ?? "More to explore",
        title: second ? `${second.name} essentials` : "Trade support & GST invoices",
        text: second?.description || "Sign in at checkout for orders and invoice download.",
        cta: second ? `Shop ${second.name}` : "Contact us",
        link: second ? `/shop/${second.slug}` : "/contact",
        image:
          second?.image ??
          "https://images.unsplash.com/photo-1473341304170-971dccb5ce1e?auto=format&fit=crop&w=1600&q=80"
      }
    ];
  });

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      const len = this.slides().length || 1;
      this.slideIndex.update((i) => (i + 1) % len);
    }, 5500);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  go(index: number): void {
    this.slideIndex.set(index);
  }

  next(): void {
    const len = this.slides().length || 1;
    this.slideIndex.update((i) => (i + 1) % len);
  }

  prev(): void {
    const len = this.slides().length || 1;
    this.slideIndex.update((i) => (i - 1 + len) % len);
  }
}
