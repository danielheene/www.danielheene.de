import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '@iconify/react';

import type { AnchorHTMLAttributes } from 'react';

interface OutlineButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  icon?: string;
  small?: boolean;
  className?: string;
}

export default function Outline({
  children,
  className,
  external = false,
  href,
  icon,
  onClick = () => undefined,
  small = false,
  ...rest
}: OutlineButtonProps) {
  const classNames = clsx([
    'inline-flex',
    'items-center',
    'justify-center',
    'w-full',
    'sm:w-auto',
    'bg-gray-900',
    'bg-opacity-75',
    'hover:bg-gray-800',
    'hover:bg-opacity-75',
    'backdrop-filter',
    'backdrop-blur-sm',
    'saturate-200',
    'text-primary-500',
    'hover:text-primary-400',
    'font-medium',
    'border-2',
    'border-gray-700',
    'rounded-lg',
    'cursor-pointer',
    'transition',
    'ease-in-out',
    'duration-300',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-4',
    'focus:ring-primary-500',
    small && ['px-4', 'py-1', 'text-sm'],
    !small && ['px-8', 'py-2'],
    className,
  ]);

  return (
    <Link href={href}>
      <a
        className={classNames}
        href={href}
        onClick={onClick}
        rel='noopener noreferrer'
        target={external ? '_blank' : undefined}
        {...rest}
      >
        {icon && <Icon className='mt-1 mr-3' icon={icon} />}
        {children}
      </a>
    </Link>
  );
}
