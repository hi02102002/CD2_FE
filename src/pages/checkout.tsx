import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Dialog,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { getCookies, setCookie } from 'cookies-next';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { CartItem } from '@/components/client';
import {
    Button,
    Input,
    Label,
    LoadingFullPage,
    MenuItem,
    ModalBody,
    ModalHeader,
    PageTop,
    Select,
    TextLink,
} from '@/components/common';
import { ROUTES, phoneRegex } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOverflowHidden } from '@/hooks/useOverflowHidden';
import { ClientLayout } from '@/layouts/client';
import axiosServer from '@/lib/axiosServer';
import orderService from '@/services/order.service';
import paymentService from '@/services/payment.service';
import useAuthStore from '@/store/auth';
import useCartStore from '@/store/cart';
import { TAddress } from '@/types/address';
import { MethodPayment } from '@/types/order';
import { NextPageWithLayout } from '@/types/shared';
import { formatCurrency } from '@/utils/formatCurrency';
import { pxToRem } from '@/utils/pxToRem';
import { withProtect } from '@/utils/withProtect';

type Props = {
    addresses: TAddress[];
    methodsPayment: MethodPayment[];
};

const schema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    fullName: yup.string().required('Full name is required'),
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(phoneRegex, {
            message: 'Phone number is invalid',
        }),
    addressId: yup.string().required('Address is required'),
    paymentId: yup.number().required('Method payment is required'),
});

type FormValues = yup.InferType<typeof schema>;

