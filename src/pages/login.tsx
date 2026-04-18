import { LoginForm } from '@/features/auth';
import { Container } from '@/shared/ui';

export const LoginPage = () => {
  return (
    <Container className='w-92 md:w-120'>
      <LoginForm />
    </Container>
  );
};
