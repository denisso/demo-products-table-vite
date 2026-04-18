import type { ReactNode } from 'react';
import clsx from 'clsx';
import { TableHeader, TableBody } from './Elements';

export type TableColumn<TItem> = {
  key: keyof TItem;
  header: string;
  sortable?: boolean;
  className?: string;
  sticky?: number;
  render?: (value: TItem[keyof TItem], row: TItem) => ReactNode;
};

type TableProps<TItem extends { id: number | string }> = {
  data: TItem[];
  columns: TableColumn<TItem>[];
  sortBy?: string;
  order?: 'asc' | 'desc';
  isLoading?: boolean;
  emptyText?: string;
  onSort?: (key: string) => void;
} & React.ComponentProps<'table'>;

export const Table = <TItem extends { id: number | string }>({
  data,
  columns,
  sortBy,
  order,
  isLoading = false,
  emptyText = 'Нет данных',
  onSort,
  className,
}: TableProps<TItem>) => {
  return (
    <div className='relative w-full max-w-full overflow-x-auto'>
      <table className={clsx('table min-w-max border-collapse', className)}>
        <TableHeader
          columns={columns}
          sortBy={sortBy}
          order={order}
          onSort={onSort}
        />
        <TableBody
          data={data}
          isLoading={isLoading}
          emptyText={emptyText}
          columns={columns}
        />
      </table>
    </div>
  );
};
