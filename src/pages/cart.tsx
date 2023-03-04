import { useRouter } from 'next/router';

import { Box, Stack, Typography, styled } from '@mui/material';

import { Button, Input, PageTop } from '@/components/common';
import { TableCart } from '@/components/pages/cart';
import { DEVICE, ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const Cart: NextPageWithLayout = (props: Props) => {
    const router = useRouter();

    return (
        <>
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
                            <Button typeButton="secondary">
                                Clear Shopping Cart
                            </Button>
                            <Button typeButton="secondary">
                                Update Shopping Cart
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
                                <Typography>$105.00</Typography>
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
                                <Typography>$20.00</Typography>
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
                                    $125.00
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack gap={16} className="discount-wrapper">
                            <Box width="100%">
                                <Input
                                    label="Enter discount code"
                                    placeholder="Enter discount code"
                                />
                            </Box>
                            <Button className="btn-discount">
                                Apply discount
                            </Button>
                        </Stack>
                        <Button
                            className="btn-checkout"
                            onClick={() => {
                                router.push(ROUTES.CHECKOUT);
                            }}
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
    return <ClientLayout>{page}</ClientLayout>;
};

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
