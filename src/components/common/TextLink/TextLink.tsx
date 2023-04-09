import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { Link, LinkProps as MuiLinkProps, css, styled } from '@mui/material';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    MuiLinkProps?: MuiLinkProps;
    children: React.ReactNode;
    className?: string;
    limitLine?: number;
} & NextLinkProps;

const TextLink = ({
    MuiLinkProps,
    children,
    className,
    limitLine,
    ...props
}: Props) => {
    return (
        <NextLink {...props} passHref legacyBehavior>
            <StyledLink
                {...MuiLinkProps}
                limitLine={limitLine}
                className={`${MuiLinkProps?.className} ${className}`}
            >
                {children}
            </StyledLink>
        </NextLink>
    );
};

const StyledLink = styled(Link)<MuiLinkProps & { limitLine?: number }>`
    color: ${({ theme }) => theme.themeColor.primary};
    text-decoration: none;
    font-size: ${pxToRem(16)};
    transition: all 0.3s ease;
    font-weight: 500;
    display: inline-block;
    line-height: 1.5;

    &:hover {
        opacity: 0.7;
    }

    ${(p) =>
        p.limitLine
            ? css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: ${p.limitLine}; /* number of lines to show */
                  line-clamp: ${p.limitLine};
                  -webkit-box-orient: vertical;
              `
            : undefined}
`;

export default TextLink;
