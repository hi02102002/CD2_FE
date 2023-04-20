import React, { useState } from 'react';

import Image from 'next/image';

import { Box, BoxProps, Stack, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IconX } from '@tabler/icons-react';

import { InputChangeAmount, TextHover, TextLink } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import useCartStore from '@/store/cart';
import { CartItem as TCartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { getImgUrls } from '@/utils/getImgUrl';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    cartItem: TCartItem;
} & BoxProps;

export const CartItem = React.memo(({ cartItem, ...props }: Props) => {
    const { removeProductFromCart, updateProductQuantity } = useCartStore();
    const [quantity, setQuantity] = useState<number>(cartItem.quantity);

    return (
        <StyledCartItem {...props} className={`${props.className} cart`}>
            <StyledImageWrapper className="img-wrapper">
                <Image
                    src={getImgUrls(cartItem.imageUrl)?.[0]}
                    alt=""
                    style={{
                        objectFit: 'cover',
                    }}
                    fill
                />
            </StyledImageWrapper>
            <StyledContent>
                <TextLink
                    href={`${ROUTES.PRODUCTS}/${cartItem.productName}`}
                    MuiLinkProps={{
                        className: 'product-name',
                    }}
                    limitLine={1}
                >
                    {cartItem.productName}
                </TextLink>
                <Box component="ul" className="product-attributes">
                    {cartItem.option &&
                        Object?.entries(cartItem.option).map(([key, value]) => {
                            return (
                                <Box
                                    component="li"
                                    className="attribute"
                                    key={key}
                                >
                                    <Typography className="key">
                                        {key}:{' '}
                                    </Typography>
                                    <Typography className="value">
                                        {value}
                                    </Typography>
                                </Box>
                            );
                        })}
                    <Box component="li" className="attribute">
                        <Typography className="key">Quantity: </Typography>
                        <Typography className="value">
                            {cartItem.quantity}
                        </Typography>
                    </Box>
                    <Box component="li" className="attribute">
                        <Typography className="key">Total: </Typography>
                        <Typography className="value">
                            {formatCurrency(cartItem.price)}
                        </Typography>
                    </Box>
                </Box>

                <Stack direction="row" gap={8} alignItems="center">
                    <InputChangeAmount
                        className="input-amount"
                        value={quantity}
                        onChange={(value) => {
                            if (value) {
                                setQuantity(value);
                            }
                        }}
                    />
                    {quantity !== cartItem.quantity && (
                        <TextHover
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                updateProductQuantity({
                                    option: cartItem.option,
                                    quantity,
                                    cartItemId: cartItem.cartItemId,
                                    productId: cartItem.productId,
                                });
                            }}
                        >
                            Update
                        </TextHover>
                    )}
                </Stack>
            </StyledContent>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    cursor: 'pointer',
                }}
                component="div"
                className="btn-remove"
                onClick={() => {
                    removeProductFromCart(cartItem.cartItemId);
                }}
                title="Remove"
            >
                <IconX width={16} height={16} color={grey[500]} />
            </Box>
        </StyledCartItem>
    );
});

CartItem.displayName = 'CartItem';

const StyledCartItem = styled(Box)`
    display: flex;
    align-items: flex-start;
    gap: ${pxToRem(16)};
`;

const StyledImageWrapper = styled(Box)`
    flex-shrink: 0;
    position: relative;
    width: 100%;
    max-width: ${pxToRem(80)};
    height: 100%;
    padding-bottom: 40%;

    @media screen and (${DEVICE.tablet}) {
        max-width: ${pxToRem(115)};
    }
`;

const StyledContent = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(8)};

    .product-name {
        max-width: 250px;
        font-size: ${pxToRem(18)};
        font-weight: 600;
    }

    .product-attributes {
        display: flex;
        flex-direction: column;
        gap: ${pxToRem(4)};

        .attribute {
            display: flex;
            align-items: center;
        }

        .attribute .key {
            font-weight: 600;
            width: 80px;
        }
    }

    .input-amount {
        height: ${pxToRem(32)};

        .add,
        .sub,
        input {
            height: ${pxToRem(32)};
        }

        svg {
            width: ${pxToRem(16)};
            height: ${pxToRem(16)};
        }
    }
`;
