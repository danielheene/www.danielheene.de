import { LogoCloudItemData, Qualification } from '@typings/blocks';

export type LogoCloudSectionData = {
  readonly _type: 'section.logoCloud';
  headline: string;
  subHeadline: string;
  entries: LogoCloudItemData[];
};

export type QualificationsSectionData = {
  readonly _type: 'section.qualifications';
  headline: string;
  preHeadline: string;
  subHeadline: string;
  entries: Qualification[];
};
