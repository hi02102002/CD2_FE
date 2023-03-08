import { useState } from 'react';

import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
    styled,
} from '@mui/material';

import { Button, Input, PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const ResetPassword: NextPageWithLayout<Props> = () => {
    const [typeInputPassword, setTypeInputPassword] =
        useState<string>('password');

    const handleToggleTypePassword = () => {
        setTypeInputPassword((type) => (type === 'text' ? 'password' : 'text'));
    };

    return (
        <>
            <PageTop
                title="Reset Your Password
                "
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.FORGOT_PASS,
                        name: 'Reset Your Password',
                    },
                ]}
            />
            <Box component="div" className="container-app">
                <StyledResetPassWrapper>
                    <Typography marginBottom={24} textAlign="center">
                        Enter new password to reset your password
                    </Typography>
                    <form>
                        <Stack spacing={16}>
                            <Input
                                label="New password"
                                required
                                placeholder="New password"
                                type={typeInputPassword}
                            />
                            <Input
                                label="Confirm new password"
                                required
                                placeholder="Confirm new password"
                                type={typeInputPassword}
                            />
                            <FormControlLabel
                                sx={{
                                    userSelect: 'none',
                                }}
                                control={
                                    <Checkbox
                                        sx={{
                                            padding: 0,
                                            marginRight: 8,
                                        }}
                                        disableRipple
                                    />
                                }
                                label="Show password"
                                onChange={handleToggleTypePassword}
                            />
                            <Button>Save changes</Button>
                        </Stack>
                    </form>
                </StyledResetPassWrapper>
            </Box>
        </>
    );
};

ResetPassword.getLayout = (page) => <ClientLayout>{page}</ClientLayout>;

export default ResetPassword;

const StyledResetPassWrapper = styled(Box)`
    max-width: ${pxToRem(500)};
    margin: 0 auto;
`;
