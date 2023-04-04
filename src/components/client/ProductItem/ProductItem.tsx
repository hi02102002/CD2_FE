import { useState } from 'react';



import Image from 'next/image';
import Link from 'next/link';

import { Box, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { IconEye, IconHeart } from '@tabler/icons-react';

import { Button, TextLink, Tooltip } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import useCartStore from '@/store/cart';
import { Product } from '@/types/product';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    product: Product;
};

const ProductItem = ({ product }: Props) => {
    const { addProductToCart } = useCartStore();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        try {
            //
            setLoading(true);
            console.log(product.options);
            addProductToCart({});
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <StyledProductItem>
            <StyledProductTop>
                <Link href={`${ROUTES.PRODUCTS}/${product?.id}`}>
                    <Box
                        position="relative"
                        paddingTop={`${1.30888030888 * 100}%`}
                        component="div"
                        className="img-wrapper"
                    >
                        <Image
                            src={
                                product?.imageURL
                                    ?.split(',')
                                    .filter((item) => item !== '')[0]
                            }
                            alt=""
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            draggable={false}
                        />
                    </Box>
                </Link>
                <StyledTools spacing={pxToRem(10)} className="tools">
                    <Tooltip title="Quick view" arrow placement="left">
                        <Box>
                            <Button typeButton="secondary" className="btn-tool">
                                <IconEye />
                            </Button>
                        </Box>
                    </Tooltip>
                    <Tooltip title="Add to wishlist" arrow placement="left">
                        <Box>
                            <Button typeButton="secondary" className="btn-tool">
                                <IconHeart />
                            </Button>
                        </Box>
                    </Tooltip>
                </StyledTools>
                <Box component="div" className="btn-wrapper">
                    <Button
                        className="btn-add-cart"
                        typeButton="secondary"
                        isLoading={loading}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </StyledProductTop>
            <StyledContent>
                <TextLink
                    href={`${ROUTES.PRODUCTS}/${product?.id}`}
                    MuiLinkProps={{
                        className: 'title',
                        title: product?.name,
                    }}
                    limitLine={1}
                >
                    {product?.name}
                </TextLink>
                <Stack direction="row" spacing={pxToRem(8)}>
                    <Typography className="price">${product?.price}</Typography>
                    <Typography className="discount">$102.00</Typography>
                </Stack>
            </StyledContent>
        </StyledProductItem>
    );
};

const StyledProductItem = styled(Box)`
    overflow: hidden;
`;

const StyledProductTop = styled(Box)`
    position: relative;
    overflow: hidden;

    .btn-wrapper {
        display: none;
        position: absolute;
        bottom: -${pxToRem(100)};
        left: 0;
        right: 0;
        transition: bottom 0.3s ease;
    }

    .btn-wrapper .btn-add-cart {
        width: 100%;
        margin: 0 ${pxToRem(20)};
        border: 0;
    }

    .img-wrapper {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    &:hover .tools {
        right: ${pxToRem(20)};
    }

    &:hover .btn-wrapper {
        bottom: ${pxToRem(20)};
    }

    &:hover .img-wrapper {
        transform: scale(1);
    }

    @media screen and (${DEVICE.tablet}) {
        .btn-wrapper,
        .tools {
            display: flex;
        }
    }
`;

const StyledTools = styled(Stack)`
    position: absolute;
    right: -100px;
    top: ${pxToRem(20)};
    transition: right 0.3s ease;
    display: none;

    .btn-tool {
        width: ${pxToRem(45)};
        height: ${pxToRem(45)};
        padding: 0;
        border: 0 !important;
        border-radius: 50%;
    }
`;

const StyledContent = styled(Box)`
    margin-top: ${pxToRem(20)};
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(6)};

    .title {
        font-size: ${pxToRem(18)};
    }

    .price,
    .discount {
        font-weight: 500;
        font-size: ${pxToRem(14)};
    }

    .price {
        color: ${({ theme }) => theme.themeColor.primary};
    }

    .discount {
        opacity: 0.8;
        text-decoration: line-through;
    }
`;

export default ProductItem;