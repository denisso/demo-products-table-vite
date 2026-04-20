import { fetcher } from '@/shared/api/fetcher';
import type { Product } from '../types';
import { APP_CONFIG } from '@/shared/config';

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type GetProductsRequestParams = {
  sortBy?: string;
  order?: 'asc' | 'desc';
  currentPage?: number;
  search?: string;
  select?: string[];
  limit?: number;
};

export const getProducts = async ({
  sortBy,
  order,
  currentPage = 1,
  search,
  select,
  limit = APP_CONFIG.TABLE_PAGE_LIMIT,
}: GetProductsRequestParams): Promise<GetProductsResponse> => {
  const params = new URLSearchParams();
  const skip = (currentPage - 1) * limit;

  if (Array.isArray(select)) {
    params.set('select', String(select));
  }

  params.set('limit', String(limit));
  params.set('skip', String(skip));

  if (sortBy) {
    params.set('sortBy', sortBy);
  }

  if (order) {
    params.set('order', order);
  }

  const trimmedSearch = search?.trim();
  const endpoint = trimmedSearch ? '/products/search' : '/products';

  if (trimmedSearch) {
    params.set('q', trimmedSearch);
  }

  const res = fetcher<GetProductsResponse>(`${endpoint}?${params.toString()}`);
  return res;
};
