import { fetcher } from '@/shared/api/fetcher';

export type AddProductRequest = {
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
};

export type AddProductResponse = AddProductRequest & {
  id: number;
};

export const addProduct = async (
  payload: AddProductRequest,
): Promise<AddProductResponse> => {
  return fetcher<AddProductResponse>('/products/add', {
    method: 'POST',
    body: payload,
  });
};
