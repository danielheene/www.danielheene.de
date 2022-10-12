import { Card } from '@components/Card';
import clsx from 'clsx';
import { useRef } from 'react';
import { useUI } from '@lib/context';

interface HeaderProps {}

export const Header = (props: HeaderProps): JSX.Element => {
  const headerRef = useRef<HTMLDivElement>();
  const {} = useUI();

  return (
    <Card container variant='light' as='header'>
      <div
        className={clsx([
          'flex',
          'flex-row',
          'items-center',
          'justify-between',
        ])}
      >
        <div>LOGO</div>
        <nav>NAV</nav>
      </div>
    </Card>
  );
};
