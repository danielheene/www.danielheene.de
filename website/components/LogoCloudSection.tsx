import { forwardRef, memo, Ref, useEffect, useRef, useState } from 'react';
import { LogoCloudItemData } from '@typings/blocks';
import { LogoCloudSectionData } from '@typings/sections';

interface LogoCloudItemProps extends LogoCloudItemData {}

const LogoCloudItem = memo(
  forwardRef(
    ({ image }: LogoCloudItemProps, ref: Ref<HTMLDivElement>): JSX.Element => (
      <div
        ref={ref}
        className='h-16 sm:h-32 flex justify-center items-center bg-gray-100 text-gray-400 rounded-lg p-4'
      >
        <img className='w-auto h-6 sm:h-8' src={image.url} alt={image.name} />
      </div>
    )
  )
);

interface LogoCloudProps extends LogoCloudSectionData {}

export const LogoCloudSection = memo(
  ({ headline, subHeadline, entries }: LogoCloudProps): JSX.Element => {
    const timer = useRef<number>();
    const [currentPos, setCurrentPos] = useState<number>(0);

    // useEffect(() => {
    //   if (!timer.current) {
    //     console.log('setting timer');
    //
    //     timer.current = setInterval(() => {
    //       setCurrentPos((pos) => pos + 1);
    //       console.log('called timer');
    //     }, 3000) as unknown as number;
    //   }
    //
    //   return () => {
    //     // console.log('timer cleared');
    //     // clearTimeout(timer.current);
    //   };
    // }, []);

    const slides = [
      entries[currentPos % 3],
      entries[(currentPos + 1) % 3],
      entries[(currentPos + 2) % 3],
    ];

    return (
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
          {(!!headline || !!subHeadline) && (
            <div className='flex flex-col lg:flex-row lg:justify-between items-center mb-4 md:mb-8'>
              {headline && (
                <h2 className='text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-2 lg:mb-0'>
                  {headline}
                </h2>
              )}
              {subHeadline && (
                <p className='max-w-md text-gray-400 text-center lg:text-right'>
                  {subHeadline}
                </p>
              )}
            </div>
          )}
          {entries && entries.map((e, i) => <LogoCloudItem key={i} {...e} />)}
        </div>
      </div>
    );
  }
);
