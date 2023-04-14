import { Box, Stack, Typography, styled } from '@mui/material';

import { Button, Input, PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const ForgotPassword: NextPageWithLayout<Props> = () => {
    return (
        <>
            <PageTop
                title="Forgot Your Password?
                "
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.FORGOT_PASS,
                        name: 'Forgot Your Password',
                    },
                ]}
            />
            <Box component="div" className="container-app">
                <StyledForgotPassWrapper>
                    <Typography marginBottom={24} textAlign="center">
                        Please enter your email address below to receive a
                        password reset link.
                    </Typography>
                    <form>
                        <Stack spacing={16}>
                            <Input label="Email" required placeholder="Email" />
                            <Button>Reset My Password</Button>
                        </Stack>
                    </form>
                </StyledForgotPassWrapper>
            </Box>
        </>
    );
};

ForgotPassword.getLayout = (page) => (
    <ClientLayout
        title="Forgot Your Password?"
        description="Please enter your email address below to receive a password reset link."
    >
        {page}
    </ClientLayout>
);

export default ForgotPassword;

const StyledForgotPassWrapper = styled(Box)`
    max-width: ${pxToRem(500)};
    margin: 0 auto;
`;
