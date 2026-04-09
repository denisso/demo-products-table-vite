import { LoginForm } from '@/features/auth';
import { Container } from '@/shared/ui';

export const LoginPage = () => {
  return (
    <Container className='w-120'>
      <LoginForm />
    </Container>
  );
};
