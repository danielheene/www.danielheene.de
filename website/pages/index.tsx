import React from 'react';
import { differenceInYears, isSameDay, isSameMonth } from 'date-fns';
import { Icon } from '@iconify/react';
import { GetStaticProps } from 'next';

import { Button } from '@components/Button';
import { Pill } from '@components/Pill';
import type { NavigationItem } from '@typings/navigation';
import { NavigationItemType } from '@typings/navigation';
import { Layout } from '@layouts/index';
import HireMeMemoji from '@components/HireMeMemoji';
import Wave from '@components/Wave';

const ACTIONS: Array<NavigationItem> = [
  {
    type: NavigationItemType.LINK,
    external: true,
    href: 'https://github.com/danielheene',
    icon: <Icon className='mr-3' icon='simple-icons:github' />,
    text: 'GitHub',
  },
  {
    type: NavigationItemType.LINK,
    external: true,
    href: 'mailto:daniel@heene.io',
    icon: <Icon className='mr-3' icon='feather:mail' />,
    text: 'Hire Me!',
  },
  {
    type: NavigationItemType.LINK,
    external: true,
    href: 'https://de.linkedin.com/in/danielheene',
    icon: <Icon className='mr-3' icon='simple-icons:linkedin' />,
    text: 'LinkedIn',
  },
];

interface Props {
  hireMe: boolean;
}

export default function HomePage({ hireMe }: Props) {
  const today = new Date();
  const birthday = new Date('1988-04-17');
  const age = differenceInYears(today, birthday);

  return (
    <Layout.Default>
      <div className='min-h-screen flex items-center justify-center py-12'>
        <div className='max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full space-y-8 text-center'>
          {/*<Transition duration={1000}>*/}
          <h1 className='text-white text-5xl sm:text-6xl md:text-6xl lg:text-8xl tracking-tight font-extrabold'>
            Hey <Wave>👋</Wave> I'm Daniel, <br className='hidden sm:block' />a{' '}
            <Pill.Standard className='mt-4'>developer</Pill.Standard>
          </h1>
          {/*</Transition>*/}
          {/*<Transition delay={500} duration={1000}>*/}
          <p className='max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-300 sm:text-lg md:text-xl md:max-w-3xl font-semibold'>
            I am a {age} year old javascript engineer & modular synthesizer
            enthusiast.
          </p>
          {/*</Transition>*/}

          <div className='flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full mt-8 sm:mt-4'>
            {ACTIONS.map((action, index) => {
              if (action.type !== NavigationItemType.LINK) return null;

              return (
                // <Transition
                //   delay={1000 + index * 100}
                //   key={index}
                //   duration={1000}
                // >
                <Button.Outline
                  key={index}
                  href={action.href}
                  external={action.external}
                >
                  {action.icon}
                  <span className='my-0 py-1'>{action.text}</span>
                </Button.Outline>
                // </Transition>
              );
            })}
          </div>
        </div>
        {hireMe && <HireMeMemoji />}
      </div>
    </Layout.Default>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://api.github.com/repos/danielheene/danielheene/topics',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  const { names: topics } = await response.json();

  return {
    props: {
      hireMe: topics.includes('hire-me'),
    },
    revalidate: 60 * 60 * 24,
  };
};
