import Image from 'next/image';



import { Box, BoxProps, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IconX } from '@tabler/icons-react';

import { InputChangeAmount, TextLink } from '@/components/common';
import { DEVICE } from '@/constants';
import useCartStore from '@/store/cart';
import { CartItem as TCartItem } from '@/types/product';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    cart: TCartItem;
} & BoxProps;

export const CartItem = ({ cart, ...props }: Props) => {
    const { removeProductFromCart } = useCartStore();
    return (
        <StyledCartItem {...props} className={`${props.className} cart`}>
            <StyledImageWrapper className="img-wrapper">
                <Image
                    src="https://blueskytechmage.com/minimog/media/catalog/product/cache/88bf2add142c4b6ca1b5495b85e72541/p/r/product_fashion_12_b_1_1_4.jpeg"
                    alt=""
                    style={{
                        objectFit: 'cover',
                    }}
                    fill
                />
            </StyledImageWrapper>
            <StyledContent>
                <TextLink
                    href="/products/1"
                    MuiLinkProps={{
                        className: 'product-name',
                    }}
                >
                    {props.id}
                </TextLink>
                <Box component="ul" className="product-attributes">
                    <Box component="div" className="attribute">
                        <Typography className="key">Colors: </Typography>
                        <Typography className="value">Red</Typography>
                    </Box>
                </Box>
                <Typography className="product-price">$55.00</Typography>
                <InputChangeAmount className="input-amount" />
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
            >
                <IconX width={16} height={16} color={grey[500]} />
            </Box>
        </StyledCartItem>
    );
};

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
        width: max-content;
    }

    .product-attributes {
        display: flex;
        flex-direction: column;
        gap: ${pxToRem(4)};

        .attribute {
            display: flex;
            align-items: center;
            gap: ${pxToRem(16)};
        }

        .attribute .key {
            font-weight: 600;
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