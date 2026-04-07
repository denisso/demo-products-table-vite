import { ToastsContainer } from './shared/ui/feedback';
import { Button } from '@/shared/ui/data-input';
import { addToast } from '@/shared/lib/toast';

function App() {
  return (
    <div className='min-h-full flex flex-col justify-center items-center base-100'>
      <div>
        <Button
          color='primary'
          onClick={() =>
            addToast({ message: new Date().toISOString(), color: 'info' })
          }
        >
          Add toast
        </Button>
      </div>
      <ToastsContainer />
    </div>
  );
}

export default App;
