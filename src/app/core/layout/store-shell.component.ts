import { UpperCasePipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { WebsiteNavMenu } from "../api/api.models";
import { ApiService } from "../api/api.service";
import { AuthStore } from "../auth/auth.store";
import { CartService } from "../cart/cart.service";
import { STORE_BRAND } from "../catalog/catalog.data";
import { CatalogService } from "../catalog/catalog.service";
import { WishlistService } from "../wishlist/wishlist.service";

const FALLBACK_MENUS: WebsiteNavMenu[] = [
  { id: "home", menuId: "home", parentId: null, label: "Home", route: "/home", sortOrder: 10 },
  { id: "shop", menuId: "shop", parentId: null, label: "Shop", route: "/shop", sortOrder: 20 },
  { id: "cart", menuId: "cart", parentId: null, label: "Cart", route: "/cart", sortOrder: 30 },
  { id: "wishlist", menuId: "wishlist", parentId: null, label: "Wishlist", route: "/wishlist", sortOrder: 40 },
  { id: "account", menuId: "account", parentId: null, label: "Account", route: "/account", sortOrder: 50 }
];

@Component({
  selector: "app-store-shell",
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule
  ],
  templateUrl: "./store-shell.component.html",
  styleUrl: "./store-shell.component.scss"
})
export class StoreShellComponent {
  readonly brand = STORE_BRAND;
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);
  readonly catalog = inject(CatalogService);
  readonly auth = inject(AuthStore);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  readonly mobileOpen = signal(false);
  readonly menus = signal<WebsiteNavMenu[]>(FALLBACK_MENUS);
  searchQuery = "";
  searchCategory = "all";

  constructor() {
    this.api.getMenus().subscribe({
      next: (envelope) => {
        const top = envelope.data.filter((item) => !item.parentId).sort((a, b) => a.sortOrder - b.sortOrder);
        if (top.length) this.menus.set(top);
      }
    });
  }

  submitSearch(): void {
    const q = this.searchQuery.trim();
    const category = this.searchCategory !== "all" ? this.searchCategory : null;
    void this.router.navigate(category ? ["/shop", category] : ["/shop"], {
      queryParams: q ? { q } : {}
    });
    this.mobileOpen.set(false);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
