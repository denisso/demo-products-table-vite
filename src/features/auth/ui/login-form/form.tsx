import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormField,
  FormFields,
  PasswordInput,
  LoginInput,
  Checkbox,
} from '@/shared/ui';
import { toastApi } from '@/shared/lib/toast';
import { LoginFormHeader } from './header';
import { useLogin } from '@/features/auth';
import { LoginFormFooter } from './footer';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const AUTH_WRONG = 'AUTH_WRONG';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>();

  const m = useLogin();

  React.useEffect(() => {
    if (!m.error) {
      return;
    }
    if (m.error.status == 400) {
      setError('username', { message: 'Неверный логин' });
      setError('password', { message: 'Неверный пароль' });
      setError('root', { message: AUTH_WRONG });
      return;
    }
    toastApi.addToast({
      message: 'Сетевая ошибка. Попробуйте позже.',
      color: 'error',
    });
  }, [m.error, setError]);

  const handleErrors = () => {
    if (errors.root?.message == AUTH_WRONG) {
      clearErrors();
    }
  };

  return (
    <form onSubmit={handleSubmit(m.mutate as (data: LoginFormData) => void)}>
      <LoginFormHeader />
      <FormFields>
        <FormField
          label='Логин'
          name='username'
          register={register}
          onChange={handleErrors}
          error={errors.username}
          required
          render={(fieldProps) => <LoginInput {...fieldProps} />}
        />
        <FormField
          label='Пароль'
          name='password'
          register={register}
          onChange={handleErrors}
          error={errors.password}
          required
          render={(fieldProps) => <PasswordInput {...fieldProps} />}
        />
        <FormField
          label='Запомнить данные'
          isLabelMuted
          name='remember'
          register={register}
          error={errors.remember}
          layout='horizontal'
          color={'primary'}
          render={(fieldProps) => <Checkbox {...fieldProps} />}
        />
      </FormFields>
      <LoginFormFooter isPending={m.isPending} />
    </form>
  );
}
