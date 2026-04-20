import React from 'react';

export function Image({
  src,
  alt,
  className = '',
  width,
  height,
  ...rest
}: React.ComponentProps<'img'>) {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={
        (!loaded ? 'skeleton' : '') +
        (' flex justify-center items-center ' + className).trimEnd()
      }
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        loading='lazy'
        onLoad={handleLoad}
        {...rest}
        className={`w-full h-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
