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
import { pxToRem } from '@/utils/pxToRem';

const sizes = ['S', 'M', 'L'];

function ProductInfo() {
    const [size, setSize] = useState<String>('');

    return (
        <StyledProductInfo item md={5.5} xs={12} className="product-info">
            <Box className="product-title-wrap">
                <Typography component="span">Linen Check Blazer</Typography>

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
                    <Typography className="price">$6.00</Typography>
                    <Typography className="discount">$25.00</Typography>
                </Box>
                <Box className="product-rate-review">
                    <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        sx={{ fontSize: '16px' }}
                    />
                    <Typography component="a">(1 Review)</Typography>
                </Box>
            </Box>

            <Typography className="product-desc">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati…
            </Typography>

            <Box component="div" className="product-add-form">
                <form className="product-data">
                    <Box component="div" className="product-option">
                        <Box component="div" className="color">
                            <StyledAttribute variant="caption">
                                Color:
                            </StyledAttribute>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: `${pxToRem(16)}`,
                                    color: '#000',
                                }}
                            >
                                abc
                            </Typography>
                        </Box>
                        <Box component="div" className="size">
                            <StyledAttribute variant="caption">
                                Size:
                            </StyledAttribute>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: `${pxToRem(16)}`,
                                    color: '#000',
                                }}
                            >
                                {size}
                            </Typography>

                            <Box component="div" className="btn-wrap">
                                {sizes.map((type, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            className={`button-size  ${
                                                size === type ? 'active' : ''
                                            }`}
                                            typeButton="secondary"
                                            onClick={() => {
                                                setSize(type);
                                            }}
                                        >
                                            {type}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>

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
const StyledAttribute = styled(Typography)`
    margin: 0 ${pxToRem(16)} ${pxToRem(8)} 0;
    color: #000;
    font-weight: 600;
    font-size: ${pxToRem(16)};
`;
export default ProductInfo;
