import { useMemo } from 'react';
import { useProductsQuery, type Product } from '@/entities/product';
import { Table, type TableColumn } from '@/shared/ui';
import { useProductsFilterStore } from '../model';
import { ProductsTablePagination } from './products-table-pagination';
import { ProductsTableSearch } from './products-table-search';

const PAGE_LIMIT = 10;

export const ProductsTable = () => {
  const { sortBy, order, currentPage, search, setSort, setPage, setSearch } =
    useProductsFilterStore();

  const productsQuery = useProductsQuery({
    sortBy,
    order,
    currentPage,
    search,
    limit: PAGE_LIMIT,
  });

  const columns = useMemo<TableColumn<Product>[]>(
    () => [
      {
        key: 'thumbnail',
        header: 'Фото',
        render: (value, row) => (
          <img
            src={String(value)}
            alt={row.title}
            className='w-12 h-12 object-cover rounded'
          />
        ),
      },
      { key: 'title', header: 'Название', sortable: true },
      { key: 'brand', header: 'Бренд', sortable: true },
      { key: 'category', header: 'Категория', sortable: true },
      {
        key: 'price',
        header: 'Цена',
        sortable: true,
        render: (value) => `$${Number(value).toFixed(2)}`,
      },
      { key: 'rating', header: 'Рейтинг', sortable: true },
      { key: 'stock', header: 'Остаток', sortable: true },
      { key: 'availabilityStatus', header: 'Статус' },
    ],
    [],
  );

  const total = productsQuery.data?.total ?? 0;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSort(column, order === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSort(column, 'asc');
  };

  const handlePrev = () => {
    if (currentPage <= 1) {
      return;
    }

    setPage(currentPage - 1);
  };

  const handleNext = () => {
    const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));
    if (currentPage >= totalPages) {
      return;
    }

    setPage(currentPage + 1);
  };

  return (
    <div className='w-full max-w-7xl flex flex-col gap-4'>
      <ProductsTableSearch value={search} onChange={setSearch} />

      <Table
        data={productsQuery.data?.products ?? []}
        columns={columns}
        sortBy={sortBy}
        order={order}
        loading={productsQuery.isLoading || productsQuery.isFetching}
        emptyText='Товары не найдены'
        onSort={handleSort}
      />

      <ProductsTablePagination
        currentPage={currentPage}
        total={total}
        limit={PAGE_LIMIT}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
