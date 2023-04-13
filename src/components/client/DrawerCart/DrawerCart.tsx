import Image from 'next/image';
import { useRouter } from 'next/router';

import {
    Box,
    Drawer,
    DrawerProps,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';

import { Button } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import useCartStore from '@/store/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { pxToRem } from '@/utils/pxToRem';

import { CartItem } from '../CartItem';

type Props = {
    onClose?: () => void;
    isOpen?: boolean;
};

const DrawerCart = ({ isOpen, onClose }: Props) => {
    const router = useRouter();
    const { userCart, totalPrice } = useCartStore();

    const isShowCartItems = userCart && userCart.cartItems.length > 0;

    return (
        <StyledDrawerCart
            ModalProps={{
                keepMounted: false,
            }}
            PaperProps={{
                className: 'paper-wrapper',
            }}
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <StyledHeader>
                <Typography className="title">Shopping Cart</Typography>
                <Box component="div" className="button-close" onClick={onClose}>
                    <IconX />
                </Box>
            </StyledHeader>
            <StyledBody>
                {isShowCartItems ? (
                    <StyledListCart spacing={16}>
                        {userCart.cartItems.map((cartItem, index) => {
                            return <CartItem key={index} cartItem={cartItem} />;
                        })}
                    </StyledListCart>
                ) : (
                    <>
                        <Box component="div" className="image-cart">
                            <Image
                                src="/empty-cart.png"
                                alt="Empty cart"
                                width={240}
                                height={210}
                            />
                        </Box>
                        <Typography
                            sx={{
                                color: (theme) => theme.themeColor.title,
                                fontSize: 18,
                                fontWeight: 600,
                                marginTop: 4,
                                marginBottom: 4,
                                textAlign: 'center',
                            }}
                        >
                            Your cart is empty.
                        </Typography>
                        <Typography textAlign="center">
                            You may check out all the available products and buy
                            some in the shop.
                        </Typography>
                        <Button
                            className="btn-return"
                            typeButton="primary"
                            onClick={onClose}
                        >
                            Return to shop
                        </Button>
                    </>
                )}
            </StyledBody>
            {isShowCartItems && (
                <StyledBottom>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography fontWeight={500}>Total:</Typography>
                        <Typography
                            fontWeight={500}
                            color={(theme) => theme.themeColor.primary}
                        >
                            {formatCurrency(totalPrice || 0)}
                        </Typography>
                    </Stack>
                    <Button
                        typeButton="secondary"
                        onClick={() => {
                            router.push(ROUTES.CART);
                            onClose?.();
                        }}
                    >
                        View Cart
                    </Button>
                    <Button>Proceed to Checkout</Button>
                </StyledBottom>
            )}
        </StyledDrawerCart>
    );
};

const StyledDrawerCart = styled(Drawer)<DrawerProps>`
    .paper-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;

        @media screen and (${DEVICE.mobileM}) {
            width: ${pxToRem(320)};
        }

        @media screen and (${DEVICE.tablet}) {
            width: ${pxToRem(450)};
        }
    }
`;

const StyledHeader = styled(Box)`
    padding: ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(5)} ${pxToRem(24)};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
        font-weight: 600;
        font-size: ${pxToRem(24)};
        color: ${({ theme }) => theme.themeColor.title};
    }

    .button-close {
        cursor: pointer;
    }
`;

const StyledBody = styled(Box)`
    padding: ${pxToRem(10)} ${pxToRem(24)};
    flex: 1;
    overflow-y: auto;

    .image-cart {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-return {
        margin: 0 auto;
        margin-top: ${pxToRem(16)};
    }
`;

const StyledBottom = styled(Box)`
    padding: ${pxToRem(10)} ${pxToRem(24)};
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
`;

const StyledListCart = styled(Stack)``;

export default DrawerCart;
