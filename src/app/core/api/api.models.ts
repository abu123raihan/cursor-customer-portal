export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiEnvelope<T> {
  data: T;
}

export interface HealthStatus {
  status: "ok";
  service: string;
}

export interface WebsiteNavMenu {
  id: string;
  menuId: string;
  parentId: string | null;
  label: string;
  route: string;
  sortOrder: number;
}
