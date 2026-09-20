import { Routes } from "@angular/router";
import { StoreShellComponent } from "./core/layout/store-shell.component";
import { AccountPage } from "./pages/account/account.page";
import { ResetPasswordPage } from "./pages/account/reset-password.page";
import { CartPage } from "./pages/cart/cart.page";
import { ContactPage } from "./pages/contact/contact.page";
import { HomePage } from "./pages/home/home.page";
import { ProductPage } from "./pages/product/product.page";
import { ShopPage } from "./pages/shop/shop.page";
import { WishlistPage } from "./pages/wishlist/wishlist.page";

export const routes: Routes = [
  {
    path: "",
    component: StoreShellComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "shop" },
      { path: "home", component: HomePage },
      { path: "shop", component: ShopPage },
      { path: "shop/:categorySlug", component: ShopPage },
      { path: "product/:slug", component: ProductPage },
      { path: "cart", component: CartPage },
      { path: "wishlist", component: WishlistPage },
      { path: "account/reset-password", component: ResetPasswordPage },
      { path: "account", component: AccountPage },
      { path: "contact", component: ContactPage },
      { path: "**", redirectTo: "" }
    ]
  }
];
