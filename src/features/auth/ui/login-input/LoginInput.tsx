import React from 'react';
import { InputWithClearText, type InputPropsShared } from '@/shared/ui';
import { LoginIcon } from '@/shared/assets/icons';
export const LoginInput = React.forwardRef<HTMLInputElement, InputPropsShared>(
  ({ color, placeholder, ...rest }, ref) => {
    return (
      <InputWithClearText
        ref={ref}
        Icon={<LoginIcon />}
        placeholder={placeholder ? placeholder : 'Логин'}
        color={color}
        {...rest}
      />
    );
  },
);

LoginInput.displayName = 'LoginInput';
