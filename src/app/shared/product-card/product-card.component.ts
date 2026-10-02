import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterLink } from "@angular/router";
import { CartService } from "../../core/cart/cart.service";
import { StoreProduct } from "../../core/catalog/product.model";
import { WishlistService } from "../../core/wishlist/wishlist.service";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, RouterLink, MatIconModule, MatSnackBarModule],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss"
})
export class ProductCardComponent {
  @Input({ required: true }) product!: StoreProduct;

  private readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly snack = inject(MatSnackBar);

  discountPercent(): number | null {
    if (!this.product.compareAtPrice || this.product.compareAtPrice <= this.product.price) {
      return null;
    }
    return Math.round((1 - this.product.price / this.product.compareAtPrice) * 100);
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
