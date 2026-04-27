import {
  useProductsQuery,
  useProductsQueryState,
  productsQueryStateApi,
} from '@/features/products-table/model';
import { Button } from '@/shared/ui';
import { RefreshIcon } from '@/shared/assets/icons';

export const RefreshButton = () => {
  const filter = useProductsQueryState();
  useProductsQuery(filter);
  return (
    <Button
      icon={<RefreshIcon />}
      onClick={() => {
        productsQueryStateApi.refresh();
      }}
    >
      Обновить данные
    </Button>
  );
};
