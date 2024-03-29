import { useState } from 'react';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
    styled,
} from '@mui/material';
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
});

type FormValues = yup.InferType<typeof schema>;

const ResetPassword: NextPageWithLayout = () => {
    const [typeInputPassword, setTypeInputPassword] =
        useState<string>('password');
    const { handleSubmit, control, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleToggleTypePassword = () => {
        setTypeInputPassword((type) => (type === 'text' ? 'password' : 'text'));
    };

    const handelResetPass = async (data: FormValues) => {
        const token = router.query.token as string;

        try {
            if (!token) {
                toast.error('Token invalid');
                return;
            }
            setIsLoading(true);
            await authService.resetPassword({
                token,
                confirmPassword: data.confirmPassword,
                password: data.password,
            });

            setIsLoading(false);
            toast.success('Reset password successfully');
            router.push(ROUTES.LOGIN);
            reset({
                confirmPassword: '',
                password: '',
            });
        } catch (error: any) {
            setIsLoading(false);
            toast.error(
                error?.response?.data?.message || 'Something went wrong',
            );
        }
    };

    return (
        <Box component="div" className="container-app">
            <StyledResetPassWrapper>
                <Typography marginBottom={24} textAlign="center">
                    Enter new password to reset your password
                </Typography>
                <form onSubmit={handleSubmit(handelResetPass)}>
                    <Stack spacing={16}>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="New password"
                                        required
                                        placeholder="New password"
                                        type={typeInputPassword}
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
                                        type={typeInputPassword}
                                        error={!!fieldState.error?.message}
                                        isError={!!fieldState.error?.message}
                                        messageError={fieldState.error?.message}
                                        {...field}
                                    />
                                );
                            }}
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
                        <Button type="submit" isLoading={isLoading}>
                            Save changes
                        </Button>
                        <Button
                            onClick={() => {
                                router.push(ROUTES.LOGIN);
                            }}
                            typeButton="secondary"
                        >
                            Back to login
                        </Button>
                    </Stack>
                </form>
            </StyledResetPassWrapper>
        </Box>
    );
};

ResetPassword.getLayout = (page) => (
    <ClientLayout
        title="Reset Your Password"
        description="Enter new password to reset your password"
    >
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
        {page}
    </ClientLayout>
);

export default ResetPassword;

const StyledResetPassWrapper = styled(Box)`
    max-width: ${pxToRem(500)};
    margin: 0 auto;
`;
