import { ICON_PATH } from '@/shared/config';
import { Image } from '@/shared/ui/display/image';
type ProxyImageProps = Omit<
  React.ComponentProps<'img'>,
  'src' | 'alt' | 'height' | 'width'
> & {
  filename?: keyof typeof ICON_PATH;
  src?: string;
  alt?: string;
  height: string | 'auto';
  width: string | 'auto';
};

export const Icon = ({
  filename,
  src,
  alt,
  width,
  height,
  ...rest
}: ProxyImageProps) => {
  const _src = src ? src : filename ? ICON_PATH[filename] : '';

  return (
    <Image src={_src} alt={alt ?? ''} width={width} height={height} {...rest} />
  );
};
