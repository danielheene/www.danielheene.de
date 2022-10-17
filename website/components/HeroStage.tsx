import React from 'react';
import Image from 'next/future/image';
import { Icon } from '@iconify/react';
import clsx, { ClassValue } from 'clsx';

import { useAppStore } from '@lib/appStore';
import { ContactProvider, ContactService, HeroStageData } from '@lib/types';
import { resolveContactService } from '@lib/utils';

interface HeroStageProps extends HeroStageData {
  className?: ClassValue | string;
}

export const HeroStage = ({
  className,
  portrait,
  subHeadline,
  headline,
}: HeroStageProps): JSX.Element => {
  const { headerHeight, settings } = useAppStore();
  const { contactServices } = settings;
  return (
    <>
      <div className={clsx('stage', className)}>
        <div className='container relative min-h-2 w-full h-full grid grid-cols-2 gap-8 p-8'>
          <div className='flex flex-col'>
            {headline && (
              <h1
                className={clsx([
                  'font-space-grotesk',
                  'font-bold',
                  'text-white',
                  'text-4xl',
                  'sm:text-6xl',
                  'lg:text-6xl',
                ])}
              >
                {headline}
              </h1>
            )}
            {subHeadline && (
              <p
                className={clsx([
                  'font-space-grotesk',
                  'font-bold',
                  'text-3xl',
                  'sm:text-4xl',
                  'lg:text-5xl',
                  'text-transparent',
                  '!leading-relaxed',
                  'bg-clip-text',
                  'bg-vibrant-october-silence',
                ])}
              >
                {subHeadline}
              </p>
            )}
            {contactServices && (
              <div
                className={clsx([
                  'flex',
                  'flex-row',
                  'justify-between',
                  'mt-auto',
                  'text-2xl',
                  'gap-3',
                ])}
              >
                {Object.entries(contactServices as { [k: string]: string }).map(
                  ([key, value]) => {
                    const { urlPrefix, icon }: ContactService =
                      resolveContactService(key as ContactProvider);

                    return (
                      <a
                        key={key}
                        href={`${urlPrefix as string}/${value}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block'
                      >
                        <Icon icon={icon} />
                      </a>
                    );
                  }
                )}
              </div>
            )}
          </div>
          {portrait && (
            <Image
              src={portrait.url}
              sizes='(max-width: 768px) 100vw, 50vw'
              height={500}
              width={500}
              priority
              alt=''
              style={{
                position: 'absolute',
                maxWidth: '100%',
                bottom: 0,
                right: 0,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>
      <style jsx>
        {`
          .stage {
            --header-height: ${headerHeight}px;

            height: calc(100vh - var(--header-height, 0));
            width: 100%;
            margin-top: var(--header-height, 0);
          }
        `}
      </style>
    </>
  );
};
