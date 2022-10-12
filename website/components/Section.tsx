import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { Box } from '@components/Box';

interface SectionProps {
  children: ReactNode | ReactNode[];
  noFullWidth?: boolean;
  backgroundColor?: string;
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children, noFullWidth, backgroundColor } = props;

  const [containerClassNames, wrapperClassNames] = useMemo(() => {
    return [clsx('w-screen', 'py-', 'md:px-8', 'mx-auto'), clsx([])];
  }, []);

  return (
    <Box as='section' className={containerClassNames}>
      <Box className={wrapperClassNames}>{children}</Box>
    </Box>
  );
};
