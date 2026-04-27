import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField, FormFields, Checkbox } from '@/shared/ui';
import { PasswordInput, LoginInput } from '@/features/auth/ui';
import { LoginFormHeader } from './Header';
import { useLogin } from '@/features/auth';
import { LoginFormFooter } from './Footer';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const AUTH_WRONG = 'AUTH_WRONG';

export function LoginForm() {
  const {
    control,
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
          control={control}
          onChange={handleErrors}
          required
          render={(fieldProps) => <LoginInput {...fieldProps} />}
        />
        <FormField
          label='Пароль'
          name='password'
          control={control}
          onChange={handleErrors}
          required
          render={(fieldProps) => <PasswordInput {...fieldProps} />}
        />
        <FormField
          label='Запомнить данные'
          isLabelMuted
          name='remember'
          control={control}
          layout='horizontal'
          color={'primary'}
          render={(fieldProps) => <Checkbox {...fieldProps} />}
        />
      </FormFields>
      <LoginFormFooter isPending={m.isPending} />
    </form>
  );
}
