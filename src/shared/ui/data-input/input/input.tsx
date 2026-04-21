import React from 'react';
import clsx from 'clsx';
import { type Color } from '@/shared/types/color';
import { Icon } from '../../display';
import { ICON_PATH, ICON_CONFIG } from '@/shared/config';

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
        <div className='w-6'>{leftIcon}</div>
        <input
          type={type}
          className={clsx('grow', className)}
          placeholder={placeholder}
          ref={ref}
          autoComplete={autoComplete ? autoComplete : 'off'}
          {...rest}
        />
        {rightIcon}
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
  icon?: keyof typeof ICON_PATH;
  iconText?: string;
} & Partial<Pick<InputProps, 'type'>>;

export const InputWithClearText = ({
  color,
  placeholder,
  ref,
  icon,
  iconText,
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
      leftIcon={
        icon && (
          <Icon
            filename={icon}
            alt={iconText}
            width={ICON_CONFIG.ICON_WIDTH_IN_CTRL}
            height={'auto'}
            className='opacity-30'
          />
        )
      }
      type={type}
      placeholder={placeholder || 'Логин'}
      color={color}
      ref={inputRef}
      onChange={_onChange}
      {...rest}
      rightIcon={
        isShowClear && (
          <Icon
            filename='close'
            alt='Очистка текста'
            width={ICON_CONFIG.ICON_WIDTH_IN_CTRL}
            height={'auto'}
            className='cursor-pointer opacity-30'
            onClick={handleClear}
          />
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
