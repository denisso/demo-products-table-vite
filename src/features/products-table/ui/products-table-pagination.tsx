import { Button } from '@/shared/ui';

type ProductsTablePaginationProps = {
  currentPage: number;
  total: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
};

export const ProductsTablePagination = ({
  currentPage,
  total,
  limit,
  onPrev,
  onNext,
}: ProductsTablePaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='text-sm text-muted'>
        Страница {currentPage} из {totalPages}
      </div>
      <div className='flex gap-2'>
        <Button
          type='button'
          onClick={onPrev}
          disabled={!canGoPrev}
          className='btn-sm w-auto'
        >
          Назад
        </Button>
        <Button
          type='button'
          onClick={onNext}
          disabled={!canGoNext}
          className='btn-sm w-auto'
        >
          Вперёд
        </Button>
      </div>
    </div>
  );
};
