import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

const buttonClasses = [
  'relative',
  'inline-flex',
  'justify-center',
  'w-full',
  'sm:w-10',
  'h-10',
  'px-3',
  'py-2',
  'bg-gray-900',
  'hover:bg-gray-700',
  'text-gray-400',
  'hover:text-white',
  'border',
  'border-gray-500',
  'rounded-lg',
  'text-sm',
  'font-medium',
  'transition',
  'ease-in-out',
  'duration-300',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-1',
  'focus:ring-primary-500',
];

export const Button = ({
  children,
  className,
  ...attrs
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type='button' className={clsx(buttonClasses, className)} {...attrs}>
    {children}
  </button>
);

export const Link = ({
  children,
  className,
  ...attrs
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className={clsx(buttonClasses, className)} {...attrs}>
    {children}
  </a>
);
