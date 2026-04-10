import { fetcher } from '@/shared/api/fetcher';
import type { ProductsResponse } from '../model';

const BASE_URL = 'https://dummyjson.com';
const DEFAULT_LIMIT = 10;

export type GetProductsParams = {
  sortBy?: string;
  order?: 'asc' | 'desc';
  currentPage?: number;
  search?: string;
  limit?: number;
};

export const getProducts = async ({
  sortBy,
  order,
  currentPage = 1,
  search,
  limit = DEFAULT_LIMIT,
}: GetProductsParams): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  const skip = (currentPage - 1) * limit;

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

  return fetcher<ProductsResponse>(`${BASE_URL}${endpoint}?${params.toString()}`);
};
