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
