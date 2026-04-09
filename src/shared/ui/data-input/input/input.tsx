import React from 'react';
import clsx from 'clsx';
import { type Color } from '@/shared/types/color';
import { Icon } from '../../display';
import { ICONS_CONFIG } from '@/shared/config';

const DEFAULT_WIDTH = 24;

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'border-primary outline-primary',
  error: 'border-error outline-error',
  neutral: 'border-neutral outline-neutral',
};

type Props = {
  type: 'search' | 'text' | 'password';
  placeholder?: string;
  color?: Color;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Input = React.forwardRef<
  HTMLInputElement,
  Props & React.ComponentProps<'input'>
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

type InputPropsShared = Omit<React.ComponentProps<'input'>, 'ref' | 'type'>;

const InputWithClearText = ({
  color,
  placeholder,
  ref,
  icon,
  iconText,
  ...rest
}: Pick<Props, 'color'> &
  InputPropsShared & { ref: React.ForwardedRef<HTMLInputElement> } & {
    icon: keyof typeof ICONS_CONFIG;
    iconText: string;
  }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
  return (
    <Input
      leftIcon={
        <Icon
          filename={icon}
          alt={iconText}
          width={DEFAULT_WIDTH}
          height={'auto'}
          className='opacity-30'
        />
      }
      type='text'
      placeholder={placeholder || 'Логин'}
      color={color}
      ref={inputRef}
      {...rest}
      rightIcon={
        <Icon
          filename='close'
          alt='Очистка текста'
          width={DEFAULT_WIDTH}
          height={'auto'}
          className='cursor-pointer opacity-30'
          onClick={handleClear}
        />
      }
    />
  );
};

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  Pick<Props, 'color'> & InputPropsShared
>(({ color, placeholder, ...rest }, ref) => {
  return (
    <InputWithClearText
      ref={ref}
      icon={'search'}
      iconText='Поиск'
      placeholder={placeholder ? placeholder : 'Поиск'}
      color={color}
      {...rest}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export const LoginInput = React.forwardRef<
  HTMLInputElement,
  Pick<Props, 'color'> & InputPropsShared
>(({ color, placeholder, ...rest }, ref) => {
  return (
    <InputWithClearText
      ref={ref}
      icon={'login'}
      iconText='Логин'
      placeholder={placeholder ? placeholder : 'Логин'}
      color={color}
      {...rest}
    />
  );
});

LoginInput.displayName = 'LoginInput';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Pick<Props, 'color'> & InputPropsShared
>(({ color, placeholder, autoComplete, ...rest }, ref) => {
  const [hide, setHide] = React.useState(true);
  return (
    <Input
      leftIcon={
        <Icon
          filename='password'
          alt='Пароль'
          width={DEFAULT_WIDTH}
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
          width={DEFAULT_WIDTH}
          height={'auto'}
          className='cursor-pointer opacity-30'
          onClick={() => setHide((prev) => !prev)}
        />
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export const TextInput = React.forwardRef<
  HTMLInputElement,
  Pick<Props, 'color' | 'placeholder'> & InputPropsShared
>(({ color, placeholder, ...rest }, ref) => (
  <Input
    placeholder={placeholder}
    type='text'
    color={color}
    ref={ref}
    {...rest}
  />
));

TextInput.displayName = 'TextInput';
