import { Component, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { CatalogService } from "../../core/catalog/catalog.service";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, ProductCardComponent],
  templateUrl: "./home.page.html",
  styleUrl: "./home.page.scss"
})
export class HomePage implements OnInit, OnDestroy {
  readonly catalog = inject(CatalogService);
  readonly slideIndex = signal(0);

  readonly slides = [
    {
      eyebrow: "AK Electricals",
      title: "Power your projects with trusted electrical stock",
      text: "Switches, LED lighting, cables, and switchgear — ready for contractors and homeowners.",
      cta: "Shop bestsellers",
      link: "/shop",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80"
    },
    {
      eyebrow: "Lighting collection",
      title: "Bright LEDs for homes, shops & factories",
      text: "Panels, battens, and IP65 floods with energy-saving drivers.",
      cta: "Browse lighting",
      link: "/shop/lighting",
      image: "https://images.unsplash.com/photo-1524484485612-18f1cec4a3b8?auto=format&fit=crop&w=1600&q=80"
    },
    {
      eyebrow: "Trade desk",
      title: "Same-day dispatch from our Pune warehouse",
      text: "Bulk coils, DB boards, and site essentials with GST invoices on checkout.",
      cta: "Talk to sales",
      link: "/contact",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ce1e?auto=format&fit=crop&w=1600&q=80"
    }
  ];

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.slideIndex.update((i) => (i + 1) % this.slides.length);
    }, 5500);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  go(index: number): void {
    this.slideIndex.set(index);
  }

  next(): void {
    this.slideIndex.update((i) => (i + 1) % this.slides.length);
  }

  prev(): void {
    this.slideIndex.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }
}
