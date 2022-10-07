import internalLink from './blocks/internalLink';
import externalLink from './blocks/externalLink';
import blockContent from './blocks/blockContent';
import contactServices from './blocks/contactServices';
import customerCarousel from './blocks/customerCarousel';
import menuSpacer from './blocks/menuSpacer';

import project from './documents/project';
import resume from './documents/resume';

import home from './singletons/home';
import settings from './singletons/settings';

export const schemaTypes = [
  /* blocks */
  internalLink,
  externalLink,
  blockContent,
  contactServices,
  customerCarousel,
  menuSpacer,

  /* documents */
  project,
  resume,

  /* singletons */
  home,
  settings,
];
