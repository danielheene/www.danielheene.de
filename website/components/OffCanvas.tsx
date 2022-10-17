import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from 'framer-motion';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useAppStore } from '@lib/app-context';
import { FocusTrap } from '@components/FocusTrap';
import { isBrowser } from '@lib/utils';
import { Navigation } from '@components/Navigation';

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

export const OffCanvas = memo((): JSX.Element => {
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
    if (document && portal) document.body.appendChild(portal);

    return () => {
      if (document && portal) document.body.removeChild(portal);
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
    if (isBrowser()) {
      window.addEventListener('keydown', handleKeyPress, false);
    }
    return () => {
      if (isBrowser()) {
        window.removeEventListener('keydown', handleKeyPress, false);
      }
    };
  }, [handleKeyPress]);

  /** disables page scrolling when off-canvas is open */
  React.useEffect(() => {
    if (isBrowser()) {
      document.body.style.overflowY = showNavigation ? 'hidden' : '';
    }
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
              <Navigation />
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </LazyMotion>,
    portal
  );
});
