import React from 'react';
import { Button } from '@/shared/ui';
import { useProductsFilterStore } from '@/features/products-table/model';
import { APP_CONFIG } from '@/shared/config';

type ProductsTablePaginationProps = {
  currentPage: number;
  total: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
};

type State = {
  current: number;
  total: number;
  left: number[];
  mid: number[];
  right: number[];
};

const Buttons = ({
  buttons,
  current,
}: {
  buttons: number[];
  current: number;
}) => {
  const { setPage } = useProductsFilterStore();
  return (
    <>
      {buttons.map((num) => (
        <Button
          type='button'
          key={num}
          color={num == current ? 'primary' : 'neutral'}
          onClick={() => setPage(num)}
        >
          {num}
        </Button>
      ))}
    </>
  );
};

type Action =
  | { type: 'setTotal'; payload: number }
  | { type: 'setCurrent'; payload: number };



const reducer = (state: State, action: Action): State => {
  const bpc = APP_CONFIG.BUTTONS_PAGINATION_COUNT
  let { current, total } = state;
  let left: number[] = [];
  let mid: number[] = [];
  let right: number[] = [];
  if (action.type == 'setCurrent') {
    current = action.payload;
  }
  if (action.type == 'setTotal') {
    total = action.payload;
  }

  if (total < current) {
    current = total;
  }
  if (current < 1) {
    current = 1;
  }
  if (bpc >= total) {
    left = Array.from({ length: total }, (_, i) => i + 1);
  } else if (current - bpc + 1 <= 0) {
    left = Array.from({ length: bpc }, (_, i) => i + 1);
    right = [total];
  } else if (current + bpc - 1 > total) {
    left = [1];
    right = Array.from(
      { length: bpc },
      (_, i) => total - bpc + i + 1,
    );
  } else {
    left = [1];
    mid = Array.from(
      { length: bpc },
      (_, i) => current - Math.floor(bpc / 2) + i,
    );
    right = [total];
  }

  return { current, total, left, mid, right };
};

const initialState: State = {
  current: 1,
  total: 1,
  left: [1],
  mid: [],
  right: [],
};

export const ProductsTablePagination = ({
  currentPage,
  total,
  limit,
}: ProductsTablePaginationProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(total / limit));
    dispatch({ type: 'setCurrent', payload: currentPage });
    dispatch({ type: 'setTotal', payload: totalPages });
  }, [currentPage, total, limit, dispatch]);
  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex gap-2 justify-end w-full'>
        <Buttons buttons={state.left} current={state.current} />{' '}
        {state.mid.length ? '...' : ''}{' '}
        <Buttons buttons={state.mid} current={state.current} />{' '}
        {state.right.length ? '...' : ''}{' '}
        <Buttons buttons={state.right} current={state.current} />
      </div>
    </div>
  );
};
