import { Icon as IconifyIcon, IconProps } from '@iconify/react';

export const Icon = (props: IconProps) => (
  <IconifyIcon className='w-4 h-4 my-1' {...props} />
);
