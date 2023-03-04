import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { Link, LinkProps as MuiLinkProps, styled } from '@mui/material';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    MuiLinkProps?: MuiLinkProps;
    children: React.ReactNode;
} & NextLinkProps;

const TextLink = ({ MuiLinkProps, children, ...props }: Props) => {
    return (
        <NextLink {...props} passHref legacyBehavior>
            <StyledLink {...MuiLinkProps}>{children}</StyledLink>
        </NextLink>
    );
};

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.themeColor.primary};
    text-decoration: none;
    font-size: ${pxToRem(16)};
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
        opacity: 0.7;
    }
`;

export default TextLink;
