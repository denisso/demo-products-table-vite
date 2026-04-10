import { useEffect, useState } from 'react';
import { SearchInput } from '@/shared/ui';

type ProductsTableSearchProps = {
  value: string;
  onChange: (nextValue: string) => void;
  debounceMs?: number;
};

export const ProductsTableSearch = ({
  value,
  onChange,
  debounceMs = 400,
}: ProductsTableSearchProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [localValue, debounceMs, onChange]);

  return (
    <SearchInput
      value={localValue}
      onChange={(event) => setLocalValue(event.target.value)}
      placeholder='Поиск товара'
      color='neutral'
    />
  );
};
