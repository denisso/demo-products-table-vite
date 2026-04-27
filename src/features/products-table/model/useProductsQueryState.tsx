import { create } from 'zustand';
import { debounce } from '@/shared/lib/debounce';
import { queryClient } from '@/shared/lib/queryClient';

type QueryState = {
  sortBy: string;
  order: 'asc' | 'desc';
  currentPage: number;
  search: string;
};

export const useProductsQueryState = create<QueryState>()(() => ({
  sortBy: 'title',
  order: 'asc',
  currentPage: 1,
  search: '',
}));

const setState = useProductsQueryState.setState;
const runCb = debounce((cb: () => void) => cb());

export const productsQueryStateApi = {
  setSort: (sortBy: string, order: 'asc' | 'desc') => {
    runCb(() => setState({ sortBy, order, currentPage: 1 }));
  },
  setPage: (currentPage: number) => {
    runCb(() => setState({ currentPage }));
  },
  setSearch: (search: string) => {
    runCb(() => setState({ search, currentPage: 1 }));
  },
  refresh: () => {
    runCb(() => {
      queryClient.invalidateQueries({ queryKey: ['products-table'] });
      setState({ currentPage: 1 });
    });
  },
};
