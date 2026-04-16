import { useFiltersStore } from '@/features/products-table/model';
import { InputWithClearText, type InputPropsShared } from '@/shared/ui';

export const SearchInput = ({ className, ...rest }: InputPropsShared) => {
  const { setSearch } = useFiltersStore();
  return (
    <InputWithClearText
      onChange={(event) => setSearch(event.target.value)}
      className={className}
      icon={'search'}
      iconText='Поиск'
      placeholder='Поиск товара'
      color='neutral'
      {...rest}
    />
  );
};
