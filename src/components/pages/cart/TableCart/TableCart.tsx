import Image from 'next/image';



import { Box, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';

import { Button, InputChangeAmount } from '@/components/common';
import { DEVICE } from '@/constants';
import useCartStore from '@/store/cart';
import { pxToRem } from '@/utils/pxToRem';

export const TableCart = () => {
    const { cartItems } = useCartStore();
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
                    <th className="col subtotal">
                        <Typography variant="h4">Subtotal</Typography>
                    </th>
                </tr>
            </StyledTHead>
            <StyledTBody component="tbody">
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((cart, index) => {
                            return (
                                <tr key={index}>
                                    <td className="col item">
                                        <Stack
                                            direction="row"
                                            spacing={16}
                                            alignItems="center"
                                        >
                                            <Box width="30%">
                                                <Box
                                                    position="relative"
                                                    paddingBottom="130.5%"
                                                    width="100%"
                                                >
                                                    <Image
                                                        src="https://blueskytechmage.com/minimog/media/catalog/product/cache/8a992f0e07ac0af177f1d8a49e61f0ae/p/r/product_fashion_14_b_1_1.jpeg"
                                                        alt=""
                                                        fill
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box width="70%">
                                                <Typography variant="h4"></Typography>
                                                <Stack direction="row" gap={8}>
                                                    <Typography
                                                        fontWeight={500}
                                                    >
                                                        Color:{' '}
                                                    </Typography>
                                                    <Typography>
                                                        Red{' '}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </td>
                                    <td className="col price" data-td="Price">
                                        <Typography>$8.00</Typography>
                                    </td>
                                    <td
                                        className="col quantity"
                                        data-td="Quantity"
                                    >
                                        <InputChangeAmount className="input-quantity" />
                                    </td>
                                    <td
                                        className="col subtotal"
                                        data-td="Subtotal"
                                    >
                                        <Typography>$8.00</Typography>
                                    </td>
                                    <td className="col action" data-td="Action">
                                        <Button
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
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
        .MuiInputBase-root {
            width: 100%;
        }
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