const CreateOrder: NextPageWithLayout<Props> = ({
    addresses,
    methodsPayment,
}) => {
    const { userCart, totalPrice, clearCartClient } = useCartStore();
    const { user } = useAuthStore();
    const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user?.email || '',
            fullName: user?.fullName || '',
            phoneNumber: user?.phoneNumber || '',
            paymentId: methodsPayment[0].paymentId,
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [address, setAddress] = useState<TAddress | null>(
        addresses.find((a) => a.isDefault) || null,
    );
    const {
        isOpen: isOpenSelectBank,
        onClose: onCloseSelectBank,
        onOpen: onOpenSelectBank,
    } = useDisclosure();
    const [bank, setBank] = useState<string | null>(null);

    const handelCreateOrder = async (data: FormValues) => {
        if (!userCart?.cartItems.length) {
            return;
        }
        const { paymentId } = data;
        const methodPayment = methodsPayment.find(
            (m) => m.paymentId === paymentId,
        );

        if (methodPayment?.paymentCode === 'VNPAY') {
            onOpenSelectBank();
            return;
        }

        try {
            setIsLoading(true);

            const { data: orderId } = await orderService.checkout({
                ...data,
                cartItemIds:
                    userCart?.cartItems.map((item) => item.cartItemId) || [],
                addressId: Number(data.addressId),
            });
            clearCartClient();
            toast.success('Checkout successfully');
            setIsLoading(false);
            reset();
            router.push(`${ROUTES.ORDER_SUCCESS}?orderId=${orderId}`);
            setCookie('order_success', true);
        } catch (error) {
            toast.error('Checkout failed');
            setIsLoading(false);
        }
    };

    const handelCheckoutWithVnpay = async (data: FormValues) => {
        try {
            setIsLoading(true);

            const { data: orderId } = await orderService.checkout({
                ...data,
                cartItemIds:
                    userCart?.cartItems.map((item) => item.cartItemId) || [],
                addressId: Number(data.addressId),
            });

            const { data: vnpayUrl } = await paymentService.createPayment(
                orderId,
                {
                    bankCode: bank as string,
                    amount: totalPrice + 5,
                    description: 'Thanh toán đơn hàng',
                },
            );

            clearCartClient();

            router.push(vnpayUrl);
        } catch (error) {
            toast.error('Checkout failed');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (address) {
            setValue('addressId', address.id.toString());
        }
    }, [address, setValue]);

    useOverflowHidden(isLoading);

    return (
        <>
            <Box component="div" className="container-app">
                <form onSubmit={handleSubmit(handelCreateOrder)}>
                    <Grid container spacing={32}>
                        <Grid item xs={12} md={6}>
                            <StyledTitle variant="h4">
                                Shipping Address
                            </StyledTitle>
                            <Stack spacing={16}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <Input
                                                label="Email address"
                                                required
                                                placeholder="Email address"
                                                isError={
                                                    !!fieldState.error?.message
                                                }
                                                messageError={
                                                    fieldState.error?.message
                                                }
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <Input
                                                label="Full name"
                                                required
                                                placeholder="Full name"
                                                isError={
                                                    !!fieldState.error?.message
                                                }
                                                messageError={
                                                    fieldState.error?.message
                                                }
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <Input
                                                label="Phone Number"
                                                placeholder="Phone number"
                                                required
                                                isError={
                                                    !!fieldState.error?.message
                                                }
                                                messageError={
                                                    fieldState.error?.message
                                                }
                                                {...field}
                                                inputProps={{
                                                    type: 'number',
                                                    maxLength: 10,
                                                }}
                                                type="number"
                                            />
                                        );
                                    }}
                                />
                                <Stack>
                                    <Label>Addresses</Label>
                                    {addresses.length > 0 ? (
                                        <RadioGroup
                                            value={address?.id}
                                            defaultChecked={address?.isDefault}
                                            onChange={(e) => {
                                                const _address = addresses.find(
                                                    (a) =>
                                                        a.id ===
                                                        Number(e.target.value),
                                                );
                                                setAddress(
                                                    _address as TAddress,
                                                );
                                            }}
                                        >
                                            {addresses?.map((address) => {
                                                return (
                                                    <FormControlLabel
                                                        key={address.id}
                                                        value={address.id}
                                                        defaultChecked={
                                                            address.isDefault
                                                        }
                                                        control={
                                                            <Radio
                                                                disableRipple
                                                                defaultChecked={
                                                                    address.isDefault
                                                                }
                                                            />
                                                        }
                                                        label={`${address.addressDetail}, ${address.ward}, ${address.district}, ${address.province}`}
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                    ) : (
                                        <TextLink href={ROUTES.ACCOUNT_ADDRESS}>
                                            Add new address
                                        </TextLink>
                                    )}
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid item container xs={12} md={6} spacing={32}>
                            <Grid item xs={12}>
                                <Box>
                                    <StyledTitle variant="h4">
                                        Payment Method
                                    </StyledTitle>
                                    <Controller
                                        control={control}
                                        name="paymentId"
                                        render={({ field, fieldState }) => {
                                            return (
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={
                                                        methodsPayment[0]
                                                            .paymentId
                                                    }
                                                    {...field}
                                                >
                                                    {methodsPayment.map((m) => (
                                                        <StyledFormControlLabel
                                                            value={m.paymentId}
                                                            control={
                                                                <Radio
                                                                    disableRipple
                                                                />
                                                            }
                                                            label={
                                                                m.paymentName
                                                            }
                                                            key={m.paymentId}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            );
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTitle variant="h4">
                                    Order Summary
                                </StyledTitle>
                                <StyledListCart>
                                    {userCart?.cartItems.map((item) => {
                                        return (
                                            <StyledCartItem
                                                key={item.cartItemId}
                                                cartItem={item}
                                            />
                                        );
                                    })}
                                </StyledListCart>
                                <Stack gap={16} paddingY={16}>
                                    <Stack gap={8}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>
                                                Cart subtotal
                                            </Typography>
                                            <Typography>
                                                {formatCurrency(totalPrice)}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>Shipping</Typography>
                                            <Typography>$5</Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>Order total</Typography>
                                            <Typography fontWeight={500}>
                                                {formatCurrency(totalPrice + 5)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Button
                                        type="submit"
                                        disabled={
                                            userCart?.cartItems.length === 0
                                        }
                                        isLoading={isLoading}
                                    >
                                        Place order
                                    </Button>
                                    <Button
                                        typeButton="secondary"
                                        onClick={() => {
                                            router.push(ROUTES.PRODUCTS);
                                        }}
                                    >
                                        Back to shopping
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Dialog
                open={isOpenSelectBank}
                fullWidth
                maxWidth="xs"
                onClose={onCloseSelectBank}
            >
                <ModalHeader title="Choose bank" onClose={onCloseSelectBank} />
                <ModalBody>
                    <Stack gap={16}>
                        <Select
                            sx={{
                                width: '100%',
                            }}
                            SelectProps={{
                                value: bank,
                                onChange: (e) => {
                                    setBank(e.target.value as string);
                                },
                            }}
                        >
                            <MenuItem value="NCB">NCB</MenuItem>
                            <MenuItem value={1} disabled>
                                Vietcombank
                            </MenuItem>
                            <MenuItem value={2} disabled>
                                Vietinbank
                            </MenuItem>
                            <MenuItem value={3} disabled>
                                BIDV
                            </MenuItem>
                            <MenuItem value={4} disabled>
                                Techcombank
                            </MenuItem>
                            <MenuItem value={5} disabled>
                                MB Bank
                            </MenuItem>
                            <MenuItem value={6} disabled>
                                Agribank
                            </MenuItem>
                            <MenuItem value={7} disabled>
                                VP Bank
                            </MenuItem>
                            <MenuItem value={8} disabled>
                                Sacombank
                            </MenuItem>
                            <MenuItem value={9} disabled>
                                ACB
                            </MenuItem>
                            <MenuItem value={10} disabled>
                                DongA Bank
                            </MenuItem>
                            <MenuItem value={11} disabled>
                                TP Bank
                            </MenuItem>
                            <MenuItem value={12} disabled>
                                HDBank
                            </MenuItem>
                            <MenuItem value={13} disabled>
                                OceanBank
                            </MenuItem>
                            <MenuItem value={15} disabled>
                                VIB
                            </MenuItem>
                        </Select>
                        <form
                            style={{
                                display: 'block',
                            }}
                            onSubmit={handleSubmit(handelCheckoutWithVnpay)}
                        >
                            <Button
                                sx={{
                                    minHeight: 40,
                                    py: 0,
                                    width: '100%',
                                }}
                                disabled={bank === null}
                                type="submit"
                                isLoading={isLoading}
                            >
                                Checkout
                            </Button>
                        </form>
                    </Stack>
                </ModalBody>
            </Dialog>
            {isLoading && <LoadingFullPage />}
        </>
    );
};

CreateOrder.getLayout = (page) => {
    return (
        <ClientLayout title="Checkout" description="Checkout">
            <PageTop
                title="Express Checkout"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.CHECKOUT,
                        name: 'Checkout',
                    },
                ]}
            />
            {page}
        </ClientLayout>
    );
};

const StyledTitle = styled(Typography)`
    margin-bottom: ${pxToRem(18)};
    padding-bottom: ${pxToRem(16)};
    border-bottom: 1px solid ${grey[300]};
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    margin: 0;
    border: 0;
    user-select: none;

    &:not(:last-child) {
        border-bottom: 1px solid ${grey[300]};
    }
`;

const StyledListCart = styled(Box)`
    max-height: ${pxToRem(420)};
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const StyledCartItem = styled(CartItem)`
    &:not(:last-child) {
        padding-bottom: ${pxToRem(16)};
        border-bottom: 1px solid ${grey[300]};
    }

    &:not(:first-child) {
        padding-top: ${pxToRem(16)};
    }

    .img-wrapper {
        max-width: ${pxToRem(75)};
        padding-bottom: 20%;
    }

    .btn-remove {
        display: none;
    }
`;

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})(async (ctx) => {
    const { auth_token } = getCookies({
        req: ctx.req,
        res: ctx.res,
    });

    const addresses = await axiosServer(auth_token as string)
        .get('/api/address')
        .then((res) => res.data.data);

    const methodsPayment = await axiosServer(auth_token as string)
        .get('/api/payment/getAll')
        .then((res) => res.data.data);

    return {
        props: {
            addresses,
            methodsPayment,
        },
    };
});

export default CreateOrder;
