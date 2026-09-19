import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api/api.service";
import { HealthStatus } from "../../core/api/api.models";

type ViewState = "loading" | "ready" | "empty" | "error";

@Component({
  selector: "app-health-page",
  standalone: true,
  templateUrl: "./health.page.html",
  styleUrl: "./health.page.scss"
})
export class HealthPage {
  private readonly api = inject(ApiService);

  readonly state = signal<ViewState>("loading");
  readonly health = signal<HealthStatus | null>(null);
  readonly errorMessage = signal("Unable to reach cursor-node-api.");

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.state.set("loading");
    this.health.set(null);

    this.api.getHealth().subscribe({
      next: (envelope) => {
        if (!envelope.data) {
          this.state.set("empty");
          return;
        }

        this.health.set(envelope.data);
        this.state.set("ready");
      },
      error: () => {
        this.state.set("error");
        this.errorMessage.set("Unable to reach cursor-node-api. Start it on port 3000.");
      }
    });
  }
}
