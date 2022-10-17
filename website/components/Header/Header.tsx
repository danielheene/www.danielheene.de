import { useRef } from 'react';
import clsx from 'clsx';

// import { motion, useCycle } from 'framer-motion';
import { Box } from '@components/Box';
import { Logo } from '@components/Logo';
import { MenuButton } from '@components/MenuButton';
import { useAppStore } from '@lib/appStore';
import { useOnResizeCallback } from '@lib/hooks';
// import { useDimensions } from '@lib/hooks/useDimension';
// import { HeaderNavigation } from './HeaderNavigation';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at -40px -40px)`,
    background: 'white',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at -40px -40px)',
    background: 'transparent',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
export const Header = (): JSX.Element => {
  // const containerRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>();
  const { setHeaderHeight, showNavigation, setShowNavigation, settings } =
    useAppStore();
  // const { height } = useDimensions(containerRef);
  // const [isOpen, toggleOpen] = useCycle(false, true);

  useOnResizeCallback(
    () => {
      if (headerRef.current) {
        const { height } = headerRef.current.getBoundingClientRect();
        setHeaderHeight(height);
      }
    },
    [],
    true
  );

  return (
    <Box
      as='header'
      ref={headerRef}
      className={clsx([
        'absolute',
        'container',
        'flex',
        'flex-row',
        'items-center',
        'justify-between',
        'p-6',
        '-translate-x-1/2',
        'left-1/2',
        'text-white',
        'text-[50px]',
        'z-max',
      ])}
    >
      <Logo size='text-header' />
      <MenuButton className='text-header z-max' />
      {/*<section className='z-max'>*/}
      {/*  <button onClick={() => toggleOpen()}>BBB</button>*/}
      {/*  <motion.nav*/}
      {/*    initial={false}*/}
      {/*    animate={isOpen ? 'open' : 'closed'}*/}
      {/*    custom={height}*/}
      {/*    ref={containerRef}*/}
      {/*  >*/}
      {/*    <motion.div*/}
      {/*      className='absolute top-0 left-0 bottom-0 w-[300px]'*/}
      {/*      variants={sidebar}*/}
      {/*    />*/}
      {/*    <HeaderNavigation />*/}
      {/*  </motion.nav>*/}
      {/*</section>*/}
    </Box>
  );
};
