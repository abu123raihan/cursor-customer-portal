import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-simple-page",
  standalone: true,
  template: `
    <section>
      <h1>{{ title }}</h1>
      <p>{{ body }}</p>
      <p class="empty">Guest users can keep a local cart and wishlist. Checkout and invoice download require a customer account.</p>
    </section>
  `
})
export class SimplePage {
  private readonly route = inject(ActivatedRoute);
  title = String(this.route.snapshot.data["title"] ?? "Page");
  body =
    this.title === "Account"
      ? "Order tracking, invoice download, wishlist, and tickets will live here."
      : "E-commerce facilities for this tenant storefront.";
}
