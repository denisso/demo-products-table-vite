import { create } from 'zustand';
import { debounce } from '@/shared/lib/debounce';

interface FiltersStore {
  sortBy: string;
  order: 'asc' | 'desc';
  currentPage: number;
  search: string;
  setSort: (sortBy: string, order: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  setSearch: (q: string) => void;
}

export const useFiltersStore = create<FiltersStore>()((_set) => {
  const set = debounce((state: Partial<FiltersStore>) => _set(state));
  return {
    sortBy: 'title',
    order: 'asc',
    currentPage: 1,
    search: '',
    setSort: (sortBy, order) => {
      set({ sortBy, order, currentPage: 1 });
    },
    setPage: (page) => {
      set({ currentPage: page });
    },
    setSearch: (q) => {
      set({ search: q, currentPage: 1 });
    },
  };
});

export const productsFilterApi = {
  setSort: (sortBy: string, order: 'asc' | 'desc') => {
    useFiltersStore.getState().setSort(sortBy, order);
  },

  setPage: (page: number) => {
    useFiltersStore.getState().setPage(page);
  },
  setSearch: (q: string) => {
    useFiltersStore.getState().setSearch(q);
  },
};
