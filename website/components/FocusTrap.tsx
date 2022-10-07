import React from 'react';
import { isBrowser, useIsomorphicLayoutEffect } from '@lib/helpers';

const focusableSelector = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
].join(',');

interface FocusTrapProps {
  children: React.ReactNode;
}

export default function FocusTrap({ children }: FocusTrapProps): JSX.Element {
  const rootRef = React.useRef<HTMLDivElement>();
  const anchorRef = React.useRef<HTMLElement>();
  const focusedRef = React.useRef<HTMLElement>();

  useIsomorphicLayoutEffect(() => {
    if (document && document.activeElement && !anchorRef.current) {
      anchorRef.current = document.activeElement as HTMLElement;
    }

    return () => {
      if (document && anchorRef.current) {
        anchorRef.current.focus();
      }
    };
  }, []);

  const focusElement = React.useCallback((element: HTMLElement) => {
    let interval: any;
    interval = setInterval(() => {
      if (document.activeElement === element) {
        focusedRef.current = element;
        clearInterval(interval);
      } else {
        element.focus();
      }
    }, 25);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isBrowser() && rootRef.current && !focusedRef.current) {
      const elements = rootRef.current.querySelectorAll(focusableSelector);
      const nextFocus = Array.from(elements).at(0) as HTMLElement;
      focusElement(nextFocus);
    }
  }, [focusElement]);

  const handleFocus = React.useCallback(
    (event: KeyboardEvent) => {
      if (!rootRef.current || !focusedRef.current || event.key !== 'Tab')
        return;

      event.preventDefault();
      const elements = rootRef.current.querySelectorAll(focusableSelector);
      const currentPosition = Array.from(elements).indexOf(focusedRef.current);
      const nextPosition =
        (currentPosition + (event.shiftKey ? elements.length - 1 : 1)) %
        elements.length;
      const nextFocus = elements[nextPosition] as HTMLElement;
      focusElement(nextFocus);
    },
    [focusElement]
  );

  useIsomorphicLayoutEffect(() => {
    window?.addEventListener('keydown', handleFocus, false);

    return () => {
      window?.removeEventListener('keydown', handleFocus, false);
    };
  }, [handleFocus]);

  return (
    <div
      ref={(element) => (rootRef.current = element || undefined)}
      className='outline-none focus-trap'
      tabIndex={-1}
    >
      {children}
    </div>
  );
}
