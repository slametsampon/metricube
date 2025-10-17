// src/components/Link.tsx

'use client';

import NextLink, { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type NextLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

const CustomLink = ({ href, ...rest }: NextLinkProps) => {
  const isInternalLink = typeof href === 'string' && href.startsWith('/');

  if (isInternalLink) {
    return <NextLink href={href} {...rest} />;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href as string}
      {...rest}
    />
  );
};

export default CustomLink;
