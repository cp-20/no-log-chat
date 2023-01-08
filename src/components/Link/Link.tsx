import NextLink from 'next/link';
import { ComponentProps } from 'react';
import Styles from '@/components/Link/link.module.scss';

export const Link: React.FC<
  ComponentProps<typeof NextLink> & { isExternal?: boolean }
> = ({ className, isExternal, ...props }) => (
  <NextLink
    {...props}
    className={`${className} ${Styles.link}`}
    about={isExternal ? '_blank' : props.about}
    rel={isExternal ? 'noopener noreferrer' : props.rel}
  />
);
