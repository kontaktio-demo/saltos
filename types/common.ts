/** Common shared types. */

export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };

export type PaginationParams = {
  page?: number;
  pageSize?: number;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
