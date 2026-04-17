import * as React from 'react';
import type { TableColumn } from './Table';
import clsx from 'clsx';

type TableHeaderProps<TItem> = {
  columns: TableColumn<TItem>[];
  sortBy?: string;
  order?: 'asc' | 'desc';
  onSort?: (key: string) => void;
} & React.ComponentProps<'thead'>;

function TableHeader<TItem extends { id: number | string }>({
  className,
  columns,
  sortBy,
  order,
  onSort,
  ...props
}: TableHeaderProps<TItem>) {
  return (
    <thead className={className} {...props}>
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
  );
}

type TableBodyProps<TItem> = {
  columns: TableColumn<TItem>[];
  data: TItem[];
  isLoading?: boolean;
  emptyText?: string;
} & React.ComponentProps<'tbody'>;

function TableBody<TItem extends { id: number | string }>({
  data,
  isLoading, 
  emptyText,
  columns,
  className,
  ...props
}: TableBodyProps<TItem>) {
  return (
    <tbody className={clsx('[&_tr:last-child]:border-0', className)} {...props}>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <div className='flex justify-center py-8'>
              <span className='loading loading-spinner loading-md' />
            </div>
          </TableCell>
        </TableRow>
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
              const cellValue = (
                item[column.key] === undefined ? '' : item[column.key]
              ) as TItem[keyof TItem];

              return (
                <td
                  key={`${String(item.id)}-${String(column.key)}`}
                  className={clsx(column.className)}
                >
                  {column.render
                    ? column.render(cellValue, item)
                    : String(cellValue)}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      className={clsx('border-t [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr className={clsx('border-b', className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th className={className} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      className={clsx('p-1.5 md:p-2 align-middle whitespace-nowrap', className)}
      {...props}
    />
  );
}

export { TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell };
