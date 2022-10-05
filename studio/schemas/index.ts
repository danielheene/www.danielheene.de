import internalLink from './blocks/internalLink';
import externalLink from './blocks/externalLink';
import blockContent from './blocks/blockContent';
import contactServices from './blocks/contactServices';

import project from './documents/project';
import resume from './documents/resume';

import settings from './singletons/settings';

export const schemaTypes = [
  /* blocks */
  internalLink,
  externalLink,
  blockContent,
  contactServices,

  /* documents */
  project,
  resume,

  /* singletons */
  settings,
];
