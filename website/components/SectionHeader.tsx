import { SectionHeaderData } from '@lib/types';
import { Box } from '@components/Box';
import { Typography } from '@components/Typography';

interface SectionHeaderProps extends SectionHeaderData {}

export const SectionHeader = (props: SectionHeaderProps): JSX.Element => {
  const { headline, preHeadline, subHeadline } = props;

  if (!headline && !preHeadline && !subHeadline) return null;
  return (
    <Box
      as='header'
      className='container flex flex-col justify-center items-center gap-6 my-24 text-center text-white'
    >
      {preHeadline && (
        <Typography as='p' variant='section-subheading'>
          {preHeadline}
        </Typography>
      )}
      {headline && (
        <Typography as='h2' variant='section-heading'>
          {headline}
        </Typography>
      )}
      {subHeadline && (
        <Typography as='p' variant='section-subheading'>
          {subHeadline}
        </Typography>
      )}
    </Box>
  );
};
