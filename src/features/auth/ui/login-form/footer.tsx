import { LoadingButton, Link } from '@/shared/ui';


export const LoginFormFooter = ({isPending}:{isPending: boolean}) => {
  return (
    <div className='flex flex-col gap-4'>
      <LoadingButton
        loading={isPending}
        type='submit'
        color='primary'
        className='mt-6'
        disabled={isPending}
      >
        {isPending ? 'Вход....' : 'Войти'}
      </LoadingButton>
      <div className='flex items-center'>
        <div className='grow h-px border-b border-neutral' />
        <span className='text-muted px-4'>или</span>
        <div className='grow h-px border-b border-neutral' />
      </div>
      <div className='text-center'>
        <span className='text-muted'>Нет аккаунта?</span>
        <Link color='primary' className='ml-2 font-medium'>
          Создать
        </Link>
      </div>
    </div>
  );
};
