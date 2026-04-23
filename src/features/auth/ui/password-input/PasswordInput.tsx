import React from 'react';
import { type InputPropsShared, Input } from '@/shared/ui';
import { Icon } from '@/shared/ui';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputPropsShared
>(({ color, placeholder, autoComplete, ...rest }, ref) => {
  const [hide, setHide] = React.useState(true);
  return (
    <Input
      leftIcon={<Icon filename='password' alt='Пароль' />}
      type={hide ? 'password' : 'text'}
      placeholder={placeholder || 'Пароль'}
      color={color}
      ref={ref}
      autoComplete={autoComplete ? autoComplete : 'new-password'}
      {...rest}
      rightIcon={
        <Icon
          filename={hide ? 'eye-off' : 'eye'}
          alt='Пароль'
          className='cursor-pointer'
          onClick={() => setHide((prev) => !prev)}
        />
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
