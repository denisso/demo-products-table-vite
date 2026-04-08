import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/data-input';

export const ProductsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Products</div>
      <div>
        <Button onClick={() => navigate('/login')} color='primary'>
          Goto login
        </Button>
      </div>
    </div>
  );
};
