import { Badge, Flex } from '@sanity/ui';
import { SanityPreviewProps, SanityDefaultPreview } from 'sanity/_unstable';
import React from 'react';

interface IsPublishedWrapProps extends Omit<SanityPreviewProps, 'value'> {
  value: {
    location?: boolean;
  };
}

export default function IsPublishedWrap(props: IsPublishedWrapProps) {
  const published = props?.value?.location || false;
  const style = { opacity: published ? 1 : 0.5 };
  return (
    <Flex justify='space-between'>
      <div style={style}>
        <SanityDefaultPreview {...props} />
      </div>
      <Flex align='center' paddingRight={2}>
        <Badge mode='outline' tone={published ? 'positive' : undefined}>
          {published ? 'Published' : 'Hidden'}
        </Badge>
      </Flex>
    </Flex>
  );
}
