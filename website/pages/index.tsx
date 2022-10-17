import React from 'react';
import { GetStaticProps } from 'next';

import { DefaultLayout } from '@layouts/Default.layout';
import Sanity from '@lib/sanity';
import { groq } from 'next-sanity';
import { QualificationsSection } from '@components/QualificationsSection';
import { LogoCloudSection } from '@components/LogoCloudSection';
import {
  HeroStageData,
  LogoCloudSectionData,
  QualificationsSectionData,
  ServicesSectionData,
} from '@lib/types';
import { HeroStage } from '@components/HeroStage';
import { ServicesSection } from '@components/ServicesSection';

interface HomeData {
  introLine: string;
  services: ServicesSectionData;
  qualifications: QualificationsSectionData;
  logoCloud: LogoCloudSectionData;
  heroStage: HeroStageData;
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

interface Props extends HomeData {
  data: HomeData;
  settings: Settings;
}

export default function HomePage({ data, settings }: Props) {
  const { heroStage, qualifications, logoCloud, services } = data;
  // const { hireMe } = settings;

  console.log(data);

  return (
    <DefaultLayout>
      {heroStage && <HeroStage {...heroStage} />}

      <ServicesSection {...services} />
      <QualificationsSection {...qualifications} />
      <LogoCloudSection {...logoCloud} />
      {/*{hireMe && <HireMeMemoji />}*/}
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const query = groq`
    {
      "data": *[_type == "home"][0] {
        ...,
        heroStage {
          ...,
          portrait { ..., ...asset-> },
        },
        services {
          ...
        },
        logoCloud {
          ...,
          entries[published == true] {
            ...,
            image { ..., ...asset-> },
          }
        }
      },
      "navigations": *[_type == "navigation"],
      "settings": *[_type == "settings" && _id == "settings"][0] {
        ...,
        "publicKey": publicKey.asset->,
        "resume": resume.asset->
      },
    }
  `;
  const SanityClient = Sanity.getClient(preview);
  const { data, settings } = await SanityClient.fetch(query);

  // console.log(JSON.stringify(data, null, 2));

  return {
    props: {
      data,
      settings,
    },
    revalidate: process.env.NODE_ENV === 'production' ? 300 : 5,
  };
};
