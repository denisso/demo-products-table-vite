import { type Color } from '../../../types/color';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import './link.css';

// классы которые будут сгенерированы
const colorMap: Record<Color, string> = {
  primary: 'link-primary',
  error: 'link-error',
  neutral: 'link-neutral',
};

type Props = {
  color?: Color;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const Link = ({ children, color, className, href, onClick }: Props) => {
  const _to = href ? href : '#';
  const _onClick =
    !onClick && !href ? (e: React.MouseEvent) => e.preventDefault() : onClick;
  const colorClass = color ? colorMap[color] : colorMap['neutral'];
  return (
    <RouterLink
      className={clsx('link', colorClass, className)}
      to={_to}
      onClick={_onClick}
    >
      {children}
    </RouterLink>
  );
};
