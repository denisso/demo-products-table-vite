import clsx from 'clsx';
import { type Color } from '../../../types/color';
import { ICON_CONFIG } from '@/shared/config';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'btn-primary',
  error: 'btn-error',
  neutral: 'btn-neutral',
};

type Props = {
  color?: Color;
} & React.ComponentProps<'button'>;

export const Button = ({
  children,
  onClick,
  color,
  className,
  ...rest
}: Props) => {
  const colorClass = color ? colorMap[color] : colorMap['neutral'];
  return (
    <button
      onClick={onClick}
      className={clsx('btn w-full', colorClass, className)}
      {...rest}
    >
      {children}
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
    <Button {...rest}>
      {loading && (
        <span className={`loading loading-spinner text-neutral w[${ICON_CONFIG.ICON_WIDTH_IN_CTRL}]`}></span>
      )}
      {children}
    </Button>
  );
};
