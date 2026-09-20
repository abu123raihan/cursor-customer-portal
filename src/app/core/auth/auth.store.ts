import { Injectable, computed, signal } from "@angular/core";
import { CustomerSession, SessionUser } from "../api/api.models";

const ACCESS_KEY = "portal.accessToken";
const REFRESH_KEY = "portal.refreshToken";
const USER_KEY = "portal.user";

@Injectable({ providedIn: "root" })
export class AuthStore {
  private readonly userSignal = signal<SessionUser | null>(readUser());
  readonly user = this.userSignal.asReadonly();
  readonly isCustomer = computed(() => this.userSignal()?.principalType === "customer");
  readonly displayName = computed(() => this.userSignal()?.displayName ?? null);

  accessToken(): string | null {
    return sessionStorage.getItem(ACCESS_KEY);
  }

  refreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_KEY);
  }

  setSession(session: CustomerSession): void {
    sessionStorage.setItem(ACCESS_KEY, session.accessToken);
    sessionStorage.setItem(REFRESH_KEY, session.refreshToken);
    sessionStorage.setItem(USER_KEY, JSON.stringify(session.user));
    this.userSignal.set(session.user);
  }

  clear(): void {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.userSignal.set(null);
  }
}

function readUser(): SessionUser | null {
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
