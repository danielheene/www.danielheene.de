import Link from 'next/link';
import clsx, { ClassValue } from 'clsx';
import React, { memo } from 'react';

const NAV_ITEMS = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/resume',
    title: 'Resume',
  },
];

interface NavigationProps {
  className?: ClassValue;
  vertical?: boolean;
}

export const Navigation = memo(
  ({ className, vertical }: NavigationProps): JSX.Element => {
    const containerClasses = React.useMemo(
      () =>
        clsx([
          'font-core-sans',
          'text-current',
          'uppercase',
          'text-3xl',
          'xl:text-4xl',
          'flex',
          'gap-8',
          'self-center',
          'transition-colors',
          {
            'flex-row': !vertical,
            'flex-col': vertical,
          },
          className,
        ]),
      [className, vertical]
    );

    const linkClasses = clsx([
      'font-core-sans',
      'text-current',
      'text-center',
      'uppercase',
      'text-3xl',
      'xl:text-4xl',
      'transition-colors',
      'hover:no-underline',
      'p-2',
    ]);

    return (
      <nav className={containerClasses}>
        {NAV_ITEMS.map(({ href, title }) => (
          <Link key={href} href={href}>
            <a className={linkClasses}>{title}</a>
          </Link>
        ))}
      </nav>
    );
  }
);
