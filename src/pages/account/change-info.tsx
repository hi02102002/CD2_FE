import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button, Input, MenuItem, PageTop, Select } from '@/components/common';
import { ROUTES, phoneRegex } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import useAuthStore from '@/store/auth';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const schema = yup.object({
    fullName: yup.string().required('Name is required'),
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(phoneRegex, {
            message: 'Phone number is invalid',
        }),
    dateOfBirth: yup.string().required('Date of birth is required'),
    sex: yup.string().required('Sex is required'),
});

type FormValues = yup.InferType<typeof schema>;

const ChangeInfo: NextPageWithLayout = () => {
    const { user, updateInfor } = useAuthStore();
    const { control, handleSubmit, formState } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber || '',
            dateOfBirth: user?.dateOfBirth || '',
            sex: user?.sex || '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const handelChangeInfo = async (data: FormValues) => {
        try {
            setIsLoading(true);
            await updateInfor(data);
            setIsLoading(false);
            toast.success('Change information successfully');
        } catch (error: any) {
            setIsLoading(false);
            toast.error(
                error?.response?.data?.message || 'Change information failed',
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
                <Typography variant="h3">Update information</Typography>
                <form onSubmit={handleSubmit(handelChangeInfo)}>
                    <Stack gap={16}>
                        <Controller
                            control={control}
                            name="fullName"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="Full name"
                                        required
                                        placeholder="Full name"
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
                            name="phoneNumber"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="Number phone"
                                        required
                                        placeholder="Number phone"
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
                            name="dateOfBirth"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        label="Birthday"
                                        required
                                        placeholder="Birthday"
                                        error={!!fieldState.error?.message}
                                        isError={!!fieldState.error?.message}
                                        messageError={fieldState.error?.message}
                                        type="date"
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="sex"
                            render={({ field, fieldState }) => {
                                return (
                                    <Select
                                        label="Sex"
                                        SelectProps={{
                                            ...field,
                                        }}
                                        required
                                        isError={!!fieldState.error?.message}
                                        messageError={fieldState.error?.message}
                                    >
                                        <MenuItem value="Female">
                                            Female
                                        </MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                    </Select>
                                );
                            }}
                        />
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            disabled={!formState.isDirty}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Box>
    );
};

ChangeInfo.getLayout = (page) => (
    <ClientLayout description="Update information" title="Update information">
        <PageTop
            title="Update information"
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
                    href: ROUTES.ACCOUNT_CHANGE_INFO,
                    name: 'Update information',
                },
            ]}
        />
        <AccountLayout>{page}</AccountLayout>
    </ClientLayout>
);

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})();

export default ChangeInfo;
