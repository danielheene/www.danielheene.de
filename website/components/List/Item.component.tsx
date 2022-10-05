import Link from 'next/link';
import { Icon } from '@iconify/react';

import * as Action from './Action.component';
import type { ListAction } from '@typings/list';
import { ListActionType } from '@typings/list';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ItemProps {
  children?: ReactNode | ReactNode[];
  actions?: Array<ListAction>;
  description?: string;
  icon?: string | ReactNode;
  iconColor?: string;
  title: string;
}

export function Item({
  actions,
  children,
  description,
  icon,
  iconColor,
  title,
}: ItemProps) {
  return (
    <li
      className={clsx(
        'bg-gray-900',
        'bg-opacity-75',
        'backdrop-filter',
        'backdrop-blur-sm',
        'border',
        'border-gray-500',
        'rounded-lg',
        'transition',
        'ease-in-out',
        'duration-300'
      )}
    >
      <div
        className={clsx(
          'flex',
          'flex-col',
          'sm:flex-row',
          'items-center',
          'justify-between',
          'px-4',
          'py-4',
          'sm:px-6'
        )}
      >
        <div
          className={clsx(
            'flex',
            'flex-1',
            'items-center',
            'justify-start',
            'w-full'
          )}
        >
          {icon &&
            (typeof icon === 'string' ? (
              <div
                className='flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary-500'
                style={{ backgroundColor: `${iconColor} !important` }}
              >
                <Icon className='w-6 h-6 text-white' icon={icon} />
              </div>
            ) : (
              <>{icon}</>
            ))}
          <div className='min-w-0 flex-1 px-4'>
            <h1 className='text-white text-lg font-bold'>{title}</h1>
            {description && (
              <p className='flex items-center mt-1 text-gray-400 text-xs'>
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className='inline-flex items-center justify-end space-x-2 w-full sm:w-auto mt-4 sm:mt-1'>
            {actions.map((action, index) => {
              switch (action.type) {
                case ListActionType.BUTTON:
                  return (
                    <Action.Button
                      aria-label={action.label}
                      key={index}
                      onClick={action.onClick}
                    >
                      <span className='sr-only'>{action.label}</span>
                      <Icon icon={action.icon} />
                    </Action.Button>
                  );
                case ListActionType.LINK:
                  if (action.external ?? true)
                    return (
                      <Action.Link
                        aria-label={action.label}
                        href={action.href}
                        key={index}
                        onClick={action.onClick}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <span className='sr-only'>{action.label}</span>
                        <Icon icon={action.icon} />
                      </Action.Link>
                    );

                  return (
                    <Link href={action.href} passHref>
                      <Action.Link
                        aria-label={action.label}
                        key={index}
                        onClick={action.onClick}
                      >
                        <span className='sr-only'>{action.label}</span>
                        <Icon icon={action.icon} />
                      </Action.Link>
                    </Link>
                  );
              }
            })}
          </div>
        )}
      </div>
      {children}
    </li>
  );
}
