import { ProductsTable } from '@/features/products-table';
import { Container } from '@/shared/ui';
import { ProductsTableSearch } from '@/features/products-table';
import { LogoutButton } from '@/features/auth';

export const ProductsPage = () => {
  return (
    <div className='min-h-screen flex flex-col gap-4 w-full items-center'>
      <div className='sticky top-0 z-10  w-full'>
        <Container>
          <header className='flex'>
            <div className='flex-1'></div>
            <ProductsTableSearch className='w-7xl' />
            <div className='flex-1 flex justify-end'>
              <LogoutButton />
            </div>
          </header>
        </Container>
      </div>

      <Container className='h-full flex justify-between items-center'>
        <ProductsTable className='w-7xl' />
      </Container>
    </div>
  );
};
