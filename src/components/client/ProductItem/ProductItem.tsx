import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Box, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { IconEye, IconHeart } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';

import { Button, TextLink, Tooltip } from '@/components/common';
import { DEVICE } from '@/constants';
import useCart from '@/store/cart';
import { pxToRem } from '@/utils/pxToRem';

const ProductItem = () => {
    const [data, setData] = useState({
        href1: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/03457e065bff3e97e5626ac3824c5d10/p/r/product_fashion_03_3.jpg',
        productName: 'Product',
        id: uuidv4(),
        price: Math.floor(Math.random() * 100 + 1),
        discount: Math.floor(Math.random() * (400 - 100) + 100),
        quantity: 1,
    });

    const { arrProducts, addProduct } = useCart();
    console.log(arrProducts);
    
    const handleAddToCart = () => {
        if (arrProducts.some((product) => product.id === data.id)) {
            console.log('smae');
            
            arrProducts.forEach((product) => {
                if(product.id === data.id){
                    product.quantity = product.quantity +1; 
                }
            })
        } else {
            addProduct(data);
        }
    };

    return (
        <StyledProductItem>
            <StyledProductTop>
                <Link href="/products/i">
                    <Box
                        position="relative"
                        paddingTop={`${1.30888030888 * 100}%`}
                        component="div"
                        className="img-wrapper"
                    >
                        <Image
                            src="https://blueskytechmage.com/minimog/media/catalog/product/cache/03457e065bff3e97e5626ac3824c5d10/p/r/product_fashion_03_3.jpg"
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
                        onClick={
                            handleAddToCart
                        }
                    >
                        Add to Cart
                    </Button>
                </Box>
            </StyledProductTop>
            <StyledContent>
                <TextLink
                    href="/products/i"
                    MuiLinkProps={{
                        className: 'title',
                    }}
                >
                    {data.productName}
                </TextLink>
                <Stack direction="row" spacing={pxToRem(8)}>
                    <Typography className="price">${data.price}</Typography>
                    <Typography className="discount">
                        ${data.discount}
                    </Typography>
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
