import React, { ReactNode } from 'react';
import {
  AiOutlineClose as CloseIcon,
  AiOutlineMenu as MenuIcon,
} from 'react-icons/ai';
import clsx, { ClassValue } from 'clsx';
import { useUI } from '@lib/context';
import IconButton from '@components/Button/IconButton';
import Outline from '@components/Button/OutlineButton';
import { Button } from '@components/Button';

interface OffCanvasButtonProps {
  className?: ClassValue;
  setBody?: ReactNode | ReactNode[];
  withContainer?: boolean;
}

export default function OffCanvasButton({
  className,
  setBody,
  withContainer = false,
}: OffCanvasButtonProps): JSX.Element {
  const {
    offCanvas: { isVisible },
    setOffCanvasVisibility,
    setOffCanvasBody,
  } = useUI();

  const handleClick = React.useCallback(() => {
    if (setBody) setOffCanvasBody(setBody);
    setOffCanvasVisibility(!isVisible);
  }, [isVisible, setBody, setOffCanvasBody, setOffCanvasVisibility]);

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
          className,
        ])}
        onClick={handleClick}
        aria-label={isVisible ? 'Close Navigation' : 'Open Navigation'}
      >
        {isVisible ? <CloseIcon /> : <MenuIcon />}
      </button>
    ),
    [className, handleClick, isVisible]
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
