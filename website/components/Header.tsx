import clsx from 'clsx';
import { useRef } from 'react';
import { useAppStore } from '@lib/app-context';
import { Logo } from '@components/Logo';
import { Box } from '@components/Box';
import { MenuButton } from '@components/MenuButton';
import { useOnResizeCallback } from '@lib/hooks';

export const Header = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>();
  const { setHeaderHeight } = useAppStore();

  useOnResizeCallback(
    () => {
      if (headerRef.current) {
        const { height } = headerRef.current.getBoundingClientRect();
        setHeaderHeight(height);
        console.log('fired!');
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
    </Box>
  );
};
