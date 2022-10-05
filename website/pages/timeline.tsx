// import { format, parse } from 'date-fns';
import { Icon } from '@iconify/react';

import { Pill } from '@components/Pill';
import { Layout } from '@layouts/index';

import type { GetStaticProps } from 'next';

import type { Job } from '@typings/timeline';
import clsx from 'clsx';
import sanity from '@lib/sanity';
import { PortableText } from '@portabletext/react';
import { formatDate, sortDateDescending } from '@lib/utils';

interface TimelineProps {
  jobs: Job[];
}

export const getStaticProps: GetStaticProps<TimelineProps> = async () => {
  const data = await sanity.fetch('*[_type == "job"]');
  const jobs = data
    .sort((a, b) => sortDateDescending(a.startDate, b.startDate))
    .sort((a, b) => ('endDate' in b ? -1 : 0))
    .map((e) => ({
      ...e,
      startDate: formatDate(e.startDate, 'MM/yyyy'),
      endDate: formatDate(e.endDate, 'MM/yyyy'),
    }));

  return {
    props: {
      jobs,
    },
    revalidate: process.env.NODE_ENV === 'production' ? 300 : 5,
  };
};

export default function TimelinePage({ jobs }: TimelineProps) {
  return (
    <Layout.Default seo={{ title: 'daniel.heene.io ─ timeline' }}>
      <div
        className={clsx(
          'flex-grow',
          'flex',
          'flex-col',
          'justify-center',
          'max-w-lg',
          'sm:max-w-4xl',
          'w-full',
          'mx-auto',
          'px-0',
          'sm:px-16'
        )}
      >
        <ul role='list'>
          {jobs.map((job, index) => (
            <li key={job._id}>
              <article
                className={clsx(
                  'relative',
                  'flex',
                  'flex-col',
                  'gap-5',
                  'p-3',
                  'bg-gray-900',
                  'bg-opacity-75',
                  'backdrop-filter',
                  'backdrop-blur-sm',
                  'border-2',
                  'border-gray-600',
                  'rounded-lg'
                )}
              >
                <header className='flex flex-row items-center justify-start'>
                  <div
                    className={clsx(
                      'relative',
                      'flex',
                      'items-center',
                      'justify-center',
                      'w-12',
                      'h-12',
                      'bg-primary-800',
                      'bg-opacity-15',
                      // 'backdrop-filter',
                      // 'backdrop-blur-sm',
                      'saturate-200',
                      'mx-2',
                      'px-2',
                      'self-start',
                      'rounded-full'
                    )}
                  >
                    <Icon
                      className='w-6 h-6 text-primary-200'
                      icon={job.icon}
                      aria-hidden='true'
                    />
                  </div>
                  <h1 className='flex flex-wrap justify-start items-center text-white ml-2 text-lg tracking-tight font-bold'>
                    <span>{job.title}</span>
                    {job?.link && (
                      <a
                        className='p-1 ml-2 opacity-50 hover:opacity-100'
                        href={job?.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Icon className='m-0' icon='feather:external-link' />
                      </a>
                    )}
                  </h1>
                  <div
                    className={clsx(
                      'inline-flex',
                      'flex-row',
                      'justify-end',
                      'items-center',
                      'whitespace-nowrap',
                      'mb-2',
                      'self-end',
                      'ml-auto'
                    )}
                  >
                    <Pill.Date small={true} ongoing={job.endDate === null}>
                      {job.endDate === null ? 'Since ' : ''}
                      {job.startDate}
                    </Pill.Date>
                  </div>
                </header>

                <div className='min-w-0 flex-1 flex flex-col gap-3'>
                  <PortableText value={job.body} />
                </div>
                {job.tags && (
                  <div className='flex flex-row flex-wrap'>
                    {job.tags.map((tag) => (
                      <span
                        className={clsx(
                          'inline-flex',
                          'items-center',
                          'justify-center',
                          'py-1',
                          'px-2',
                          'my-0.5',
                          'last:mr-0.5',
                          'mr-1',
                          'text-xs',
                          'font-semibold',
                          'uppercase',
                          'rounded',
                          'text-primary-400',
                          'bg-primary-600',
                          'bg-opacity-15',
                          // 'backdrop-filter',
                          // 'backdrop-blur-sm',
                          'saturate-200'
                        )}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
              {index !== jobs.length - 1 ? (
                <div
                  aria-hidden='true'
                  className={clsx(
                    'h-8',
                    'w-full',
                    'flex',
                    'justify-center',
                    'before:content-[" "]',
                    'before:block',
                    'before:h-8',
                    'before:w-0.5',
                    'before:bg-gray-600'
                  )}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Layout.Default>
  );
}
