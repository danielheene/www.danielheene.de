import React from 'react';
import * as ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from 'framer-motion';

import { FocusTrap } from '@components/FocusTrap';
// import { Navigation } from '@components/Na';
import { useAppStore } from '@lib/appStore';

const fadeInSpeed = 200;
const fadeInAnimation = {
  show: {
    opacity: 1,
    transition: {
      duration: fadeInSpeed / 1000,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: fadeInSpeed / 1000,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
};

export const OffCanvas = React.memo((): JSX.Element => {
  const [portal, setPortal] = React.useState<HTMLDivElement>();
  const { showNavigation, setShowNavigation } = useAppStore();
  const router = useRouter();

  /** create dom element as portal mount */
  React.useEffect(() => {
    if (!portal) {
      const element = document.createElement('div');
      element.id = 'react-portal';
      setPortal(element);
    }
  }, [portal]);

  /** add element to body */
  React.useEffect(() => {
    if (portal) document.body.appendChild(portal);

    return () => {
      if (portal) document.body.removeChild(portal);
    };
  }, [portal]);

  /** close off-canvas on route changes */
  const handleRouteChangeStart = React.useCallback(() => {
    setShowNavigation(false);
  }, [setShowNavigation]);

  /** close off-canvas */
  const handleClose = React.useCallback(
    () => setShowNavigation(false),
    [setShowNavigation]
  );

  const handleKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      if ((event.key === 'Esc' || event.key === 'Escape') && showNavigation) {
        handleClose();
      }
    },
    [handleClose, showNavigation]
  );

  /** bind route change events */
  React.useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [handleRouteChangeStart, router.events]);

  /** bind close key */
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress, false);
    return () => {
      window.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

  /** disables page scrolling when off-canvas is open */
  React.useEffect(() => {
    document.body.style.overflowY = showNavigation ? 'hidden' : '';
  }, [showNavigation]);

  if (!portal) return null;
  return ReactDOM.createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode='wait' onExitComplete={handleClose}>
        {showNavigation && (
          <motion.div
            initial='hide'
            animate='show'
            exit='hide'
            variants={fadeInAnimation}
            className={clsx([
              'flex',
              'absolute',
              'inset-0',
              'items-center',
              'justify-center',
              'bg-black/90',
              'z-40',
            ])}
          >
            <FocusTrap>
              <ul>
                <li>Item #1</li>
                <li>Item #2</li>
                <li>Item #3</li>
                <li>Item #4</li>
                <li>Item #5</li>
                <li>Item #6</li>
              </ul>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </LazyMotion>,
    portal
  );
});
