import { Component, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="shop">
      <header>
        <a routerLink="/" class="brand">{{ storeName() }}</a>
        <nav>
          <a routerLink="/">Shop</a>
          <a routerLink="/cart">Cart ({{ cartCount() }})</a>
          <a routerLink="/wishlist">Wishlist</a>
          <a routerLink="/account">Account</a>
        </nav>
      </header>
      <main><router-outlet /></main>
    </div>
  `,
  styles: [
    `
      .shop { min-height: 100vh; background: #f7f4ef; color: #1c1917; }
      header {
        display: flex; justify-content: space-between; gap: 1rem; align-items: center;
        padding: 1rem 1.25rem; background: #fff; border-bottom: 1px solid #e7e0d6;
      }
      nav { display: flex; gap: 1rem; }
      a { color: inherit; text-decoration: none; }
      .brand { font-weight: 700; }
      main { padding: 1.25rem; max-width: 70rem; margin: 0 auto; }
    `
  ]
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  readonly storeName = signal("Store");
  readonly cartCount = signal(0);

  constructor() {
    this.http
      .get<{ data: { name: string } }>(`${environment.apiBaseUrl}/api/v1/public/store`, {
        headers: { "X-Store-Host": "demo" }
      })
      .subscribe({
        next: (envelope) => this.storeName.set(envelope.data.name)
      });
  }
}
