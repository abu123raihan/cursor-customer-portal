import { CurrencyPipe } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { CartService } from "../../core/cart/cart.service";
import { CatalogService } from "../../core/catalog/catalog.service";
import { StoreProduct } from "../../core/catalog/product.model";
import { WishlistService } from "../../core/wishlist/wishlist.service";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss"
})
export class ProductCardComponent {
  @Input({ required: true }) product!: StoreProduct;

  private readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly catalog = inject(CatalogService);
  private readonly snack = inject(MatSnackBar);

  categoryName(): string {
    return this.catalog.categoryById(this.product.categoryId)?.name ?? "Products";
  }

  discountPercent(): number | null {
    if (!this.product.compareAtPrice || this.product.compareAtPrice <= this.product.price) {
      return null;
    }
    return Math.round((1 - this.product.price / this.product.compareAtPrice) * 100);
  }

  stars(): string[] {
    const full = Math.floor(this.product.rating);
    const half = this.product.rating - full >= 0.25 && this.product.rating - full < 0.75;
    const icons: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        icons.push("star");
      } else if (i === full && half) {
        icons.push("star_half");
      } else {
        icons.push("star_border");
      }
    }
    return icons;
  }

  wished(): boolean {
    return this.wishlist.has(this.product.id);
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.add(this.product.id);
    this.snack.open(`${this.product.name} added to cart`, "View", { duration: 2500 });
  }

  toggleWish(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.wishlist.toggle(this.product.id);
  }
}
