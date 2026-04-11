import { SearchInput } from '@/shared/ui';
import { useProductsFilterStore } from '@/features/products-table/model';

export const ProductsTableSearch = ({ className }: { className: string }) => {
  const { setSearch } = useProductsFilterStore();
  return (
    <SearchInput
      className={className}
      onChange={(event) => setSearch(event.target.value)}
      placeholder='Поиск товара'
      color='neutral'
    />
  );
};
