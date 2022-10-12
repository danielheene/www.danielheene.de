import { SectionHeaderData } from '@lib/types';
import { Box } from '@components/Box';

interface SectionHeaderProps extends SectionHeaderData {}

export const SectionHeader = (props: SectionHeaderProps): JSX.Element => {
  const { headline, preHeadline, subHeadline } = props;

  if (!headline && !preHeadline && !subHeadline) return null;
  return (
    <Box
      as='header'
      className='flex flex-col lg:flex-row lg:justify-between items-center my-24 container'
    >
      {preHeadline && <p className='text-primary text-sm font-bold'></p>}
      {headline && (
        <h2 className='text-transparent bg-clip-text bg-vibrant-october-silence text-6xl font-bold text-center mb-2 lg:mb-0'>
          {headline}
        </h2>
      )}
      {subHeadline && (
        <p className='max-w-md text-gray-400 text-center lg:text-right'>
          {subHeadline}
        </p>
      )}
    </Box>
  );
};
