import { ICONS_CONFIG } from '@/shared/config';

type ProxyImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'height' | 'width'
> & {
  filename?: keyof typeof ICONS_CONFIG;
  src?: string;
  alt?: string;
  height: number | 'auto';
  width: number | 'auto';
};

export const Icon = ({
  filename,
  src,
  alt,
  width,
  height,
  ...rest
}: ProxyImageProps) => {
  const _src = src ? src : filename ? ICONS_CONFIG[filename] : '';

  if (width === 'auto' || height === 'auto') {
    return (
      <img src={_src} alt={alt ?? ''} style={{ width, height }} {...rest} />
    );
  }

  return (
    <img src={_src} alt={alt ?? ''} width={width} height={height} {...rest} />
  );
};
