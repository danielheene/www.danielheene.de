import type { ButtonHTMLAttributes } from 'react';
import { forwardRef, useMemo } from 'react';
import clsx from 'clsx';

export default forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function IconButton(
  { children, className, onClick = () => undefined, ...rest },
  ref
) {
  const classNames = useMemo(
    () =>
      clsx([
        'group',
        'relative',
        'inline-block',
        'px-3',
        'py-2',
        'text-gray-300',
        'hover:text-white',
        'bg-gray-700',
        'hover:bg-gray-500',
        'rounded-lg',
        'text-sm',
        'font-medium',
        'transition',
        'ease-in-out',
        'duration-100',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-1',
        'focus:ring-primary-500',
        className,
      ]),
    [className]
  );

  return (
    <button ref={ref} className={classNames} onClick={onClick} {...rest}>
      {children}
    </button>
  );
});
