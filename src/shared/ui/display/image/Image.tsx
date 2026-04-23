import React from 'react';

export function Image({ src, alt, ...rest }: React.ComponentProps<'img'>) {
  const [loaded, setLoaded] = React.useState<'initial' | 'loaded'>('initial');

  const handleLoad = () => {
    setLoaded('loaded');
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading='lazy'
        onLoad={handleLoad}
        {...rest}
        className={` object-contain transition-opacity duration-300 ${loaded == 'loaded' ? 'opacity-100 w-full h-full' : 'opacity-0 w-0 h-0'}`}
      />
      {loaded == 'initial' ? (
        <div className='skeleton animate-pulse flex justify-center items-center h-full w-full' />
      ) : (
        <></>
      )}
    </>
  );
}
