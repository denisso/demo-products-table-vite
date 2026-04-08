import { ToastsContainer } from '../shared/ui/feedback';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TokenProvider } from './token';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center base-100'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastsContainer />
        <TokenProvider />
      </QueryClientProvider>
    </div>
  );
}
