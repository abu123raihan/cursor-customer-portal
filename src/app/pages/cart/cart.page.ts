import { CurrencyPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CartService } from "../../core/cart/cart.service";

@Component({
  selector: "app-cart-page",
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: "./cart.page.html",
  styleUrl: "./cart.page.scss"
})
export class CartPage {
  private readonly cart = inject(CartService);

  readonly lines = computed(() => this.cart.detailed());
  readonly subtotal = computed(() => this.cart.subtotal());
  readonly count = this.cart.count;

  setQty(productId: string, quantity: number): void {
    this.cart.setQuantity(productId, quantity);
  }

  remove(productId: string): void {
    this.cart.remove(productId);
  }

  clear(): void {
    this.cart.clear();
  }
}
