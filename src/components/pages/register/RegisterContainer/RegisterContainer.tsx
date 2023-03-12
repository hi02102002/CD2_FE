import { useState } from 'react';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Typography,
    styled,
} from '@mui/material';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import authService from '@/services/auth.service';
import { pxToRem } from '@/utils/pxToRem';

interface IFormInputs {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


  

const SignupSChema=yup.object().shape({
        fullname:yup.string().required().min(6),
        email:yup.string().required().email(),
        password:yup.string()
        .required()
        .min(8)
        .matches(/\d+/, "password must be at least one number" )
        .matches(/[a-z]+/,"password must be at least one lowercase character" )
        .matches(/[A-Z]+/,"password must be at least one uppercase character" )
        .matches(/[!@#$%^&*()-+]+/,  "password must be at least one Special character" )
        // .matches(/ ![a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,  "Mật khdsadsẩu cần ít nhất 1 kí tự đặc biệt" )
  .test(
    "Password must not contain spaces",
    "Password must not contain spaces" ,
    value => !/\s+/.test(value)
  ),
        confirmpassword:yup.string().required().oneOf([yup.ref('password')], 'Re-entered password is incorrect'),
    })

function RegisterContainer() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: yupResolver(SignupSChema) });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data: IFormInputs) => {
        try {
            setIsLoading(true);
            await authService.register({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });
            setIsLoading(false);
            toast.success('Register successfully!');
            router.push(ROUTES.LOGIN);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('Something went wrong. Try again');
            }
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledRegisterContainer>
                <Box className="PersonalInfo">
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: '600',
                            mb: pxToRem(15),
                            lineHeight: pxToRem(42),
                            color: '#000',
                        }}
                    >
                        Personal Information
                    </Typography>
                    <Box component="div">
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            render={({
                                field: { onChange, value, name, onBlur },
                            }) => (
                                <Input
                                    label="Full Name"
                                    onChange={onChange}
                                    value={value}
                                    messageError={errors.fullName?.message}
                                    isError={errors.fullName !== undefined}
                                    required
                                    sx={{ mb: '12px' }}
                                    name={name}
                                    onBlur={onBlur}
                                />
                            )}
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            sx={{ mb: pxToRem(20), display: 'block' }}
                            label="Sign Up for Newsletter"
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            sx={{ mb: pxToRem(20) }}
                            label="Allow remote shopping assistance"
                        />
                    </Box>
                </Box>

                <Box className="SignInInfo">
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: '600',
                            mb: pxToRem(15),
                            lineHeight: pxToRem(42),
                            color: '#000',
                        }}
                    >
                        Sign-in Information
                    </Typography>
                    <Box component="div">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({
                                field: { onChange, value, name, onBlur },
                            }) => (
                                <Input
                                    label="Email"
                                    onChange={onChange}
                                    value={value}
                                    messageError={errors.email?.message}
                                    isError={errors.email !== undefined}
                                    required
                                    sx={{ mb: '12px' }}
                                    name={name}
                                    onBlur={onBlur}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({
                                field: { onChange, value, name, onBlur },
                            }) => (
                                <Input
                                    label="Password"
                                    onChange={onChange}
                                    value={value}
                                    type={showPassword ? 'text' : 'password'}
                                    messageError={errors.password?.message}
                                    isError={errors.password != undefined}
                                    required
                                    sx={{ mb: '12px' }}
                                    name={name}
                                    onBlur={onBlur}
                                />
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({
                                field: { onChange, value, name, onBlur },
                            }) => (
                                <Input
                                    label="Confirm Password"
                                    onChange={onChange}
                                    value={value}
                                    type={showPassword ? 'text' : 'password'}
                                    messageError={
                                        errors.confirmPassword?.message
                                    }
                                    isError={
                                        errors.confirmPassword !== undefined
                                    }
                                    name={name}
                                    onBlur={onBlur}
                                    required
                                    sx={{ mb: '12px' }}
                                />
                            )}
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            sx={{ mb: `${pxToRem(20)}` }}
                            label="Show Password"
                            onChange={handleTogglePassword}
                        />

                        <Button
                            typeButton="primary"
                            className="btn-create"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Create an Account
                        </Button>
                    </Box>
                </Box>
            </StyledRegisterContainer>
        </form>
    );
}

const StyledRegisterContainer = styled('div')`
    max-width: 60rem;
    margin: auto;
    display: flex;

    @media ${DEVICE.mobileS} {
        margin: ${pxToRem(15)};
        /* justify-content: center; */
        flex-direction: column;
    }

    @media ${DEVICE.tablet} {
        margin: ${pxToRem(20)};
        /* justify-content: center; */
        flex-direction: row;
    }

    @media ${DEVICE.laptop} {
        margin: auto;
        /* justify-content: center; */
        flex-direction: row;
    }

    @media ${DEVICE.tablet} {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .PersonalInfo {
        padding: ${pxToRem(0)} ${pxToRem(30)} ${pxToRem(0)} ${pxToRem(0)};
        margin-bottom: ${pxToRem(30)};
        flex: 1;
        @media ${DEVICE.mobileS} {
            padding: 0;
            width: 100%;
        }

        @media ${DEVICE.tablet} {
            padding-right: ${pxToRem(30)};
            /* width: 100%; */
        }
    }

    .SignInInfo {
        padding: ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(30)};
        flex: 1;
        @media ${DEVICE.mobileS} {
            padding: 0;
        }

        @media ${DEVICE.tablet} {
            padding-left: ${pxToRem(30)};
            /* width: 100%; */
        }

        .btn-create {
            width: 100%;
            @media ${DEVICE.mobileS} {
                padding-left: ${pxToRem(2)};
                padding-right: ${pxToRem(2)};
                margin: auto;
            }
            @media ${DEVICE.mobileM} {
                padding-left: ${pxToRem(4)};
                padding-right: ${pxToRem(4)};
                margin: auto;
            }

            @media ${DEVICE.tablet} {
                padding-left: ${pxToRem(10.5)};
                padding-right: ${pxToRem(16)};
                margin: 0;
                width: 60%;
            }
        }
    }
`;

export default RegisterContainer;
