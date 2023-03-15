import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { setCookie } from 'cookies-next';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input, TextHover } from '@/components/common';
import { ROUTES } from '@/constants';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/auth';
import { pxToRem } from '@/utils/pxToRem';

interface IFormInputs {
    email: string;
    password: string;
}

const SignupSChema = yup.object().shape({
    email: yup
        .string()
        .required('Vui lòng nhập email ')
        .email('Vui lòng nhập đúng địa chỉ email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

function LoginFrom() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(SignupSChema),
        defaultValues: { 
            email: 'admin@ut.edu.vn',
            password: '12345678',
        },
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setAuth } = useAuthStore();

    const onSubmit = async (data: IFormInputs) => {
        try {
            setIsLoading(true);
            const res = await authService.login(data.email, data.password);
            setAuth({
                user: {
                    email: res.data.email,
                    id: res.data.id,
                    fullName: res.data.fullName,
                    roles: res.data.roles,
                },
                accessToken: res.data.token,
            });
            setIsLoading(false);
            toast.success('Login successfully!');
            setCookie('auth_token', res.data.token);
            setCookie('roles', res.data.roles);
            router.push(ROUTES.HOME);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <StyledLoginForm component="div">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Email"
                            onChange={onChange}
                            value={value}
                            messageError={errors.email?.message}
                            isError={errors.email != undefined}
                            required
                            sx={{ mb: '12px' }}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value, name, onBlur } }) => (
                        <Input
                            label="Password"
                            onChange={onChange}
                            value={value}
                            messageError={errors.password?.message}
                            isError={errors.password != undefined}
                            required
                            type={showPassword ? 'text' : 'password'}
                            name={name}
                            onBlur={onBlur}
                        />
                    )}
                />

                <FormControlLabel
                    control={<Checkbox />}
                    sx={{ mb: pxToRem(20) }}
                    label="Show Password"
                    onChange={handleTogglePassword}
                />

                <Button
                    typeButton="primary"
                    className="btn-signin"
                    type="submit"
                    isLoading={isLoading}
                >
                    Sign In
                </Button>
            </form>
            <Stack
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                marginTop={16}
            >
                <Typography fontSize={12} color={red[500]}>
                    * Required Fields
                </Typography>
                <Link href={ROUTES.FORGOT_PASS}>
                    <TextHover>Forgot Your Password?</TextHover>
                </Link>
            </Stack>
        </StyledLoginForm>
    );
}

const StyledLoginForm = styled(Box)`
    .btn-signin {
        width: 100%;
    }
`;

export default LoginFrom;
