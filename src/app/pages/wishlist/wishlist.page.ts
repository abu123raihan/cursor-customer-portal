import { CurrencyPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CartService } from "../../core/cart/cart.service";
import { WishlistService } from "../../core/wishlist/wishlist.service";

@Component({
  selector: "app-wishlist-page",
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: "./wishlist.page.html",
  styleUrl: "./wishlist.page.scss"
})
export class WishlistPage {
  private readonly wishlist = inject(WishlistService);
  private readonly cart = inject(CartService);

  readonly products = computed(() => this.wishlist.products());

  moveToCart(productId: string): void {
    this.cart.add(productId);
    this.wishlist.remove(productId);
  }

  remove(productId: string): void {
    this.wishlist.remove(productId);
  }
}
