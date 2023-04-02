import { useState } from 'react';



import Image from 'next/image';

import { Box, Grid, Rating, Stack, Typography, styled } from '@mui/material';
import {
    IconArrowsRightLeft,
    IconQuestionMark,
    IconShare,
    IconStar,
} from '@tabler/icons-react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import imgFooter from '@/assets/footer-payment.png';
import {
    Button,
    InputChangeAmount,
    TextHover,
    Tooltip,
} from '@/components/common';
import { DEVICE } from '@/constants';
import { Product } from '@/types/product';
import { pxToRem } from '@/utils/pxToRem';
const sizes = ['S', 'M', 'L'];

type Props = {
    product: Product;
    options: {
        key: string;
        values: {
            name: any;
            price: number | null;
            quantity: number | null;
        }[];
    }[];
};

function ProductInfo({ product, options }: Props) {
    const [size, setSize] = useState<String>('');

    return (
        <StyledProductInfo item md={5.5} xs={12} className="product-info">
            <Box className="product-title-wrap">
                <Typography component="span">{product.name}</Typography>

                <Tooltip title="Add to Wish list" arrow placement="left">
                    <Box>
                        <Button
                            className="button-wishlist"
                            typeButton="secondary"
                        >
                            <IconStar />
                        </Button>
                    </Box>
                </Tooltip>
            </Box>

            <Box className="product-rate">
                <Box className="product-rate-price">
                    <Typography className="price">${product.price}</Typography>
                    <Typography className="discount">$25.00</Typography>
                </Box>
                <Box className="product-rate-review">
                    <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        sx={{ fontSize: 16 }}
                    />
                    <Typography component="a">(1 Review)</Typography>
                </Box>
            </Box>

            <Typography className="product-desc">
                {product.description}
            </Typography>

            <Box component="div" className="product-add-form">
                <form className="product-data">
                    {options.length > 0 && (
                        <StyledOptions component="div">
                            {options.map((option) => {
                                return (
                                    <Box key={option.key}>
                                        <StyledAttributeName>
                                            {option.key}
                                        </StyledAttributeName>
                                        <StyledListAttributeValue>
                                            {option.values.map((value) => {
                                                return (
                                                    <StyledAttributeValue
                                                        typeButton="secondary"
                                                        key={value.name}
                                                    >
                                                        {value.name}
                                                    </StyledAttributeValue>
                                                );
                                            })}
                                        </StyledListAttributeValue>
                                    </Box>
                                );
                            })}
                        </StyledOptions>
                    )}

                    <Box component="div" className="product-option-bottom">
                        <Stack direction="row" alignItems="center" gap={16}>
                            <InputChangeAmount />
                            <StyledAddCartButton typeButton="secondary">
                                Add to Cart
                            </StyledAddCartButton>
                        </Stack>

                        <StyledBuyButton
                            className="button-buy"
                            typeButton="primary"
                        >
                            Buy It Now
                        </StyledBuyButton>
                    </Box>
                </form>
            </Box>
            <Stack direction="row" spacing={20} alignItems="center">
                <StyledTextHover>
                    <IconArrowsRightLeft />
                    Add to Compare
                </StyledTextHover>
                <StyledTextHover>
                    <IconShare />
                    Share
                </StyledTextHover>
                <StyledTextHover>
                    <IconQuestionMark />
                    Ask a Question
                </StyledTextHover>
            </Stack>

            <StyledInfoFooter component="div">
                <Image src={imgFooter} alt={''}></Image>
                <Typography variant="caption">
                    Guarantee safe & secure checkout
                </Typography>
            </StyledInfoFooter>
        </StyledProductInfo>
    );
}

const StyledProductInfo = styled(Grid)`
    padding-left: ${pxToRem(45)};
    @media ${DEVICE.mobileS} {
        padding-left: 0;
    }

    @media ${DEVICE.tablet} {
        padding-left: ${pxToRem(45)};
    }
    .product-title-wrap {
        display: flex;
        justify-content: space-between;
        margin-bottom: ${pxToRem(6)};
        align-items: center;
        span {
            font-size: ${pxToRem(36)};
            color: #000;
        }
        .button-wishlist {
            width: ${pxToRem(45)};
            height: ${pxToRem(45)};
            padding: 0;
            border: 0;
            border-radius: 100%;
            border: 1px solid #ccc;
        }
    }

    .product-rate {
        display: flex;
        align-items: center;
        margin-bottom: ${pxToRem(12)};
        justify-content: space-between;

        .product-rate-price {
            display: flex;
            align-items: center;
            .price {
                font-size: ${pxToRem(24)};
                color: #000;
                font-weight: 600;
                margin-right: ${pxToRem(10)};
            }

            .discount {
                font-size: ${pxToRem(16)};
                color: #ababab;
                text-decoration: overline;
            }
        }

        .product-rate-review {
            display: flex;
            align-items: center;

            a {
                padding: 0;
                border: 0;
                margin: 0 0 0 1rem;
                color: #000;
                font-size: ${pxToRem(14)};
                cursor: pointer;
            }
        }
    }

    .product-desc {
        line-height: 1.75;
        margin-bottom: ${pxToRem(25)};
    }

    .product-add-form {
        .btn-wrap {
            display: flex;
            align-items: center;
            margin: ${pxToRem(10)} 0 ${pxToRem(25)} 0;

            .button-size {
                padding: 0;
                margin: 0;
                width: ${pxToRem(42)};
                height: ${pxToRem(42)};
                margin-right: ${pxToRem(8)};
            }

            .button-size.active {
                color: #fff;
                background-color: #000;
            }
        }
    }
`;

const StyledAddCartButton = styled(Button)`
    height: ${pxToRem(44)};
    width: 100%;
`;

const StyledBuyButton = styled(Button)`
    margin: ${pxToRem(20)} 0;
    width: 100%;
`;

const StyledTextHover = styled(TextHover)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${pxToRem(8)};
    cursor: pointer;
`;

const StyledInfoFooter = styled(Box)`
    width: 100%;
    height: ${pxToRem(80)};
    background-color: #f7f7f7;
    margin: ${pxToRem(20)} 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
        margin-top: ${pxToRem(10)};
        font-size: ${pxToRem(16)};
        color: #000;
    }
`;

const StyledOptions = styled(Box)`
    margin-bottom: ${pxToRem(20)};
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
`;

const StyledAttributeName = styled(Typography)`
    margin: 0 ${pxToRem(16)} ${pxToRem(8)} 0;
    color: ${(p) => p.theme.themeColor.primary};
    font-weight: 600;
    font-size: ${pxToRem(16)};
    text-transform: capitalize;
`;

const StyledListAttributeValue = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: ${pxToRem(8)};
    align-items: center;
`;

const StyledAttributeValue = styled(Button)`
    width: ${pxToRem(42)};
    height: ${pxToRem(42)};
    padding: 0;
    transform: none !important;
    font-size:${pxToRem(12)};

    &.active {
        box-shadow: 0 0 0 0.1rem  ${(p) => p.theme.themeColor.primary};
        background-color: ${(p) => p.theme.themeColor.primary}
        color:#fff;
    }
`;

export default ProductInfo;