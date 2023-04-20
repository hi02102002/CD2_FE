import { useState } from 'react';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input, PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import authService from '@/services/auth.service';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
});

type FormValues = yup.InferType<typeof schema>;

const ForgotPassword: NextPageWithLayout = () => {
    const router = useRouter();
    const { handleSubmit, control, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handelForgotPass = async (data: FormValues) => {
        try {
            setLoading(true);
            await authService.requestForgotPassword(data.email);
            setLoading(false);
            toast.success('Please check your email to reset password');
            reset({
                email: '',
            });
        } catch (error: any) {
            setLoading(false);
            toast.error(
                error?.response?.data?.message || 'Something went wrong',
            );
        }
    };

    return (
        <>
            <Box component="div" className="container-app">
                <StyledForgotPassWrapper>
                    <Typography marginBottom={24} textAlign="center">
                        Please enter your email address below to receive a
                        password reset link.
                    </Typography>
                    <form onSubmit={handleSubmit(handelForgotPass)}>
                        <Stack spacing={16}>
                            <Controller
                                render={({ field, fieldState }) => {
                                    return (
                                        <Input
                                            label="Email"
                                            required
                                            placeholder="Email"
                                            isError={
                                                !!fieldState.error?.message
                                            }
                                            messageError={
                                                fieldState.error?.message
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                                name="email"
                                control={control}
                            />
                            <Button type="submit" isLoading={loading}>
                                Reset my password
                            </Button>
                            <Button
                                typeButton="secondary"
                                onClick={() => {
                                    router.push(ROUTES.LOGIN);
                                }}
                            >
                                Back to login
                            </Button>
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
        {page}
    </ClientLayout>
);

export default ForgotPassword;

const StyledForgotPassWrapper = styled(Box)`
    max-width: ${pxToRem(500)};
    margin: 0 auto;
`;
