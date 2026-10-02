import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthStore } from "../auth/auth.store";
import { CartService } from "../cart/cart.service";
import { NavItem, STATIC_NAV, STORE_BRAND } from "../catalog/catalog.data";
import { CatalogService } from "../catalog/catalog.service";
import { WishlistService } from "../wishlist/wishlist.service";

@Component({
  selector: "app-store-shell",
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule
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
  private readonly router = inject(Router);

  readonly mobileOpen = signal(false);
  readonly openMenuId = signal<string | null>(null);
  readonly popupPos = signal<{ top: string; left: string; width: string } | null>(null);
  readonly menus = STATIC_NAV;
  readonly activeMenu = computed(() => {
    const id = this.openMenuId();
    return id ? this.menus.find((m) => m.id === id) ?? null : null;
  });
  searchQuery = "";

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  submitSearch(): void {
    const q = this.searchQuery.trim();
    void this.router.navigate(["/shop"], { queryParams: q ? { q } : {} });
    this.mobileOpen.set(false);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  openPopup(item: NavItem, host?: EventTarget | null): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    if (!item.children?.length) {
      this.openMenuId.set(null);
      this.popupPos.set(null);
      return;
    }
    this.openMenuId.set(item.id);
    this.positionPopup(host instanceof HTMLElement ? host : null);
  }

  scheduleClosePopup(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
    this.closeTimer = setTimeout(() => {
      this.openMenuId.set(null);
      this.popupPos.set(null);
    }, 160);
  }

  keepPopupOpen(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  closePopup(): void {
    this.openMenuId.set(null);
    this.popupPos.set(null);
  }

  isOpen(item: NavItem): boolean {
    return this.openMenuId() === item.id;
  }

  private positionPopup(host: HTMLElement | null): void {
    if (!host || typeof window === "undefined") {
      this.popupPos.set(null);
      return;
    }
    const anchor = host.classList.contains("nav-item") ? host : host.closest(".nav-item") ?? host;
    const rect = anchor.getBoundingClientRect();
    const width = Math.min(420, window.innerWidth - 32);
    let left = rect.left;
    if (left + width > window.innerWidth - 16) {
      left = Math.max(16, rect.right - width);
    }
    if (left < 16) {
      left = 16;
    }
    this.popupPos.set({
      top: `${Math.round(rect.bottom - 2)}px`,
      left: `${Math.round(left)}px`,
      width: `${Math.round(width)}px`
    });
  }
}
