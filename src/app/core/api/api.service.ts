import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiEnvelope, HealthStatus } from "./api.models";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, "");

  getHealth(): Observable<ApiEnvelope<HealthStatus>> {
    return this.http.get<ApiEnvelope<HealthStatus>>(`${this.baseUrl}/health`);
  }
}
