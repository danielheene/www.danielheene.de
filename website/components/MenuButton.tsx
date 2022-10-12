import React, { memo, ReactNode } from 'react';
import clsx, { ClassValue } from 'clsx';
import { useUI } from '@lib/context';
import { Burger } from '@components/Burger';

interface MenuButtonProps {
  className?: ClassValue;
  setBody?: ReactNode | ReactNode[];
  withContainer?: boolean;
}

export const MenuButton = memo(
  ({
    className,
    setBody,
    withContainer = false,
  }: MenuButtonProps): JSX.Element => {
    const {
      offCanvasIsVisible,
      offCanvasBody,
      toggleOffCanvasVisibility,
      setOffCanvasBody,
    } = useUI();

    const handleClick = React.useCallback(() => {
      if (setBody) setOffCanvasBody(setBody);
      toggleOffCanvasVisibility(!offCanvasIsVisible);
    }, [
      offCanvasIsVisible,
      setBody,
      setOffCanvasBody,
      toggleOffCanvasVisibility,
    ]);

    const button = React.useMemo(
      () => (
        <button
          className={clsx([
            'text-4xl',
            'text-current',
            'transition-colors',
            'flex',
            'items-center',
            'justify-center',
            'w-min-[40px]',
            'h-min-[40px]',
            'pointer-events-auto',
            'ml-auto',
            'p-2',
            'bg-gray-700',
            'hover:bg-gray-500',
            'rounded-lg',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-primary-500',
            'z-max',
            className,
          ])}
          onClick={handleClick}
          aria-label={
            offCanvasIsVisible ? 'Close Navigation' : 'Open Navigation'
          }
        >
          <Burger open={offCanvasIsVisible} />
        </button>
      ),
      [className, handleClick, offCanvasIsVisible]
    );

    return withContainer ? (
      <div
        className={clsx([
          'container',
          'absolute',
          'top-10',
          'left-1/2',
          '-translate-x-1/2',
          'pointer-events-none',
        ])}
      >
        {button}
      </div>
    ) : (
      button
    );
  }
);
