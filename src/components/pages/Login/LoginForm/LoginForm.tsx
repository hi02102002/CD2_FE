import { useState } from 'react';

import Link from 'next/link';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, TextHover } from '@/components/common';
import { ROUTES } from '@/constants';
import authService from '@/services/auth.service';
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
    } = useForm<IFormInputs>({ resolver: yupResolver(SignupSChema) });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: IFormInputs) => {
        const res = await authService.login(data.email, data.password);
        console.log(res);
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
                <Typography sx={{ color: '#e22b2e', fontSize: pxToRem(12) }}>
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
