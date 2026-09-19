import { Routes } from "@angular/router";
import { HomePage } from "./pages/home/home.page";
import { SimplePage } from "./pages/simple.page";

export const routes: Routes = [
  { path: "", component: HomePage },
  { path: "cart", component: SimplePage, data: { title: "Cart" } },
  { path: "wishlist", component: SimplePage, data: { title: "Wishlist" } },
  { path: "account", component: SimplePage, data: { title: "Customer portal" } },
  { path: "**", component: HomePage }
];
