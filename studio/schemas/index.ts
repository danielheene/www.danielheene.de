import blockContent from './blocks/blockContent';

import metaDefaults from './objects/meta.defaults';
import contactServices from './objects/object.contactServices';
import externalLink from './objects/object.externalLink';
import internalLink from './objects/object.internalLink';
import navigationItem from './objects/object.navigationItem';
import sectionHeader from './objects/object.sectionHeader';
import sectionLogoCloud from './objects/section.logoCloud';
import sectionQualifications from './objects/section.qualifications';

import project from './documents/document.project';
import navigation from './documents/document.navigation';
import home from './documents/singleton.home';
import settings from './documents/singleton.settings';

export const schemaTypes = [
  /* meta */
  metaDefaults,

  /* blocks */
  blockContent,
  contactServices,
  externalLink,
  internalLink,
  navigationItem,
  sectionHeader,
  sectionLogoCloud,
  sectionQualifications,

  /* documents */
  project,
  navigation,
  home,
  settings,
];
