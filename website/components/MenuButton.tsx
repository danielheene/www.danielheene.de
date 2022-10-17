import React, { memo } from 'react';
import clsx, { ClassValue } from 'clsx';
import { useAppStore } from '@lib/app-context';
import { Burger } from '@components/Burger';

interface MenuButtonProps {
  className?: ClassValue;
}

export const MenuButton = memo(
  ({ className }: MenuButtonProps): JSX.Element => {
    const { showNavigation, setShowNavigation } = useAppStore();

    return (
      <button
        className={clsx([
          'flex',
          'items-center',
          'justify-center',
          'w-[1em]',
          'h-[1em]',
          'ml-auto',
          'box-border',
          'rounded-3',
          'z-max',
          className,
        ])}
        type='button'
        onClick={() => setShowNavigation(!showNavigation)}
        aria-label={showNavigation ? 'Close Navigation' : 'Open Navigation'}
      >
        <Burger style={{ fontSize: '80%' }} open={showNavigation} />
      </button>
    );
  }
);
