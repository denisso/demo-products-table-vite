import { create } from 'zustand';

interface ProductState {
  sortBy: string;
  order: 'asc' | 'desc';
  currentPage: number;
  search: string;
  setSort: (sortBy: string, order: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  setSearch: (q: string) => void;
  resetFilters: () => void;
}

export const useProductsFilterStore = create<ProductState>()((set) => ({
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
  resetFilters: () => {
    set({ sortBy: 'title', order: 'asc', currentPage: 1, search: '' });
  },
}));

export const productsFilterApi = {
  setSort: (sortBy: string, order: 'asc' | 'desc') => {
    useProductsFilterStore.getState().setSort(sortBy, order);
  },

  setPage: (page: number) => {
    useProductsFilterStore.getState().setPage(page);
  },
  setSearch: (q: string) => {
    useProductsFilterStore.getState().setSearch(q);
  },
  resetFilters: () => {
    useProductsFilterStore.getState().resetFilters();
  },
};
