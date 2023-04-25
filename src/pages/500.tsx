import { useRouter } from 'next/router';

import { Box, BoxProps, Typography, styled } from '@mui/material';

import { Button } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

const NotFound: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <Styled500 component="div" className="container-app">
            <Typography className="title-500">500</Typography>
            <Typography className="oops">Woops! </Typography>
            <Typography className="error-text">
                Something went wrong!
            </Typography>
            <Button
                className="btn-return"
                onClick={() => {
                    router.push(ROUTES.HOME);
                }}
            >
                Go to Home
            </Button>
        </Styled500>
    );
};

const Styled500 = styled(Box)<BoxProps>`
    min-height: ${({ theme }) => `calc(100vh - ${theme.size.height.header})`};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    .title-500,
    .oops {
        font-size: ${pxToRem(64)};
        font-weight: 500;
        color: ${({ theme }) => theme.themeColor.title};
    }

    .error-text {
        font-size: ${pxToRem(42)};
        @media ${DEVICE.tablet} {
            font-size: ${pxToRem(64)};
        }
    }

    .btn-return {
        margin-top: ${pxToRem(16)};
    }
`;

NotFound.getLayout = (page) => {
    return (
        <ClientLayout
            title="404 - Page not found"
            description="404 - Page not found"
        >
            {page}
        </ClientLayout>
    );
};

export default NotFound;
