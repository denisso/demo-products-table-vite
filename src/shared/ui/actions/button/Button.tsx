import clsx from 'clsx';
import { type Color } from '../../../types/color';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'btn-primary',
  error: 'btn-error',
  neutral: 'btn-neutral',
};

type Props = {
  color?: Color;
  icon?: React.ReactNode;
} & React.ComponentProps<'button'>;

export const Button = ({
  children,
  onClick,
  color,
  className,
  icon,
  ...rest
}: Props) => {
  const colorClass = color ? colorMap[color] : colorMap['neutral'];
  return (
    <button
      onClick={onClick}
      className={clsx('btn', colorClass, className)}
      {...rest}
    >
      <div className='flex gap-2 items-center'>
        {icon && (
          <div className='w-(--width-ctrl-icon) h-(--width-ctrl-icon) [&>svg]:w-full [&>svg]:h-full'>
            {icon}
          </div>
        )}
        <div>{children}</div>
      </div>
    </button>
  );
};

type LoadingButtonType = { loading?: boolean } & Props;

export const LoadingButton = ({
  loading,
  children,
  ...rest
}: LoadingButtonType) => {
  return (
    <Button
      {...rest}
      icon={
        loading && (
          <div
            className={`loading loading-spinner text-neutral 
              h-(--width-ctrl-icon) 
              w-(--width-ctrl-icon)`}
          />
        )
      }
    >
      {children}
    </Button>
  );
};
