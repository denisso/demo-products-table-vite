import { ProductsTable, SearchInput } from '@/features/products-table';
import { Container } from '@/shared/ui';
import { LogoutButton } from '@/features/auth';
import { AddProductButton } from '@/entities/product';

export const ProductsPage = () => {
  return (
    <div className='min-h-screen flex flex-col gap-4 w-full max-w-full min-w-0 items-stretch'>
      <div className='sticky top-0 z-10  w-full bg-white/20 backdrop-blur-md'>
        <Container>
          <header className='grid grid-cols-[1fr_minmax(auto,60rem)_1fr] gap-2'>
            <div className='grow'></div>
            <SearchInput className='max-w-7xl' />
            <div className='grow flex justify-end gap-2'>
              <LogoutButton />
            </div>
          </header>
        </Container>
      </div>

      <Container className='h-full w-full min-w-0 flex justify-between items-stretch'>
        <AddProductButton />
        <ProductsTable />
      </Container>
    </div>
  );
};
