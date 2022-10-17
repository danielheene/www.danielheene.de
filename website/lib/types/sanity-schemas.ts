import { ImageAsset } from '@sanity/types/src';

export type QualificationItemData = {
  readonly _type: 'block.qualification';
  readonly _key: string;

  title: string;
  employer: string;
  location: string;
  start: string;
  end: string;
  body: string;
};

export type ServiceItemData = {
  readonly _type: 'block.serviceItem';
  readonly _key: string;

  name: string;
  icon: string;
  body: string;
};

export type LogoCloudItemData = {
  readonly _type: 'block.logoCloudItem';
  readonly _key: string;

  published: boolean;
  name: string;
  image: ImageAsset;
};

export type SectionHeaderData = {
  readonly _type: 'sectionHeader';
  readonly _key: string;

  headline?: string;
  preHeadline?: string;
  subHeadline?: string;
};

export type HeroStageData = {
  headline?: string;
  subHeadline?: string;
  portrait: ImageAsset;
};

export type LogoCloudSectionData = {
  readonly _type: 'section.logoCloud';
  readonly _key: string;

  header: SectionHeaderData;
  entries: LogoCloudItemData[];
};

export type ServicesSectionData = {
  readonly _type: 'section.services';
  readonly _key: string;

  header: SectionHeaderData;
  entries: ServiceItemData[];
};

export type QualificationsSectionData = {
  readonly _type: 'section.qualifications';
  readonly _key: string;

  header: SectionHeaderData;
  entries: QualificationItemData[];
};

export type SectionData = QualificationsSectionData | LogoCloudSectionData;