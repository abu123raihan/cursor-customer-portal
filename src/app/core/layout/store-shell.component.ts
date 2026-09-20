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
import { CartService } from "../cart/cart.service";
import { STORE_BRAND } from "../catalog/catalog.data";
import { CatalogService } from "../catalog/catalog.service";
import { WishlistService } from "../wishlist/wishlist.service";

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
  private readonly router = inject(Router);

  readonly mobileOpen = signal(false);
  searchQuery = "";
  searchCategory = "all";

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
