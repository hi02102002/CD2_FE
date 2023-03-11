import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { PageTop } from '@/components/common';
import { Button } from '@/components/common';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

interface IFormInputs {
    firstName: string;
    lastName: string;
    company?: string;
    phoneNumber: number;
    stress: string;
    city: string;
    postalCode: number;
}

const saveAddress = yup.object().shape({
    firstName: yup
        .string()
        .required('Vui lòng nhập First Name')
        .min(2, 'Tối thiểu 2 kí tự'),
    lastName: yup
        .string()
        .required('Vui lòng nhập Last Name')
        .min(2, 'Tối thiểu 2 kí tự'),

    phoneNumber: yup
        .number()
        .required('Vui lòng nhập Phone Number')
        .min(10, 'Không đúng định dạng Phone Number'),
    stress: yup
        .string()
        .required('Vui lòng nhập Stress')
        .min(2, 'Tối thiểu 2 kí tự'),
    city: yup
        .string()
        .required('Vui lòng nhập City')
        .min(2, 'Tối thiểu 2 kí tự'),

    postalCode: yup
        .number()
        .required('Vui lòng nhập Postal Code')
        .min(4, 'Không đúng định dạng Postal Code'),
});

const addressBook: NextPageWithLayout = (props: Props) => {
    // select---
    const countrys: string[] = ['Viet Nam', 'Canpodia', 'Canada'];
    const [country, setCountry] = React.useState('');

    const states: string[] = ['Alaske', 'Geographi', 'Cityland'];
    const [state, setState] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
        setState(event.target.value as string);
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: yupResolver(saveAddress) });

    const onSubmit = (data: IFormInputs) => {
        console.log(data);
    };

    return (
        <Box
            className="container-app"
            sx={{ padding: 30, marginBottom: 20, border: '1px solid #eee' }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="addressContainer">
                    <Box
                        className="contactInformation"
                        sx={{ marginBottom: 30 }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: '300',
                                mb: pxToRem(15),
                                fontSize: pxToRem(20),
                                color: '#000',
                            }}
                        >
                            Contact Information
                        </Typography>
                        <Box component="div">
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="First Name"
                                        onChange={onChange}
                                        value={value}
                                        messageError={errors.firstName?.message}
                                        isError={errors.firstName != undefined}
                                        required
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Last Name"
                                        onChange={onChange}
                                        value={value}
                                        messageError={errors.lastName?.message}
                                        isError={errors.lastName != undefined}
                                        required
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>
                            <Controller
                                name="company"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Company"
                                        onChange={onChange}
                                        value={value}
                                        messageError={errors.company?.message}
                                        isError={errors.company != undefined}
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Phone Number"
                                        onChange={onChange}
                                        value={value}
                                        messageError={
                                            errors.phoneNumber?.message
                                        }
                                        isError={
                                            errors.phoneNumber != undefined
                                        }
                                        required
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>
                        </Box>
                    </Box>
                    <Box className="address">
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: '300',
                                mb: pxToRem(15),
                                fontSize: pxToRem(20),
                                color: '#000',
                            }}
                        >
                            Address
                        </Typography>
                        <Box component="div">
                            <Controller
                                name="stress"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Stress"
                                        onChange={onChange}
                                        value={value}
                                        messageError={errors.stress?.message}
                                        isError={errors.stress != undefined}
                                        required
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>

                            <Box sx={{ margin: '20px 0' }}>
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 16,
                                    }}
                                >
                                    Country
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={country}
                                        onChange={handleChange}
                                        sx={{ height: 45 }}
                                    >
                                        {countrys.map((country) => (
                                            <MenuItem
                                                key={country}
                                                value={country}
                                            >
                                                {country}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ margin: '20px 0' }}>
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 16,
                                    }}
                                >
                                    State / Province
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={state}
                                        onChange={handleChange}
                                        sx={{ height: 45 }}
                                    >
                                        {states.map((state) => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="City"
                                        onChange={onChange}
                                        value={value}
                                        messageError={errors.city?.message}
                                        isError={errors.city != undefined}
                                        required
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>

                            <Controller
                                name="postalCode"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Zip/ Postal Code"
                                        onChange={onChange}
                                        value={value}
                                        messageError={
                                            errors.postalCode?.message
                                        }
                                        isError={errors.postalCode != undefined}
                                        required
                                        sx={{ mb: '12px' }}
                                    ></Input>
                                )}
                            ></Controller>
                        </Box>
                        <Button
                            typeButton="primary"
                            className="btn-save"
                            type="submit"
                            sx={{ marginTop: 30 }}
                        >
                            Save Address
                        </Button>
                    </Box>
                </div>
            </form>
        </Box>
    );
};

addressBook.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="Address Book"
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
                        href: ROUTES.LOGIN,
                        name: 'Address Book',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default addressBook;
