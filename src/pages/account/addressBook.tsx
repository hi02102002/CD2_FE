import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, PageTop, Select } from '@/components/common';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

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

const AddressBook: NextPageWithLayout = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: yupResolver(saveAddress) });

    const onSubmit = (data: IFormInputs) => {
        console.log(data);
    };

    return (
        <StyledAddressBook>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack rowGap={30}>
                    <Box className="contactInformation">
                        <StyledTitle variant="h5">
                            Contact Information
                        </StyledTitle>
                        <Stack rowGap={12}>
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
                                    />
                                )}
                            />
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
                                    />
                                )}
                            />
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
                                    />
                                )}
                            />
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
                                    />
                                )}
                            />
                        </Stack>
                    </Box>
                    <Box className="address">
                        <StyledTitle variant="h5">Address</StyledTitle>
                        <Stack rowGap={12} component="div">
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
                                    />
                                )}
                            />

                            <Box sx={{ margin: '20px 0' }}>
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 16,
                                    }}
                                >
                                    Country
                                </Typography>
                                {/* <FormControl fullWidth>
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
                                </FormControl> */}
                            </Box>

                            {/* <Box sx={{ margin: '20px 0' }}>
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
                            </Box> */}
                            <Select label="Hoang huy" />

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
                                    />
                                )}
                            />

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
                                    />
                                )}
                            />
                        </Stack>
                        <Button
                            typeButton="primary"
                            className="btn-save"
                            type="submit"
                            sx={{ marginTop: 30 }}
                        >
                            Save Address
                        </Button>
                    </Box>
                </Stack>
            </form>
        </StyledAddressBook>
    );
};

const StyledAddressBook = styled(Box)`
    padding: ${pxToRem(30)};
    border: 1px solid ${(p) => p.theme.themeColor.border};
    width: 100%;
`;

const StyledTitle = styled(Typography)`
    margin-bottom: ${pxToRem(15)};
    font-size: ${pxToRem(20)};
    color: ${(p) => p.theme.themeColor.primary};
`;

AddressBook.getLayout = (page) => {
    return (
        <ClientLayout
            title='Address Book'
            description='Address Book'
        >
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

export default AddressBook;

