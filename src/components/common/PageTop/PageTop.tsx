import Link from 'next/link';

import { Box, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';

import { Breadcrumb } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    title?: string;
    breadcrumbItems?: Array<Breadcrumb>;
};

const PageTop = ({ title = 'Title', breadcrumbItems }: Props) => {
    return (
        <Box
            component="div"
            sx={{
                height: pxToRem(150),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: pxToRem(16),
            }}
            className="page-top"
        >
            <Typography className="title" textAlign='center' component="h2" variant="h2">
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
        </Box>
    );
};

export default PageTop;
