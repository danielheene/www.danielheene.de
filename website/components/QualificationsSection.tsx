import clsx from 'clsx';
import { QualificationsSectionData, QualificationItemData } from '@lib/types';
import { Card } from '@components/Card';

interface QualificationEntryProps extends QualificationItemData {
  index: number;
}

const QualificationEntry = ({
  index,
  title,
  employer,
  location,
  start,
  end,
  body,
}: QualificationEntryProps): JSX.Element => {
  const isEven = !!(index % 2);
  const isOdd = !(index % 2);

  return (
    <>
      {isEven && <div className='w-full lg:w-1/2 px-4' />}
      <div className='w-full lg:w-1/2 px-4'>
        <div
          className={clsx(
            [
              'lg:max-w-[428px]',
              'xl:max-w-[490px]',
              'w-full',
              'ml-auto',
              'pl-8',
              'sm:pl-11',
              'lg:pl-0',
              'lg:pr-0',
              'relative',
              'pb-16',
            ],
            isOdd && ['lg:text-right', 'lg:mr-5'],
            isEven && ['lg:ml-5'],
            'text-white',
            'glass'
          )}
        >
          <span
            className={clsx(
              [
                'absolute',
                'top-1',
                'left-0',
                'w-4',
                'h-4',
                'rounded-full',
                'bg-vibrant-deep-blue',
              ],
              isOdd && ['lg:left-auto', 'lg:-right-11'],
              isEven && ['lg:-left-11']
            )}
          />
          <Card variant='light' tilted>
            <h3 className='font-semibold text-xl text-white mb-1'>{title}</h3>
            <p className='font-semibold text-base text-gray-400 mb-3'>
              {employer} | {location}
            </p>
            <span
              className={clsx([
                'inline-flex',
                'items-center',
                'justify-center',
                'py-2',
                'px-4',
                'rounded-full',
                'bg-vibrant-deep-blue',
                'text-white',
                'text-xs',
                'font-bold',
                'mb-5',
              ])}
            >
              {!!end ? `${start} - ${end}` : `since ${start}`}
              {/*{start} - {end}*/}
            </span>
            <p className='font-medium text-base text-white/70'>{body}</p>
          </Card>
        </div>
      </div>
      {isOdd && <div className='w-full lg:w-1/2 px-4' />}
    </>
  );
};

interface QualificationsSectionProps extends QualificationsSectionData {}

export const QualificationsSection = ({
  headline,
  preHeadline,
  subHeadline,
  entries,
}: QualificationsSectionProps): JSX.Element => {
  return (
    <section className='pt-[120px] relative z-10'>
      <div className='container'>
        <div className='border-b border-[#E9ECF8] pb-[70px]'>
          <div className='flex flex-wrap mx-[-16px]'>
            <div className='w-full px-4'>
              <div className='max-w-[600px] mx-auto text-center mb-[50px]'>
                {preHeadline && (
                  <span
                    className={clsx([
                      'font-semibold',
                      'text-lg',
                      'text-primary',
                      'block',
                      'mb-2',
                    ])}
                  >
                    {preHeadline}
                  </span>
                )}
                {headline && (
                  <h2
                    className={clsx([
                      'font-bold',
                      'text-black',
                      'text-3xl',
                      'sm:text-4xl',
                      'md:text-[45px]',
                      'mb-5',
                    ])}
                  >
                    {headline}
                  </h2>
                )}
                {subHeadline && (
                  <p className={clsx(['font-medium', 'text-lg', 'text-white'])}>
                    {subHeadline}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='relative pt-12'>
            <span
              className={clsx([
                'absolute',
                'top-0',
                'block',
                'left-2',
                'lg:left-1/2',
                'w-[1px]',
                'h-full',
                'bg-[#d7dfff]',
              ])}
            />

            <div className='flex flex-wrap -mx-4'>
              {entries.map((resume, index) => (
                <QualificationEntry
                  key={resume._key}
                  index={index}
                  {...resume}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
