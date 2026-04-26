import clsx from 'clsx';

export const Container = ({
  children,
  className,
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className='
      p-0 sm:p-1.5 
      rounded-none sm:rounded-[40px] 
      bg-none sm:bg-linear-to-b sm:from-[rgba(35,35,35,0.03)] sm:to-transparent 
      shadow-none sm:shadow-[0px_24px_32px_rgba(0,0,0,0.04)]
    '
    >
      <div
        className='
        bg-none sm:bg-[linear-gradient(180deg,rgba(35,35,35,0.03)_0%,rgba(35,35,35,0)_50%)] 
        rounded-none sm:rounded-[34px] 
        p-6 sm:p-12
      '
      >
        <div className={clsx('flex flex-col', className)}>{children}</div>
      </div>
    </div>
  );
};
