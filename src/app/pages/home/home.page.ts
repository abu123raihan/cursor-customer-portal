import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h1>Shop without an account</h1>
      <p>Guest catalog, cart, and wishlist. Sign in only when you need orders and invoices.</p>
      @if (products().length === 0) {
        <p class="empty">No products synced from ERP inventory yet. Add items in the company Products module, then they appear here.</p>
      }
      <p><a routerLink="/cart">Go to cart</a></p>
    </section>
  `
})
export class HomePage {
  readonly products = signal<unknown[]>([]);
}
