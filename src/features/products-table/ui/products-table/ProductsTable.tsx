import { type Product } from '@/entities/product';
import { Table, type TableColumn, Pagination } from '@/shared/ui';
import { useFiltersStore, useProductsQuery } from '../../model';
import { APP_CONFIG } from '@/shared/config';
import clsx from 'clsx';

const columns: TableColumn<Product>[] = [
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
    sticky: 0
  },
  { key: 'title', header: 'Название', sortable: true, sticky: 48 },
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
  { key: 'availabilityStatus', header: 'Статус', sortable: true },
];

export const ProductsTable = ({ className }: { className?: string }) => {
  const { sortBy, order, currentPage, search, setSort, setPage } =
    useFiltersStore();

  const productsQuery = useProductsQuery({
    sortBy,
    order,
    currentPage,
    search,
    limit: APP_CONFIG.TABLE_PAGE_LIMIT,
  });

  const total = productsQuery.data?.total ?? 0;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSort(column, order === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSort(column, 'asc');
  };

  return (
    <div className={clsx(className, 'w-full min-w-0 max-w-full flex flex-col gap-4')}>
      <Table
        data={productsQuery.data?.products ?? []}
        columns={columns}
        sortBy={sortBy}
        order={order}
        isLoading={productsQuery.isLoading}
        emptyText='Товары не найдены'
        onSort={handleSort}
      />
      <Pagination
        currentPage={currentPage}
        total={total}
        limit={APP_CONFIG.TABLE_PAGE_LIMIT}
        setPage={setPage}
        className='flex gap-2 justify-end'
      />
    </div>
  );
};
