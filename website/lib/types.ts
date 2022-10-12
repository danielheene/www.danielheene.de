export type QualificationItemData = {
  _key: string;
  _type: string;

  title: string;
  employer: string;
  location: string;
  start: string;
  end: string;
  body: string;
};

export type LogoCloudItemData = {
  _type: 'block.logoCloudItem';
  image: {
    published: boolean;
    url: string;
    name: string;
  };
};

export type SectionHeaderData = {
  _type: 'sectionHeader';
  headline?: string;
  preHeadline?: string;
  subHeadline?: string;
};

export type LogoCloudSectionData = {
  readonly _type: 'section.logoCloud';
  sectionHeader: SectionHeaderData;
  entries: LogoCloudItemData[];
};

export type QualificationsSectionData = {
  readonly _type: 'section.qualifications';
  headline: string;
  preHeadline: string;
  subHeadline: string;
  entries: QualificationItemData[];
};

export type SectionData = QualificationsSectionData | LogoCloudSectionData;
