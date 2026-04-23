import { ICON_PATH } from '@/shared/config';
import { Image } from '@/shared/ui/display/image';

type IconProps = Omit<
  React.ComponentProps<'img'>,
  'src' | 'alt' | 'height' | 'width'
> & {
  filename?: keyof typeof ICON_PATH;
  src?: string;
  alt?: string;
};

export const Icon = ({ filename, src, alt, ...rest }: IconProps) => {
  const _src = src ? src : filename ? ICON_PATH[filename] : '';

  return <Image src={_src} alt={alt ?? ''} {...rest} />;
};
