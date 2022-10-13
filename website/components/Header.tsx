import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useUI } from '@lib/context';
import { Logo } from '@components/Logo';
import { Box } from '@components/Box';
import { MenuButton } from '@components/MenuButton';

interface HeaderProps {}

export const Header = (props: HeaderProps): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>();
  const { setHeaderHeight } = useUI();

  useEffect(() => {
    if (headerRef.current) {
      const { width, height } = headerRef.current.getBoundingClientRect();
      const { scrollWidth, scrollHeight } = headerRef.current;
      console.log(width, height, scrollWidth, scrollHeight);
    }
  }, []);

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
        // 'sticky',
        'text-white',
        'z-max',
      ])}
    >
      <Logo />
      {/*<nav>NAV</nav>*/}
      <MenuButton />
    </Box>
  );
};
