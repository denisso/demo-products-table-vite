import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getProducts,
  type GetProductsRequestParams,
} from '@/entities/product/api';

export const useProductsQuery = (params: GetProductsRequestParams) => {
  return useQuery({
    queryKey: ['products-table', params],
    queryFn: () =>
      getProducts({
        ...params,
        select: [
          'thumbnail',
          'title',
          'brand',
          'category',
          'price',
          'rating',
          'stock',
          'availabilityStatus',
        ],
      }),
    placeholderData: keepPreviousData,
  });
};
