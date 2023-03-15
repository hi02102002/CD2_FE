import Link from 'next/link';

import {
    Box,
    Breadcrumbs,
    Link as MuiLink,
    Typography,
    styled,
} from '@mui/material';

import { Breadcrumb } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    title?: string;
    breadcrumbItems?: Array<Breadcrumb>;
};

const PageTop = ({ title = 'Title', breadcrumbItems }: Props) => {
    return (
        <StyledPageTop component="div" className="page-top container-app">
            <Typography
                className="title"
                textAlign="center"
                component="h2"
                variant="h2"
                fontWeight={500}
            >
                {title}
            </Typography>
            {breadcrumbItems && (
                <Breadcrumbs>
                    {breadcrumbItems.map((item, index) => {
                        if (index === breadcrumbItems.length - 1) {
                            return (
                                <Typography
                                    key={item.href}
                                    sx={{
                                        fontWeight: 500,
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            );
                        }
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                passHref
                                legacyBehavior
                            >
                                <MuiLink
                                    color="inherit"
                                    sx={{
                                        textDecoration: 'unset',
                                    }}
                                    underline="hover"
                                >
                                    {item.name}
                                </MuiLink>
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            )}
        </StyledPageTop>
    );
};

const StyledPageTop = styled(Box)`
    height: ${pxToRem(150)};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: ${pxToRem(16)};
`;

export default PageTop;
