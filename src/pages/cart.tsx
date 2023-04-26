import { useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Stack, Typography, styled } from '@mui/material';
import { toast } from 'react-hot-toast';

import { Button, LoadingFullPage, PageTop } from '@/components/common';
import { TableCart } from '@/components/pages/cart';
import { DEVICE, FREE_SHIP_PRICE, ROUTES, SHIP_PRICE } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import useCart from '@/store/cart';
import { NextPageWithLayout } from '@/types/shared';
import { formatCurrency } from '@/utils/formatCurrency';
import { pxToRem } from '@/utils/pxToRem';
import { withProtect } from '@/utils/withProtect';

const Cart: NextPageWithLayout = () => {
    const router = useRouter();
    const { clearCart, totalPrice, userCart } = useCart();
    const [isLoadingClear, setIsLoadingClear] = useState<boolean>(false);
    const handleClearCart = async () => {
        try {
            setIsLoadingClear(true);
            await clearCart();
            setIsLoadingClear(false);
            toast.success('Clear cart success');
        } catch (error) {
            console.log(error);
            setIsLoadingClear(false);
            toast.error('Clear cart failed');
        }
    };

    return (
        <>
            {isLoadingClear && <LoadingFullPage />}
            <StyledPageCart>
                <Box component="div" className="container-app">
                    <TableCart />
                    <StyledActions
                        justifyContent="space-between"
                        marginTop={40}
                    >
                        <Button
                            typeButton="secondary"
                            onClick={() => {
                                router.push(ROUTES.PRODUCTS);
                            }}
                        >
                            Continue Shopping
                        </Button>
                        <StyledActions>
                            <Button
                                typeButton="secondary"
                                onClick={handleClearCart}
                            >
                                Clear Shopping Cart
                            </Button>
                        </StyledActions>
                    </StyledActions>
                    <StyledCartInfo>
                        <Stack gap={8}>
                            <Stack
                                direction="row"
                                gap={16}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography>Subtotal</Typography>
                                <Typography>
                                    {formatCurrency(totalPrice)}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                gap={16}
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography>
                                    Shipping (Flat Rate - Fixed)
                                </Typography>
                                <Typography>
                                    {totalPrice >= FREE_SHIP_PRICE
                                        ? 'Freeship'
                                        : formatCurrency(SHIP_PRICE)}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                gap={16}
                                justifyContent="space-between"
                                alignItems="center"
                                fontWeight={500}
                                textTransform="uppercase"
                                color={(theme) => theme.themeColor.primary}
                            >
                                <Typography
                                    color="inherit"
                                    fontWeight="inherit"
                                    fontSize={18}
                                >
                                    ORDER TOTAL
                                </Typography>
                                <Typography
                                    color="inherit"
                                    fontWeight="inherit"
                                    fontSize={18}
                                >
                                    {formatCurrency(
                                        totalPrice +
                                            (totalPrice >= FREE_SHIP_PRICE
                                                ? 0
                                                : SHIP_PRICE),
                                    )}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Button
                            className="btn-checkout"
                            onClick={() => {
                                router.push(ROUTES.CHECKOUT);
                            }}
                            disabled={userCart?.cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </Button>
                    </StyledCartInfo>
                </Box>
            </StyledPageCart>
        </>
    );
};

Cart.getLayout = (page) => {
    return (
        <ClientLayout title="Cart" description="">
            <PageTop
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.CART,
                        name: 'Cart',
                    },
                ]}
                title="Shopping Cart"
            />
            {page}
        </ClientLayout>
    );
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})();

export default Cart;

const StyledPageCart = styled(Box)`
    margin-top: ${pxToRem(20)};

    @media screen and (${DEVICE.tablet}) {
        margin-top: ${pxToRem(40)};
    }
`;

const StyledActions = styled(Stack)`
    flex-direction: column;
    gap: ${pxToRem(16)};

    @media screen and (${DEVICE.tablet}) {
        flex-direction: row;
    }
`;

const StyledCartInfo = styled(Box)`
    margin-top: ${pxToRem(40)};
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};

    @media screen and (${DEVICE.tablet}) {
        .discount-wrapper {
            max-width: ${pxToRem(500)};
        }

        .btn-discount {
            align-self: flex-start;
        }

        .btn-checkout {
            align-self: flex-end;
        }
    }
`;
