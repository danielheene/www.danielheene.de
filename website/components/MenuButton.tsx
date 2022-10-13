import React, { memo, ReactNode } from 'react';
import clsx, { ClassValue } from 'clsx';
import { useUI } from '@lib/context';
import { Burger } from '@components/Burger';
import { Card } from '@components/Card';

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
        <Card
          as='button'
          radius={false}
          className={clsx([
            'text-4xl',
            'text-white',
            'transition-colors',
            'flex',
            'items-center',
            'justify-center',
            'w-[40px]',
            'h-[40px]',
            'pointer-events-auto',
            'ml-auto',
            'box-border',
            'p-2',
            'bg-primary-800',
            'hover:bg-primary-700',
            'rounded-3',
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
        </Card>
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
