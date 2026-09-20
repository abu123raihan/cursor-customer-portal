import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { ApiErrorBody, ProductReview } from "../../core/api/api.models";
import { ApiService } from "../../core/api/api.service";
import { AuthStore } from "../../core/auth/auth.store";
import { CartService } from "../../core/cart/cart.service";
import { CatalogService } from "../../core/catalog/catalog.service";
import { WishlistService } from "../../core/wishlist/wishlist.service";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-product-page",
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ProductCardComponent
  ],
  templateUrl: "./product.page.html",
  styleUrl: "./product.page.scss"
})
export class ProductPage {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(CatalogService);
  private readonly cart = inject(CartService);
  private readonly wishlist = inject(WishlistService);
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthStore);
  private readonly snack = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get("slug") ?? "")), {
    initialValue: ""
  });

  readonly quantity = signal(1);
  readonly user = this.auth.user;
  readonly reviews = signal<ProductReview[]>([]);
  readonly reviewStats = signal<{ rating: number; reviewCount: number }>({ rating: 0, reviewCount: 0 });
  readonly submittingReview = signal(false);
  readonly selectedRating = signal(5);

  readonly reviewForm = this.fb.nonNullable.group({
    body: ["", [Validators.maxLength(2000)]]
  });

  readonly product = computed(() => this.catalog.bySlug(this.slug()));
  readonly category = computed(() => {
    const product = this.product();
    return product ? this.catalog.categoryById(product.categoryId) : undefined;
  });
  readonly related = computed(() => {
    const product = this.product();
    if (!product) {
      return [];
    }
    return this.catalog
      .allProducts()
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  });

  constructor() {
    effect(() => {
      const product = this.product();
      if (!product) {
        this.reviews.set([]);
        this.reviewStats.set({ rating: 0, reviewCount: 0 });
        return;
      }
      this.loadReviews(product.id);
    });
  }

  wished(): boolean {
    const product = this.product();
    return product ? this.wishlist.has(product.id) : false;
  }

  addToCart(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    this.cart.add(product.id, this.quantity());
    this.snack.open(`${product.name} added to cart`, "Cart", { duration: 2500 });
  }

  toggleWish(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    this.wishlist.toggle(product.id);
  }

  bump(delta: number): void {
    this.quantity.update((q) => Math.max(1, q + delta));
  }

  setRating(value: number): void {
    this.selectedRating.set(value);
  }

  starIcons(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < Math.round(rating) ? "star" : "star_border"));
  }

  submitReview(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    if (!this.user()) {
      this.snack.open("Sign in to post a rating and review.", "Account", { duration: 3500 });
      return;
    }
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const body = this.reviewForm.controls.body.value.trim();
    this.submittingReview.set(true);
    this.api.postProductReview(product.id, this.selectedRating(), body).subscribe({
      next: (envelope) => {
        this.submittingReview.set(false);
        this.snack.open(
          envelope.data.updated ? "Your review was updated." : "Thanks — your review was posted.",
          "OK",
          { duration: 3000 }
        );
        this.reviewForm.reset({ body: "" });
        this.loadReviews(product.id);
        this.catalog.reload();
      },
      error: (err: { error?: ApiErrorBody; status?: number }) => {
        this.submittingReview.set(false);
        const message =
          err.error?.error?.message ??
          (err.status === 401 ? "Sign in to post a review." : "Could not post review.");
        this.snack.open(message, "OK", { duration: 4500 });
      }
    });
  }

  private loadReviews(productId: string): void {
    this.api.getProductReviews(productId).subscribe({
      next: (envelope) => {
        this.reviews.set(envelope.data.reviews);
        this.reviewStats.set({
          rating: envelope.data.rating,
          reviewCount: envelope.data.reviewCount
        });
      },
      error: () => {
        this.reviews.set([]);
      }
    });
  }
}
