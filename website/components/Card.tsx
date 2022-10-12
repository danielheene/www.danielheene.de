import { Box } from '@components/Box';
import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useMemo,
} from 'react';
import clsx, { ClassValue } from 'clsx';
import * as React from 'react';
import css from 'styled-jsx/css';
import ReactParallaxTilt from 'react-parallax-tilt';

const { className: rootClassName, styles: rootStyles } = css.resolve`
  .card {
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.25);
    padding: 2rem;
  }

  .card.card-light {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 1);
  }
  .card.card-dark {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 1);
  }
`;

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  className?: ClassValue;
  children?: ReactNode | ReactNode[];
  variant?: 'light' | 'dark';
  container?: boolean;
  tilted?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export const Card = forwardRef(
  (
    {
      className,
      variant = 'dark',
      container = false,
      tilted = false,
      children,
      ...rest
    }: CardProps,
    ref: RefObject<HTMLDivElement>
  ): JSX.Element => {
    const mainComponent = useMemo(
      () => (
        <Box
          {...rest}
          className={clsx(
            rootClassName,
            'card',
            variant === 'light' && 'card-light',
            variant === 'dark' && 'card-dark',
            container && 'container',
            className
          )}
          ref={ref}
        >
          {children}
        </Box>
      ),
      [children, className, variant, container]
    );

    return (
      <>
        {tilted ? (
          <ReactParallaxTilt
            perspective={1400}
            transitionSpeed={600}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            tiltReverse
            glareEnable
            glarePosition='all'
            glareMaxOpacity={0.1}
            glareColor='#987DF7'
            className='rounded-2xl overflow-hidden'
          >
            {mainComponent}
          </ReactParallaxTilt>
        ) : (
          mainComponent
        )}
        {rootStyles}
      </>
    );
  }
);
