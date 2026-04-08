import React from 'react';
import clsx from 'clsx';
import { type Color } from '../../../types/color';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'checked-primary checked:bg-primary',
  error: 'checked-error checked:bg-error',
  neutral: 'checked-neutral checked:bg-neutral',
};

type Props = {
  color?: Color;
} & React.ComponentProps<'input'>;

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  Props & React.ComponentProps<'input'>
>(({ className, color, ...rest }, ref) => {
  const colorClass = color ? colorMap[color] : colorMap['neutral'];

  return (
    <input
      type='checkbox'
      className={clsx(
        'checkbox [&::before]:hidden bg-transparent',
        colorClass,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

Checkbox.displayName = 'Checkbox';
