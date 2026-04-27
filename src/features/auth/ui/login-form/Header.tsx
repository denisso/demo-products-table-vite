import { LogoIcon } from '@/shared/assets/icons';

export const LoginFormHeader = () => {
  return (
    <div className='flex flex-col mb-6 gap-6 items-center'>
      <div className='w-13 h-13 [&>svg]:h-full [&>svg]:w-full'>
        <LogoIcon />
      </div>
      <div className='flex flex-col items-center'>
        <div className='text-[2.5rem] font-medium'>Добро пожаловать!</div>
        <div className='text-[1.125rem] text-muted'>
          Пожалуйста авторизируйтесь
        </div>
      </div>
    </div>
  );
};
