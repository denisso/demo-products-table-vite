import React from 'react';
import { type InputPropsShared, Input } from '@/shared/ui';
import { Icon } from '@/shared/ui';
import { ICON_CONFIG } from '@/shared/config';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputPropsShared
>(({ color, placeholder, autoComplete, ...rest }, ref) => {
  const [hide, setHide] = React.useState(true);
  return (
    <Input
      leftIcon={
        <Icon
          filename='password'
          alt='Пароль'
          width={ICON_CONFIG.ICON_WIDTH_IN_CTRL}
          height={'auto'}
          className='opacity-30'
        />
      }
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
          width={ICON_CONFIG.ICON_WIDTH_IN_CTRL}
          height={'auto'}
          className='cursor-pointer opacity-30'
          onClick={() => setHide((prev) => !prev)}
        />
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
