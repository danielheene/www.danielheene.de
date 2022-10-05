// import { Disclosure } from '@headlessui/react';

import { Dropdown } from './Dropdown.component';
import { Icon } from './Icon.component';
import { Button } from '@components/Button';
import { menuItems } from '@lib/index';
import React from 'react';

export function Standard() {
  return (
    <>
      {/*<Disclosure as='nav' className='fixed top-0 left-0 w-full z-10'>*/}
      {/*  <div className='mx-auto px-2'>*/}
      {/*    <div className='relative flex items-center justify-between h-16'>*/}
      {/*      <Dropdown items={menuItems} position='top-left'>*/}
      {/*        <Button.Icon aria-label='Menu'>*/}
      {/*          <Icon icon='feather:menu' />*/}
      {/*        </Button.Icon>*/}
      {/*      </Dropdown>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Disclosure>*/}
    </>
  );
}
