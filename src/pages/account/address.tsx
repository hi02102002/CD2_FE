import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    Box,
    CircularProgress,
    Dialog,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import {
    Button,
    LoadingFullPage,
    ModalBody,
    ModalFooter,
    ModalHeader,
    PageTop,
} from '@/components/common';
import { Address, AddressForm } from '@/components/pages/account';
import { ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import useAddressStore from '@/store/address';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';
import { withProtect } from '@/utils/withProtect';

const schema = yup.object({
    province: yup.string().required('Province is required'),
    district: yup.string().required('District is required'),
    ward: yup.string().required('Ward is required'),
    addressDetail: yup.string().required('Address detail is required'),
    isDefault: yup.boolean(),
});

type FormValues = yup.InferType<typeof schema>;

const AddressBook: NextPageWithLayout = () => {
    const {
        onClose: onCloseForm,
        isOpen: isOpenForm,
        onOpen: onOpenForm,
    } = useDisclosure();
    const form = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const { addresses, fetchAddress, ...addressStore } = useAddressStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const handelAddAddress = async (fields: FormValues) => {
        try {
            setIsLoadingAdd(true);
            await addressStore.handelAddAddress({
                ...fields,
                isDefault: fields.isDefault || false,
            });
            form.reset();
            onCloseForm();
            setIsLoadingAdd(false);
            toast.success('Add address successfully');
        } catch (error) {
            setIsLoadingAdd(false);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                await fetchAddress();
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isOpenForm) {
            form.reset();
        }
    }, [form, isOpenForm]);

    return (
        <>
            <FormProvider {...form}>
                <StyledAddressBook>
                    <Stack gap={16}>
                        <Typography variant="h3">
                            Address Information
                        </Typography>
                        <Stack gap={16}>
                            <Alert severity="info">
                                The following addresses will be used on the
                                checkout
                            </Alert>
                            {isLoading ? (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    padding={24}
                                >
                                    <CircularProgress size={24} />
                                </Box>
                            ) : (
                                <>
                                    {addresses.length > 0 && (
                                        <Stack gap={16}>
                                            {addresses.map((address) => {
                                                return (
                                                    <Address
                                                        address={address}
                                                        key={address.id}
                                                    />
                                                );
                                            })}
                                        </Stack>
                                    )}
                                    {isOpenForm && (
                                        <Dialog
                                            open={isOpenForm}
                                            onClose={onCloseForm}
                                            scroll="body"
                                            fullWidth
                                        >
                                            <form
                                                onSubmit={form.handleSubmit(
                                                    handelAddAddress,
                                                )}
                                            >
                                                <ModalHeader
                                                    title="Add address"
                                                    onClose={onCloseForm}
                                                />
                                                <ModalBody>
                                                    <AddressForm />
                                                </ModalBody>
                                                <ModalFooter
                                                    textOk="Add address"
                                                    textCancel="Cancel"
                                                    onCancel={onCloseForm}
                                                    btnOkProps={{
                                                        type: 'submit',
                                                        isLoading: isLoadingAdd,
                                                    }}
                                                />
                                            </form>
                                        </Dialog>
                                    )}
                                    {!isOpenForm && (
                                        <Button
                                            sx={{
                                                alignSelf: 'flex-end',
                                            }}
                                            onClick={onOpenForm}
                                        >
                                            Add more address
                                        </Button>
                                    )}
                                </>
                            )}
                        </Stack>
                    </Stack>
                </StyledAddressBook>
            </FormProvider>
            {isLoadingAdd && <LoadingFullPage />}
        </>
    );
};

const StyledAddressBook = styled(Box)`
    padding: ${pxToRem(16)};
    border: 1px solid ${(p) => p.theme.themeColor.border};
    width: 100%;
    border-radius: 4px;
`;

AddressBook.getLayout = (page) => {
    return (
        <ClientLayout title="Address" description="Address">
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
                        name: 'Address',
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

export default AddressBook;
