import { Icon } from '@iconify/react';

import { Section } from '@components/Section';
import { SectionHeader } from '@components/SectionHeader';
import { Typography } from '@components/Typography';
import { ServiceItemData, ServicesSectionData } from '@lib/types';

type ServiceItemProps = Omit<ServiceItemData, '_key'>

const ServiceItem = ({ name, icon, body }: ServiceItemProps): JSX.Element => {
  return (
    <div className='bg-transparent flex flex-col min-w-[300px] max-w-[350px] m-12 text-white'>
      <div className='rounded-full m-auto text-6xl p-8'>
        <Icon icon={icon} />
      </div>
      <Typography variant='section-subheading'>{name}</Typography>
      <Typography variant='body'>{body}</Typography>
    </div>
  );
};

type ServicesSectionProps = ServicesSectionData

export const ServicesSection = (props: ServicesSectionProps): JSX.Element => {
  const { header, entries } = props;

  return (
    <Section>
      <SectionHeader {...header} />

      <div className='flex flex-column md:flex-row flex-wrap justify-around -mt-12 -mb-12'>
        {entries.map(({ _key, ...itemProps }) => (
          <ServiceItem key={_key} {...itemProps} />
        ))}
      </div>
    </Section>
  );
};
