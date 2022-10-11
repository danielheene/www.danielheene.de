export type Qualification = {
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
