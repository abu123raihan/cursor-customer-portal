import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiEnvelope, HealthStatus, WebsiteNavMenu } from "./api.models";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, "");
  private readonly storeHost = environment.storeHost;

  private storeHeaders() {
    return { "X-Store-Host": this.storeHost };
  }

  getHealth(): Observable<ApiEnvelope<HealthStatus>> {
    return this.http.get<ApiEnvelope<HealthStatus>>(`${this.baseUrl}/health`);
  }

  getStore(): Observable<ApiEnvelope<{ name: string }>> {
    return this.http.get<ApiEnvelope<{ name: string }>>(`${this.baseUrl}/api/v1/public/store`, {
      headers: this.storeHeaders()
    });
  }

  getMenus(): Observable<ApiEnvelope<WebsiteNavMenu[]>> {
    return this.http.get<ApiEnvelope<WebsiteNavMenu[]>>(`${this.baseUrl}/api/v1/public/store/menus`, {
      headers: this.storeHeaders()
    });
  }
}
