import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';

interface DatePillProps {
  children?: ReactNode | ReactNode[];
  small?: boolean;
  ongoing?: boolean;
}

export function DatePill({ children, small, ongoing }: DatePillProps) {
  const [containerClasses, iconClasses] = useMemo(
    () => [
      clsx(
        'inline-flex',
        'justify-center',
        'w-full',
        'sm:w-auto',
        'bg-primary-500',
        'bg-opacity-15',
        'backdrop-filter',
        'backdrop-blur-sm',
        'saturate-200',
        'rounded-lg',
        'font-semibold',
        'text-sm',
        'text-primary-500',
        small ? ['px-2', 'py-1'] : ['px-4', 'py-2'],
        ongoing
          ? ['bg-green-500', 'bg-opacity-15', 'text-green-500']
          : ['bg-primary-500', 'bg-opacity-15', 'text-primary-500']
      ),
      clsx('mt-0.5', small ? 'mr-1.5' : 'mr-3'),
    ],
    [small, ongoing]
  );

  return (
    <div className={containerClasses}>
      <Icon className={iconClasses} icon='feather:calendar' />
      {children}
    </div>
  );
}
