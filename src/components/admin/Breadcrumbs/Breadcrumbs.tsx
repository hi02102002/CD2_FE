import Link from 'next/link';

import {
    Box,
    BoxProps,
    BreadcrumbsProps,
    Breadcrumbs as MuiBreadcrumbs,
    Link as MuiLink,
    Typography,
} from '@mui/material';
import { common } from '@mui/material/colors';

import { Breadcrumb } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    MuiBreadcrumbsProps?: BreadcrumbsProps;
    breadcrumbs: Array<Breadcrumb>;
} & BoxProps<'div'>;

const Breadcrumbs = ({
    breadcrumbs,
    MuiBreadcrumbsProps,
    className = '',
    component = 'div',
    sx,
    ...rest
}: Props) => {
    return (
        <Box
            component={component}
            className={`breadcrumb ${className}`}
            sx={{
                padding: pxToRem(16),
                borderRadius: pxToRem(3),
                backgroundColor: common.white,
                ...sx,
            }}
            {...rest}
        >
            <MuiBreadcrumbs {...MuiBreadcrumbsProps}>
                {breadcrumbs.map((item, index) => {
                    if (index === breadcrumbs.length - 1) {
                        return (
                            <Typography
                                key={item.href}
                                sx={{
                                    fontWeight: 600,
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
                                underline="hover"
                                sx={{
                                    fontWeight: 500,
                                }}
                            >
                                {item.name}
                            </MuiLink>
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
        </Box>
    );
};

export default Breadcrumbs;
