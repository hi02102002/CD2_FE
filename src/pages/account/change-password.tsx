import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input, PageTop } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import authService from '@/services/auth.service';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const schema = yup.object({
    password: yup
        .string()
        .required('Password is required')
        .min(8)
        .matches(/\d+/, 'password must be at least one number')
        .matches(/[a-z]+/, 'password must be at least one lowercase character')
        .matches(/[A-Z]+/, 'password must be at least one uppercase character')
        .matches(
            /[!@#$%^&*()-+]+/,
            'password must be at least one Special character',
        )
        .test(
            'Password must not contain spaces',
            'Password must not contain spaces',
            (value) => !/\s+/.test(value),
        ),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Re-entered password is incorrect'),
    currentPassword: yup.string().required('Current password is required'),
});

type FormValues = yup.InferType<typeof schema>;

const ChangePassword: NextPageWithLayout = () => {
    const { handleSubmit, control, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const [isLoading, setIsLoading] = useState(false);

    const handelChangePassword = async (data: FormValues) => {
        try {
            setIsLoading(true);
            await authService.changePassword({
                confirmNewPassword: data.confirmPassword,
                newPassword: data.password,
                oldPassword: data.currentPassword,
            });
            setIsLoading(false);
            toast.success('Change password successfully');
            reset({
                currentPassword: '',
                password: '',
                confirmPassword: '',
            });
        } catch (error: any) {
            setIsLoading(false);
            toast.error(
                error?.response?.data?.data || 'Change password failed',
            );
        }
    };

    return (
        <Box
            p={16}
            width="100%"
            border={(theme) => `1px solid ${theme.themeColor.border}`}
        >
            <Stack gap={16}>
                <Typography variant="h3">Change password</Typography>
                <form onSubmit={handleSubmit(handelChangePassword)}>
                    <Stack gap={16}>
                        <Controller
                            control={control}
                            name="currentPassword"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="Current password"
                                        required
                                        placeholder="Current password"
                                        type="password"
                                        error={!!fieldState.error?.message}
                                        isError={!!fieldState.error?.message}
                                        messageError={fieldState.error?.message}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="New password"
                                        required
                                        placeholder="New password"
                                        type="password"
                                        error={!!fieldState.error?.message}
                                        isError={!!fieldState.error?.message}
                                        messageError={fieldState.error?.message}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="Confirm new password"
                                        required
                                        placeholder="Confirm new password"
                                        type="password"
                                        error={!!fieldState.error?.message}
                                        isError={!!fieldState.error?.message}
                                        messageError={fieldState.error?.message}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <StyledButton type="submit" isLoading={isLoading}>
                            Save changes
                        </StyledButton>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
};

const StyledButton = styled(Button)`
    width: 100%;

    @media screen and (${DEVICE.tablet}) {
        align-self: flex-end;
        width: max-content;
    }
`;

ChangePassword.getLayout = (page) => {
    return (
        <ClientLayout title="Change Password" description="Change Password">
            <PageTop
                title="Change Password"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.ACCOUNT,
                        name: 'Account',
                    },
                    {
                        href: ROUTES.CHANGE_PASS,
                        name: 'Change Password',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})();

export default ChangePassword;
