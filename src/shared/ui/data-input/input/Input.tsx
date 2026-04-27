import React from 'react';
import clsx from 'clsx';
import { type Color } from '@/shared/types/color';
import { CloseIcon } from '@/shared/assets/icons';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'border-primary outline-primary',
  error: 'border-error outline-error',
  neutral: 'border-neutral outline-neutral',
};

type InputProps = {
  type: 'search' | 'text' | 'password' | 'number';
  placeholder?: string;
  color?: Color;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & React.ComponentProps<'input'>
>(
  (
    {
      leftIcon,
      rightIcon,
      color = 'neutral',
      type = 'text',
      placeholder = '',
      className,
      autoComplete,
      ...rest
    },
    ref,
  ) => {
    const colorClass = colorMap[color] || colorMap.neutral;
    return (
      <div className={clsx('input w-full', colorClass)}>
        {leftIcon && (
          <div className='opacity-30 w-(--width-ctrl-icon)'>{leftIcon}</div>
        )}
        <input
          type={type}
          className={clsx('grow', className)}
          placeholder={placeholder}
          ref={ref}
          autoComplete={autoComplete ? autoComplete : 'off'}
          {...rest}
        />
        {rightIcon && (
          <div className='opacity-30 w-(--width-ctrl-icon) cursor-pointer'>
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export type InputPropsShared = Omit<
  React.ComponentProps<'input'>,
  'ref' | 'type'
> &
  Pick<InputProps, 'color'>;

type InputWithClearTextProps = InputPropsShared & {
  ref?: React.ForwardedRef<HTMLInputElement>;
} & {
  Icon?: React.ReactNode;
} & Partial<Pick<InputProps, 'type'>>;

export const InputWithClearText = ({
  color,
  placeholder,
  ref,
  Icon,
  onChange,
  type = 'text',
  ...rest
}: InputWithClearTextProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isShowClear, setIsShowClear] = React.useState(false);

  React.useImperativeHandle(ref, () => inputRef.current!);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange == 'function') {
      onChange(event);
    }
    setIsShowClear(!!event.target.value);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';

      const syntheticEvent = {
        target: inputRef.current,
        currentTarget: inputRef.current,
        type: 'change',
        bubbles: true,
      } as React.ChangeEvent<HTMLInputElement>;

      _onChange(syntheticEvent);
    }
  };

  return (
    <Input
      leftIcon={Icon && Icon}
      type={type}
      placeholder={placeholder || 'Логин'}
      color={color}
      ref={inputRef}
      onChange={_onChange}
      {...rest}
      rightIcon={
        isShowClear && (
          <CloseIcon className='cursor-pointer' onClick={handleClear} />
        )
      }
    />
  );
};

type TextInputProps = InputPropsShared & { type: 'number' | 'text' };

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ color, placeholder, type, ...rest }, ref) => (
    <InputWithClearText
      placeholder={placeholder}
      type={type}
      color={color}
      ref={ref}
      {...rest}
    />
  ),
);

TextInput.displayName = 'TextInput';
