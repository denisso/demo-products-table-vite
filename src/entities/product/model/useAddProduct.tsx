import { useMutation } from '@tanstack/react-query';
import type { FetchError } from '@/shared/api';
import {
  addProduct,
  type AddProductRequest,
  type AddProductResponse,
} from '@/entities/product/api';
import { toastApi } from '@/shared/lib/toast';

export const useAddProduct = () => {
  const mutation = useMutation<
    AddProductResponse,
    FetchError,
    AddProductRequest
  >({
    mutationFn: addProduct,
    scope: {
      id: 'add-product-scope',
    },
    onSuccess: (response) => {
      toastApi.addToast({
        message: `Товар "${response.title}" добавлен`,
        color: 'success',
      });
    },
    onError: (error) => {
      const status = error.status;
      toastApi.addToast({
        message:
          typeof status === 'number'
            ? `Ошибка добавления товара (HTTP ${status})`
            : 'Сетевая ошибка. Попробуйте позже.',
        color: 'error',
      });
    },
  });
  return mutation;
};
