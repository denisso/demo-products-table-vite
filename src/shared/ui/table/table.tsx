import type { ReactNode } from 'react';
import clsx from 'clsx';

export type TableColumn<TItem> = {
  key: keyof TItem;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (value: TItem[keyof TItem], row: TItem) => ReactNode;
};

type TableProps<TItem extends { id: number | string }> = {
  data: TItem[];
  columns: TableColumn<TItem>[];
  sortBy?: string;
  order?: 'asc' | 'desc';
  loading?: boolean;
  emptyText?: string;
  onSort?: (key: string) => void;
};

export const Table = <TItem extends { id: number | string }>({
  data,
  columns,
  sortBy,
  order,
  loading = false,
  emptyText = 'Нет данных',
  onSort,
}: TableProps<TItem>) => {
  return (
    <div className='overflow-x-auto rounded-box border border-base-300 bg-base-100'>
      <table className='table table-zebra w-full'>
        <thead>
          <tr>
            {columns.map((column) => {
              const columnKey = String(column.key);
              const isActiveSort = sortBy === columnKey;

              return (
                <th key={columnKey} className={column.className}>
                  {column.sortable ? (
                    <button
                      type='button'
                      className='inline-flex items-center gap-1 font-semibold cursor-pointer'
                      onClick={() => onSort?.(columnKey)}
                    >
                      {column.header}
                      <span className='text-xs'>
                        {isActiveSort ? (order === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className='flex justify-center py-8'>
                  <span className='loading loading-spinner loading-md' />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='text-center text-muted py-8'>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={String(item.id)}>
                {columns.map((column) => {
                  const cellValue = item[column.key];

                  return (
                    <td
                      key={`${String(item.id)}-${String(column.key)}`}
                      className={clsx(column.className)}
                    >
                      {column.render ? column.render(cellValue, item) : String(cellValue)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
