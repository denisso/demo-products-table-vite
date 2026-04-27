import {
  useProductsQueryState,
  productsQueryStateApi,
} from '@/features/products-table/model';
import { InputWithClearText, type InputPropsShared } from '@/shared/ui';
import { SearchIcon } from '@/shared/assets/icons';

export const SearchInput = ({ className, ...rest }: InputPropsShared) => {
  const filter = useProductsQueryState();
  return (
    <InputWithClearText
      onChange={(event) => productsQueryStateApi.setSearch(event.target.value)}
      className={className}
      Icon={<SearchIcon />}
      placeholder='Поиск товара'
      color='neutral'
      value={filter.search}
      {...rest}
    />
  );
};
