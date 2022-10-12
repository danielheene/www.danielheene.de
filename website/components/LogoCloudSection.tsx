import { forwardRef, memo, Ref, useEffect, useRef, useState } from 'react';
import { LogoCloudItemData, LogoCloudSectionData } from '@lib/types';
import { Card } from '@components/Card';
import { Marquee } from '@components/Marquee';
import { SectionHeader } from '@components/SectionHeader';
import { Section } from '@components/Section';

interface LogoCloudItemProps extends LogoCloudItemData {}

const LogoCloudItem = memo(
  forwardRef(
    ({ image }: LogoCloudItemProps, ref: Ref<HTMLDivElement>): JSX.Element => {
      return (
        <>
          <Card
            variant='light'
            ref={ref}
            className='w-full aspect-video flex justify-center items-center'
          >
            <div
              className='logo w-full h-full'
              style={{
                maskImage: `url(${image.url})`,
                WebkitMaskImage: `url(${image.url})`,
              }}
            />
          </Card>

          <style jsx>
            {`
              .logo {
                background-color: #fff;
                mask-position: center;
                mask-size: contain;
                mask-repeat: no-repeat;
                max-width: 80%;
                max-height: 65%;
              }
            `}
          </style>
        </>
      );
    }
  )
);

interface LogoCloudProps extends LogoCloudSectionData {}

export const LogoCloudSection = memo(
  ({ sectionHeader, entries }: LogoCloudProps): JSX.Element => {
    return (
      <Section>
        <SectionHeader {...sectionHeader} />
        <Marquee>
          {entries && entries.map((e, i) => <LogoCloudItem key={i} {...e} />)}
        </Marquee>
      </Section>
    );
  }
);
