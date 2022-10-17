import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { Box } from '@components/Box';

interface SectionProps {
  children: ReactNode | ReactNode[];
  fullWidth?: boolean;
}

export const Section = (props: SectionProps): JSX.Element => {
  const { children, fullWidth = false } = props;

  return (
    <>
      <Box
        as='section'
        className={clsx('section', 'relative', 'z-1', 'w-screen', 'mx-auto')}
      >
        <Box className={clsx('section-container', !fullWidth && 'container')}>
          {children}
        </Box>
      </Box>
      <style jsx>
        {`
          :global(.section) {
            padding-bottom: 120px;
          }

          :global(.section) + :global(.section) {
            padding-top: 120px;
          }

          :global(.section) + :global(.section) > :global(.section-container) {
            border-top: 1px solid #e9ecf8;
          }
        `}
      </style>
    </>
  );
};
