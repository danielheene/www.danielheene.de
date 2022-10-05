import Link from 'next/link';
import { Icon } from '@iconify/react';

import { NavigationItemType } from '@typings/navigation';

import type { MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';
import { useMemo } from 'react';

interface StandardButtonProps {
  icon?: string;
  children?: ReactNode | ReactNode[];
  className?: string;
  type?: NavigationItemType;
  href?: string;
  external?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export default function StandardButton({
  children,
  icon,
  href,
  type,
  onClick = () => undefined,
  ...rest
}: StandardButtonProps) {
  const classNames = useMemo(
    () =>
      clsx([
        'flex',
        'justify-center',
        'items-center',
        'h-12',
        'px-8',
        'py-4',
        'bg-gray-900',
        'hover:bg-gray-800',
        'hover:bg-opacity-50',
        'text-base',
        'font-bold',
        'text-primary-300',
        'hover:text-primary-400',
        'rounded-lg',
        'transition',
        'ease-in-out',
        'duration-300',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-primary-500',
      ]),
    []
  );

  switch (type) {
    case NavigationItemType.LINK:
      if (rest.external ?? true)
        return (
          <a href={href} {...rest} className={classNames}>
            {icon && <Icon className='mr-2' icon={icon} />}
            {children}
          </a>
        );

      return (
        <Link href={href}>
          <a {...rest}>
            {icon && <Icon className='mr-2' icon={icon} />}
            {children}
          </a>
        </Link>
      );

    case NavigationItemType.ACTION:
      return (
        <button {...rest} type='button' onClick={onClick}>
          {icon && <Icon className='mr-2' icon={icon} />}
          {children}
        </button>
      );
  }
}
