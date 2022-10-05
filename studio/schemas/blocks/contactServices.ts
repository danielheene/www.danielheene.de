import { defineType } from 'sanity';
import { COL_FIELDSETS } from '../_constants';
import ContactServicesInput from '../../components/ContactServicesInput';

export default defineType({
  name: 'contactServices',
  title: 'Contact Services',
  type: 'object',
  components: {
    input: ContactServicesInput,
  },
  fieldsets: [...COL_FIELDSETS],
  initialValue: () => ({
    github: '',
    whatsapp: '',
    instagram: '',
    discord: '',
    mail: '',
    phone: '',
    linkedin: '',
    xing: '',
  }),
  fields: [
    {
      name: 'github',
      type: 'string',
    },
    {
      name: 'whatsapp',
      type: 'string',
    },
    {
      name: 'instagram',
      type: 'string',
    },
    {
      name: 'discord',
      type: 'string',
    },
    {
      name: 'mail',
      type: 'string',
    },
    {
      name: 'phone',
      type: 'string',
    },
    {
      name: 'linkedin',
      type: 'string',
    },
    {
      name: 'xing',
      type: 'string',
    },
  ],
});
