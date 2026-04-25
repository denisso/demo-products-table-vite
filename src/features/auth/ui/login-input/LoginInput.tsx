import React from 'react';
import { InputWithClearText, type InputPropsShared } from '@/shared/ui';

export const LoginInput = React.forwardRef<HTMLInputElement, InputPropsShared>(
  ({ color, placeholder, ...rest }, ref) => {
    return (
      <InputWithClearText
        ref={ref}
        icon={'login'}
        placeholder={placeholder ? placeholder : 'Логин'}
        color={color}
        {...rest}
      />
    );
  },
);

LoginInput.displayName = 'LoginInput';
