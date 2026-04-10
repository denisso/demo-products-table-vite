import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts, type GetProductsParams } from './get-products';

export const useProductsQuery = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
};
