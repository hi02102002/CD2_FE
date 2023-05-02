import { useState } from 'react';

import Image from 'next/image';

import { Box, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { toast } from 'react-hot-toast';

import {
    Button,
    InputChangeAmount,
    LoadingFullPage,
    TextHover,
} from '@/components/common';
import { DEVICE } from '@/constants';
import useCartStore from '@/store/cart';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { getImgUrls } from '@/utils/getImgUrl';
import { pxToRem } from '@/utils/pxToRem';

export const TableCart = () => {
    const { userCart } = useCartStore();

    return (
        <StyledTable>
            <StyledTHead component="thead">
                <tr>
                    <th className="col item">
                        <Typography variant="h4">Item</Typography>
                    </th>
                    <th className="col price">
                        <Typography variant="h4">Price</Typography>
                    </th>
                    <th className="col quantity">
                        <Typography variant="h4">Quantity</Typography>
                    </th>
                </tr>
            </StyledTHead>
            <StyledTBody component="tbody">
                {userCart && userCart?.cartItems.length > 0 ? (
                    <>
                        {userCart?.cartItems.map((cartItem) => {
                            return (
                                <Row
                                    cartItem={cartItem}
                                    key={cartItem.cartItemId}
                                />
                            );
                        })}
                    </>
                ) : (
                    <tr>
                        <Typography
                            variant="h4"
                            textAlign="center"
                            padding={16}
                            flex={1}
                        >
                            No item in cart
                        </Typography>
                    </tr>
                )}
            </StyledTBody>
        </StyledTable>
    );
};

type PropsRow = {
    cartItem: CartItem;
};

const Row = ({ cartItem }: PropsRow) => {
    const { updateProductQuantity, removeProductFromCart } = useCartStore();

    const [quantity, setQuantity] = useState<number>(cartItem.quantity);

    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);

    const handleRemove = async () => {
        try {
            setIsLoadingRemove(true);
            await removeProductFromCart(cartItem.cartItemId);
            setIsLoadingRemove(false);
            toast.success('Remove item success');
            setIsLoadingRemove(false);
        } catch (error) {
            console.log(error);
            setIsLoadingRemove(false);
            toast.error('Remove item failed');
        }
    };

    return (
        <>
            <tr>
                <td className="col item">
                    <Stack direction="row" spacing={16}>
                        <Box width="30%">
                            <Box
                                position="relative"
                                paddingBottom="130.5%"
                                width="100%"
                            >
                                <Image
                                    src={getImgUrls(cartItem.imageUrl)?.[0]}
                                    alt=""
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box width="70%">
                            <Typography variant="h4">
                                {cartItem.productName}
                            </Typography>
                            {cartItem.option &&
                                Object?.entries(cartItem.option).map(
                                    ([key, value]) => {
                                        return (
                                            <Stack
                                                direction="row"
                                                gap={8}
                                                key={key}
                                            >
                                                <Typography fontWeight={500}>
                                                    {key}:{' '}
                                                </Typography>
                                                <Typography>
                                                    {value}{' '}
                                                </Typography>
                                            </Stack>
                                        );
                                    },
                                )}
                        </Box>
                    </Stack>
                </td>
                <td className="col price" data-td="Price">
                    <Typography>{formatCurrency(cartItem.price)}</Typography>
                </td>
                <td className="col quantity" data-td="Quantity">
                    <Stack direction="row" gap={16} alignItems="center">
                        <InputChangeAmount
                            className="input-quantity"
                            value={quantity}
                            onChange={(value) => {
                                if (value) {
                                    setQuantity(value);
                                }
                            }}
                        />
                        <Box flexShrink={0}>
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
                        </Box>
                    </Stack>
                </td>
                <td className="col action" data-td="Action">
                    <Button
                        sx={{
                            width: '100%',
                        }}
                        onClick={handleRemove}
                    >
                        Remove
                    </Button>
                </td>
            </tr>
            {isLoadingRemove && <LoadingFullPage />}
        </>
    );
};

const StyledTable = styled(Box)`
    border: 1px solid ${grey[200]};

    thead,
    tbody,
    tr {
        width: 100%;
        display: block;
    }

    .col {
        padding: ${pxToRem(16)};
        padding-left: 0;
        display: inline-block;

        &.item {
            width: 100%;
        }

        &.price {
            width: 50%;
        }

        &.quantity {
            width: 100%;
        }

        &.subtotal {
            width: 50%;
        }

        &.action {
            width: 100%;
        }
    }

    @media screen and (${DEVICE.mobileL}) {
        border: 0;

        .col {
            &.price {
                width: 25%;
            }

            &.quantity {
                width: 50%;
            }

            &.subtotal {
                width: 25%;
            }
        }
    }

    @media screen and (${DEVICE.tablet}) {
        border: 0;

        .col {
            &.item {
                width: 40%;
            }

            &.price {
                width: 10%;
            }

            &.quantity {
                width: 25%;
            }

            &.subtotal {
                width: 10%;
            }

            &.action {
                width: 15%;
            }
        }
    }
`;

const StyledTHead = styled(Box)`
    border-bottom: 1px solid ${grey[200]};

    th {
        text-align: left;
    }

    .col {
        &.price,
        &.quantity,
        &.subtotal {
            display: none;
        }

        &.item {
            background-color: ${grey[200]};
            padding: ${pxToRem(16)};
        }
    }

    @media screen and (${DEVICE.tablet}) {
        .col {
            &.item {
                width: 40%;
                background-color: unset;
            }

            &.price,
            &.quantity,
            &.subtotal {
                display: inline-block;
            }
        }
    }
`;

const StyledTBody = styled(Box)`
    tr {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid ${grey[200]};
    }

    td {
        vertical-align: middle;
    }

    td.col {
        padding-left: ${pxToRem(16)};
        vertical-align: top;
    }

    .col.price::before,
    .col.quantity::before,
    .col.subtotal::before {
        content: attr(data-td);
        font-weight: 600;
        color: ${({ theme }) => theme.themeColor.primary};
        font-size: ${pxToRem(18)};
        margin-bottom: ${pxToRem(16)};
        display: block;
    }

    .col.quantity {
        order: 1;
    }

    .col.quantity .input-quantity {
        max-width: unset;
    }

    .col.price {
        order: 2;
    }

    .col.subtotal {
        order: 3;
    }

    .col.action {
        order: 4;
    }

    @media screen and (${DEVICE.tablet}) {
        tr {
            display: block;
            flex-wrap: wrap;
        }
        .col {
            padding-left: 0;
            vertical-align: middle;

            &::before {
                content: none !important;
            }
        }

        .col.quantity .input-quantity {
            max-width: max-content;
            .MuiInputBase-root {
                width: ${pxToRem(40)};
            }
        }
    }
`;
