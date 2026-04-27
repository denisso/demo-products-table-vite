import { ToastsContainer } from '../shared/ui/feedback';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient/client';
import { TokenProvider } from '../features/auth';

export function App() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center base-300'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastsContainer />
        <TokenProvider />
      </QueryClientProvider>
    </div>
  );
}
