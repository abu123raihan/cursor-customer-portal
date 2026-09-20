import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiEnvelope, CustomerSession, ForgotPasswordResult, HealthStatus, PublicStore, ResetPasswordResult } from "./api.models";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, "");

  /** Dev default matches demo-grocery via API host fallback / X-Store-Host. */
  private readonly storeHost = environment.storeHost ?? "demo";

  private storeHeaders(): { "X-Store-Host": string } {
    return { "X-Store-Host": this.storeHost };
  }

  getHealth(): Observable<ApiEnvelope<HealthStatus>> {
    return this.http.get<ApiEnvelope<HealthStatus>>(`${this.baseUrl}/health`);
  }

  getPublicStore(): Observable<ApiEnvelope<PublicStore>> {
    return this.http.get<ApiEnvelope<PublicStore>>(`${this.baseUrl}/api/v1/public/store`, {
      headers: this.storeHeaders()
    });
  }

  /** Login; creates a customer account in the DB when the email is new. */
  loginOrRegister(
    email: string,
    password: string,
    displayName?: string
  ): Observable<ApiEnvelope<CustomerSession>> {
    return this.http.post<ApiEnvelope<CustomerSession>>(
      `${this.baseUrl}/api/v1/public/auth/login-or-register`,
      { email, password, displayName: displayName || undefined },
      { headers: this.storeHeaders() }
    );
  }

  forgotPassword(email: string): Observable<ApiEnvelope<ForgotPasswordResult>> {
    return this.http.post<ApiEnvelope<ForgotPasswordResult>>(
      `${this.baseUrl}/api/v1/public/auth/forgot-password`,
      { email },
      { headers: this.storeHeaders() }
    );
  }

  resetPassword(token: string, password: string): Observable<ApiEnvelope<ResetPasswordResult>> {
    return this.http.post<ApiEnvelope<ResetPasswordResult>>(
      `${this.baseUrl}/api/v1/public/auth/reset-password`,
      { token, password }
    );
  }
}
