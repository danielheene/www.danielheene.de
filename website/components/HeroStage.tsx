import React from 'react';
import clsx, { ClassValue } from 'clsx';
import { HeroStageData } from '@lib/types';
import Image from 'next/future/image';
import { useAppStore } from '@lib/app-context';

interface HeroStageProps extends HeroStageData {
  className?: ClassValue | string;
}

export const HeroStage = ({
  className,
  portrait,
  subHeadline,
  headline,
}: HeroStageProps): JSX.Element => {
  const { headerHeight } = useAppStore();

  return (
    <>
      <div className={clsx('stage', className)}>
        <div className='container relative min-h-2 w-full h-full grid grid-cols-2 gap-8 p-8'>
          <div>
            {headline && (
              <h1 className='font-recursive text-white text-5xl sm:text-6xl lg:text-8xl tracking-tight font-extrabold font-recursive'>
                {headline}
                {/*Hey <Wave>👋</Wave> I'm Daniel, <br className='hidden sm:block' />*/}
                {/*a JavaScript engineer*/}
              </h1>
            )}
            {subHeadline && (
              <p className='max-w-xs mt-4 md:mt-8 mx-auto text-base text-white sm:text-lg md:text-xl md:max-w-3xl font-semibold'>
                {subHeadline}
              </p>
            )}
          </div>
          {portrait && (
            <Image
              src={portrait.url}
              height={500}
              width={500}
              alt=''
              style={{ position: 'absolute', bottom: 0, right: 0 }}
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
