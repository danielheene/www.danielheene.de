import React, { Ref, useCallback, useEffect, useState } from 'react';
import { set, unset } from 'sanity/form';
import { ObjectSchemaTypeWithOptions } from 'sanity';
import { Grid, Stack, TextInput, Code, Box } from '@sanity/ui';
import { IconType } from 'react-icons';
import {
  SiGithub as GitHubIcon,
  SiWhatsapp as WhatsAppIcon,
  SiInstagram as InstagramIcon,
  SiDiscord as DiscordIcon,
  SiMaildotru as MailIcon,
  SiPhonepe as PhoneIcon,
  SiLinkedin as LinkedInIcon,
  SiXing as XingIcon,
} from 'react-icons/all';
import { defaults, isEqual } from 'lodash';
import styled from 'styled-components';

type ContactProvider =
  | 'github'
  | 'whatsapp'
  | 'instagram'
  | 'discord'
  | 'mail'
  | 'phone'
  | 'linkedin'
  | 'xing';

type ContactService = {
  name: ContactProvider;
  label: string;
  urlPrefix: string;
  icon: IconType;
};

type ContactData = Record<ContactProvider, string>;

const CONTACT_SERVICES: ContactService[] = [
  {
    name: 'github',
    label: 'GitHub',
    urlPrefix: 'https://github.com/',
    icon: GitHubIcon,
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    urlPrefix: 'https://wa.me/',
    icon: WhatsAppIcon,
  },
  {
    name: 'instagram',
    label: 'Instagram',
    urlPrefix: 'https://www.instagram.com/',
    icon: InstagramIcon,
  },
  {
    name: 'discord',
    label: 'Discord',
    urlPrefix: 'https://discord.com/users/',
    icon: DiscordIcon,
  },
  {
    name: 'mail',
    label: 'Mail',
    urlPrefix: 'mailto:',
    icon: MailIcon,
  },
  {
    name: 'phone',
    label: 'Phone',
    urlPrefix: 'tel:',
    icon: PhoneIcon,
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    urlPrefix: 'https://www.linkedin.com/in/',
    icon: LinkedInIcon,
  },
  {
    name: 'xing',
    label: 'Xing',
    urlPrefix: 'https://www.xing.com/profile/',
    icon: XingIcon,
  },
];

const INITIAL_CONTACT_VALUES: ContactData = {
  github: '',
  whatsapp: '',
  instagram: '',
  discord: '',
  mail: '',
  phone: '',
  linkedin: '',
  xing: '',
};

const INITIAL_LABEL_SIZES: Record<ContactProvider, string | null> = {
  github: null,
  whatsapp: null,
  instagram: null,
  discord: null,
  mail: null,
  phone: null,
  linkedin: null,
  xing: null,
};

const resolveInitialState = (data: Partial<ContactData>): ContactData =>
  Object.fromEntries(
    CONTACT_SERVICES.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    ).map(({ name }: ContactService) => [
      name,
      data[name] || INITIAL_CONTACT_VALUES[name],
    ])
  ) as ContactData;

const ContactServicePrefix = styled(Box)<{
  padding: number | number[];
  labelWidth: string | null;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 !important;
  padding-right: 0.2em;
  z-index: 1;

  pre {
    font-size: 85%;
    padding: 0 !important;
    margin: 0 !important;
    transform: unset !important;
  }

  pre::before,
  pre::after {
    content: unset !important;
  }

  ${({ labelWidth }) =>
    labelWidth ? `& + span input {  padding-left: ${labelWidth} }` : ''}
`;

interface ContactServicesInputProps {
  value: ContactData;
  compareValue?: ContactData;
  schemaType: ObjectSchemaTypeWithOptions;
  onChange: (event: any) => void;
  readOnly: boolean;
  type: {
    title: string;
    fields: {
      name: string;
      type: string;
    }[];
  };
}

export default React.forwardRef(function ContactServicesInput(
  props: ContactServicesInputProps,
  ref: Ref<HTMLInputElement>
) {
  const { value, compareValue, onChange, schemaType } = props;
  const [labelSizes, setLabelSizes] = useState(INITIAL_LABEL_SIZES);
  const [data, setData] = useState<ContactData>(
    resolveInitialState(defaults(compareValue, value, INITIAL_CONTACT_VALUES))
  );

  /**
   *
   */
  const handleChange = useCallback(
    ({
      currentTarget: { dataset, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      const name = dataset.provider as ContactProvider;
      const nextData = { ...data, [name]: value };

      if (!isEqual(compareValue, nextData)) {
        setData(nextData);
      }
    },
    [compareValue, data]
  );

  /**
   *
   */
  useEffect(() => {
    onChange(!isEqual(compareValue, data) ? set(data) : unset());
  }, [data]);

  /**
   *
   */
  const calculateItemWidth = useCallback(
    (ref: HTMLElement | null) => {
      if (!ref) return;
      const name = ref.dataset.provider as ContactProvider;
      const numWidth = ref.getBoundingClientRect().width;
      const width = !!numWidth ? `${numWidth.toFixed(2)}px` : null;

      if (width && labelSizes[name] !== width) {
        setLabelSizes((widths) => ({
          ...widths,
          [name]: width,
        }));
      }
    },
    [labelSizes]
  );

  return (
    <Stack space={2}>
      <Grid columns={[1, 1, 2]} gap={[1, 2, 3, 3]}>
        {schemaType.fields.map(({ name }) => {
          const { icon: Icon, urlPrefix } = CONTACT_SERVICES.find(
            (service) => service.name === name
          ) as ContactService;

          const inputPrefix = urlPrefix
            .replace('https://www.', '')
            .replace('https://', '');

          return (
            <Box
              key={name}
              style={{
                position: 'relative',
              }}
            >
              <ContactServicePrefix
                ref={calculateItemWidth}
                labelWidth={labelSizes[name as ContactProvider]}
                padding={[2, 3, 4]}
                data-provider={name}
              >
                <Code>{inputPrefix}</Code>
              </ContactServicePrefix>
              <TextInput
                ref={ref}
                key={name}
                iconRight={<Icon />}
                placeholder=''
                fontSize={[2]}
                padding={[2, 3, 4]}
                space={4}
                value={data[name as ContactProvider]}
                data-provider={name}
                onChange={handleChange}
              />
            </Box>
          );
        })}
      </Grid>
    </Stack>
  );
});
