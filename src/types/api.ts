export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SupabaseQueryOptions {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  ascending?: boolean;
  filters?: Record<string, any>;
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}



