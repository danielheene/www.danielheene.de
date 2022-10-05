import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { Icon } from '@iconify/react';
// import { Menu } from '@headlessui/react';

// import { Transition } from '@components/index';
import type { NavigationItems } from '@typings/navigation';
// import { NavigationItemType } from '@typings/navigation';
import clsx from 'clsx';

type Position = 'top-left' | 'top-right';

interface StandardProps {
  items: NavigationItems;
  position: Position;
  children: ReactNode;
}

interface MenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active: boolean;
}

interface MenuButtonIconProps {
  icon: string | ReactNode;
  direction?: 'left' | 'right';
  className?: string;
}

interface StyledMenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  children: ReactNode | ReactNode[];
}

const StyledMenuItem = forwardRef<HTMLAnchorElement, StyledMenuItemProps>(
  ({ active, className, children, ...rest }, ref) => (
    <a
      ref={ref}
      className={clsx(
        'flex',
        'items-center',
        'px-4',
        'py-3',
        'text-sm',
        'font-medium',
        'tracking-wide',
        'cursor-pointer',
        'transition ease-in-out duration-300',
        active && 'bg-gray-700 bg-opacity-50 text-white',
        !active && 'text-gray-300 hover:text-white',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
);

const MenuItemSpacer = () => <span className='flex-1' />;

function MenuButtonIcon({
  className,
  icon,
  direction: type = 'left',
}: MenuButtonIconProps) {
  if (typeof icon !== 'string') return null;

  const isRight = type === 'right';
  return (
    <Icon
      className={clsx(
        isRight && 'w-4 h-4 ml-3',
        !isRight && 'w-5 h-5 mr-3',
        className
      )}
      icon={icon}
      aria-hidden='true'
    />
  );
}

/**
 * Menu Link
 *
 * @see https://headlessui.dev/react/menu#integrating-with-next-js
 */
const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  (
    { children, href, onClick = () => undefined, ...rest },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <Link href={href}>
        <StyledMenuItem
          ref={ref}
          className='relative inline-block text-left'
          onClick={onClick}
          {...rest}
        >
          {children}
        </StyledMenuItem>
      </Link>
    );
  }
);

export const Dropdown = React.forwardRef(function Dropdown(
  { children, items, position }: StandardProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <>
      {/*<Menu as='div' className='relative inline-block text-left'>*/}
      {/*  {({ open }) => (*/}
      {/*    <>*/}
      {/*      <Menu.Button as={Fragment}>{children}</Menu.Button>*/}
      {/*      <Transition show={open}>*/}
      {/*        <Menu.Items*/}
      {/*          className={clsx(*/}
      {/*            'absolute',*/}
      {/*            'sm:w-56',*/}
      {/*            'mt-2',*/}
      {/*            'bg-gray-900',*/}
      {/*            'bg-opacity-75',*/}
      {/*            'backdrop-filter',*/}
      {/*            'backdrop-blur-sm',*/}
      {/*            'border',*/}
      {/*            'border-gray-500',*/}
      {/*            'rounded-md',*/}
      {/*            'shadow-lg',*/}
      {/*            'divide-y',*/}
      {/*            'divide-gray-500',*/}
      {/*            'focus:outline-none',*/}
      {/*            position === 'top-left' && ['origin-top-left', 'left-0'],*/}
      {/*            position === 'top-right' && ['origin-top-right', 'right-0']*/}
      {/*          )}*/}
      {/*        >*/}
      {/*          {items.map((section, index) => (*/}
      {/*            <div className='py-2' key={index}>*/}
      {/*              {section.map((item) => (*/}
      {/*                <Menu.Item key={item.text}>*/}
      {/*                  {({ active }) => {*/}
      {/*                    switch (item.type) {*/}
      {/*                      case NavigationItemType.ACTION:*/}
      {/*                        return (*/}
      {/*                          <StyledMenuItem*/}
      {/*                            active={active}*/}
      {/*                            className='group'*/}
      {/*                            onClick={item.onClick}*/}
      {/*                          >*/}
      {/*                            <MenuButtonIcon icon={item.icon} />*/}
      {/*                            {item.text}*/}
      {/*                            {item.endIcon && (*/}
      {/*                              <>*/}
      {/*                                <MenuItemSpacer />*/}
      {/*                                <MenuButtonIcon*/}
      {/*                                  direction='right'*/}
      {/*                                  icon={item.endIcon}*/}
      {/*                                />*/}
      {/*                              </>*/}
      {/*                            )}*/}
      {/*                          </StyledMenuItem>*/}
      {/*                        );*/}
      {/*                      case NavigationItemType.LINK:*/}
      {/*                        const external = item.external ?? false;*/}
      {/*                        if (external)*/}
      {/*                          return (*/}
      {/*                            <StyledMenuItem*/}
      {/*                              className='group'*/}
      {/*                              active={active}*/}
      {/*                              href={item.href}*/}
      {/*                              rel='noopener noreferrer'*/}
      {/*                              target='_blank'*/}
      {/*                            >*/}
      {/*                              <MenuButtonIcon icon={item.icon} />*/}
      {/*                              {item.text}*/}
      {/*                              <MenuItemSpacer />*/}
      {/*                              <MenuButtonIcon*/}
      {/*                                direction='right'*/}
      {/*                                icon='feather:external-link'*/}
      {/*                              />*/}
      {/*                            </StyledMenuItem>*/}
      {/*                          );*/}

      {/*                        return (*/}
      {/*                          <MenuLink active={active} href={item.href}>*/}
      {/*                            <MenuButtonIcon icon={item.icon} />*/}
      {/*                            {item.text}*/}
      {/*                          </MenuLink>*/}
      {/*                        );*/}
      {/*                    }*/}
      {/*                  }}*/}
      {/*                </Menu.Item>*/}
      {/*              ))}*/}
      {/*            </div>*/}
      {/*          ))}*/}
      {/*        </Menu.Items>*/}
      {/*      </Transition>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</Menu>*/}
    </>
  );
});
