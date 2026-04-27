import React from 'react';
import { type InputPropsShared, Input } from '@/shared/ui';
import { EyeOffIcon, EyeIcon, PasswordIcon } from '@/shared/assets/icons';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputPropsShared
>(({ color, placeholder, autoComplete, ...rest }, ref) => {
  const [hide, setHide] = React.useState(true);
  return (
    <Input
      leftIcon={<PasswordIcon />}
      type={hide ? 'password' : 'text'}
      placeholder={placeholder || 'Пароль'}
      color={color}
      ref={ref}
      autoComplete={autoComplete ? autoComplete : 'new-password'}
      {...rest}
      rightIcon={
        hide ? (
          <EyeOffIcon
            className='cursor-pointer'
            onClick={() => setHide((prev) => !prev)}
          />
        ) : (
          <EyeIcon
            className='cursor-pointer'
            onClick={() => setHide((prev) => !prev)}
          />
        )
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
