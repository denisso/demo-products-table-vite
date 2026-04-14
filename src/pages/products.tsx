import { ProductsTable } from '@/features/products-table';
import { Container } from '@/shared/ui';
import { ProductsTableSearch } from '@/features/products-table';
import { LogoutButton } from '@/features/auth';

export const ProductsPage = () => {
  return (
    <div className='min-h-screen flex flex-col gap-4 w-full items-center'>
      <div className='sticky top-0 z-10  w-full bg-white/20 backdrop-blur-md'>
        <Container>
          <header className='grid grid-cols-[1fr_minmax(auto,60rem)_1fr] gap-2'>
            <div className='grow'></div>
            <ProductsTableSearch className='max-w-7xl' />
            <div className='grow flex justify-end'>
              <LogoutButton />
            </div>
          </header>
        </Container>
      </div>

      <Container className='h-full flex justify-between items-center'>
        <ProductsTable className='w-240' />
      </Container>
    </div>
  );
};
