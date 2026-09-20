import { CurrencyPipe } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { CartService } from "../../core/cart/cart.service";
import { CatalogService } from "../../core/catalog/catalog.service";
import { WishlistService } from "../../core/wishlist/wishlist.service";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-product-page",
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ProductCardComponent
  ],
  templateUrl: "./product.page.html",
  styleUrl: "./product.page.scss"
})
export class ProductPage {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly snack = inject(MatSnackBar);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get("slug") ?? "")), {
    initialValue: ""
  });

  readonly quantity = signal(1);

  readonly product = computed(() => this.catalog.bySlug(this.slug()));
  readonly category = computed(() => {
    const product = this.product();
    return product ? this.catalog.categoryById(product.categoryId) : undefined;
  });
  readonly related = computed(() => {
    const product = this.product();
    if (!product) {
      return [];
    }
    return this.catalog
      .allProducts()
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  });

  wished(): boolean {
    const product = this.product();
    return product ? this.wishlist.has(product.id) : false;
  }

  addToCart(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    this.cart.add(product.id, this.quantity());
    this.snack.open(`${product.name} added to cart`, "Cart", { duration: 2500 });
  }

  toggleWish(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    this.wishlist.toggle(product.id);
  }

  bump(delta: number): void {
    this.quantity.update((q) => Math.max(1, q + delta));
  }
}
