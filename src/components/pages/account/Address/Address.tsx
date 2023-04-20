import { useState } from 'react';

import { Box, Chip, Dialog, Stack, Typography, styled } from '@mui/material';
import { omit } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
    Button,
    LoadingFullPage,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '@/components/common';
import { useDisclosure } from '@/hooks/useDisclosure';
import useAddressStore from '@/store/address';
import useAuthStore from '@/store/auth';
import { TAddress, TAddressInput } from '@/types/address';
import { pxToRem } from '@/utils/pxToRem';

import AddressForm from '../AddressForm/AddressForm';

type AddressProps = {
    address: TAddress;
};

const Address = ({ address }: AddressProps) => {
    const { user } = useAuthStore();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const addressStore = useAddressStore();
    const { handleSubmit, formState } = useFormContext();
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);

    const handelUpdateAddress = async (fields: TAddressInput) => {
        try {
            setIsLoadingUpdate(true);
            await addressStore.handelUpdateAddress(address.id, fields);
            setIsLoadingUpdate(false);
            toast.success('Update address successfully');
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
            setIsLoadingUpdate(false);
        }
    };

    const handelRemoveAddress = async () => {
        try {
            setIsLoadingRemove(true);
            await addressStore.handelRemoveAddress(address.id);
            setIsLoadingRemove(false);
            toast.success('Remove address successfully');
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
            setIsLoadingRemove(false);
        }
    };

    return (
        <>
            {(isLoadingUpdate || isLoadingRemove) && <LoadingFullPage />}
            <StyledAddress onClick={onOpen}>
                <Box flex={1}>
                    <Typography fontWeight={600}>
                        {user?.fullName} | {user?.email}
                    </Typography>
                    <Typography>{address.addressDetail}</Typography>
                    <Stack
                        flexDirection="row"
                        flexWrap="wrap"
                        alignItems="flex-end"
                    >
                        <Typography fontWeight={500}>
                            {address.province},
                        </Typography>
                        <Typography fontWeight={500}>
                            {address.district},
                        </Typography>
                        <Typography fontWeight={500}>{address.ward}</Typography>
                    </Stack>
                </Box>
                {address.isDefault && (
                    <Chip
                        sx={{
                            borderRadius: 1,
                            backgroundColor: (theme) =>
                                theme.themeColor.primary,
                            color: '#fff',
                            flexShrink: 0,
                        }}
                        label="Default"
                    />
                )}
            </StyledAddress>
            {isOpen && (
                <Dialog open={isOpen} onClose={onClose} fullWidth scroll="body">
                    <form
                        onSubmit={handleSubmit((data) =>
                            handelUpdateAddress(data as TAddressInput),
                        )}
                    >
                        <ModalHeader onClose={onClose} title="Update address" />
                        <ModalBody>
                            <Stack gap={16}>
                                <AddressForm
                                    defaultValue={omit(address, 'id')}
                                />
                                <Button
                                    onClick={handelRemoveAddress}
                                    isLoading={isLoadingRemove}
                                >
                                    Remove address
                                </Button>
                            </Stack>
                        </ModalBody>
                        <ModalFooter
                            textCancel="Close"
                            textOk="Save changes"
                            onCancel={onClose}
                            btnOkProps={{
                                type: 'submit',
                                isLoading: isLoadingUpdate,
                                disabled: !formState.isDirty,
                            }}
                        />
                    </form>
                </Dialog>
            )}
        </>
    );
};

const StyledAddress = styled(Stack)`
    padding: ${pxToRem(16)};
    border: 1px solid ${(p) => p.theme.themeColor.border};
    gap: ${pxToRem(16)};
    border-radius: 4px;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
`;

export default Address;
