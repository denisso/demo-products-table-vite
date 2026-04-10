import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { ProductsTable } from '@/features/products-table';

export const ProductsPage = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full min-h-screen p-6 flex flex-col gap-6'>
      <div className='w-full max-w-7xl flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <div className='w-40'>
          <Button onClick={() => navigate('/login')} color='primary'>
            Goto login
          </Button>
        </div>
      </div>
      <ProductsTable />
    </div>
  );
};
