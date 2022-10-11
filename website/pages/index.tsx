import React from 'react';
import { differenceInYears } from 'date-fns';
import { GetStaticProps } from 'next';
import traverse from 'traverse';

import { Pill } from '@components/Pill';
import { Layout } from '@layouts/index';
import { Wave } from '@components/Wave';
import Sanity from '@lib/sanity';
import { groq } from 'next-sanity';
import { QualificationsSection } from '@components/QualificationsSection';
import { LogoCloudSection } from '@components/LogoCloudSection';
import {
  LogoCloudSectionData,
  QualificationsSectionData,
} from '@typings/sections';

interface Data {
  qualifications: QualificationsSectionData;
  logoCloud: LogoCloudSectionData;
}

interface Settings {
  readonly _id: string;
  readonly _type: string;

  pageTitle: string;
  hireMe: boolean;

  contactServices: {
    [k: string]: string;
  };
}

interface Props extends Data {
  data: Data;
  settings: Settings;
}

export default function HomePage({ data, settings }: Props) {
  const { qualifications, logoCloud } = data;

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

          <div className='flex flex-col sm:flex-row items-center justify-center'>
            {/*{ACTIONS.map((action, index) => {*/}
            {/*  if (action.type !== NavigationItemType.LINK) return null;*/}

            {/*  return (*/}
            {/*    // <Transition*/}
            {/*    //   delay={1000 + index * 100}*/}
            {/*    //   key={index}*/}
            {/*    //   duration={1000}*/}
            {/*    // >*/}
            {/*    <Button.Outline*/}
            {/*      key={index}*/}
            {/*      href={action.href}*/}
            {/*      external={action.external}*/}
            {/*    >*/}
            {/*      {action.icon}*/}
            {/*      <span className='my-0 py-1'>{action.text}</span>*/}
            {/*    </Button.Outline>*/}
            {/*    // </Transition>*/}
            {/*  );*/}
            {/*})}*/}
          </div>
        </div>
        {/*{hireMe && <HireMeMemoji />}*/}
      </div>
      <QualificationsSection {...qualifications} />
      <LogoCloudSection {...logoCloud} />
    </Layout.Default>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const query = groq`
    {
      "data": *[_type == "home"][0],
      "settings": *[_type == "settings" && _id == "settings"][0] {
        ...,
        "publicKey": publicKey.asset->,
        "resume": resume.asset->
      },
    }
  `;
  const sanity = Sanity.getClient(preview);
  const sanityData = await sanity.fetch(query);

  const { data, settings } = traverse(sanityData).forEach(console.log);

  console.log(data, settings);
  return {
    props: {
      data,
      settings,
    },
    revalidate: process.env.NODE_ENV === 'production' ? 300 : 5,
  };
};
