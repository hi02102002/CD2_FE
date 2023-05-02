import { useState } from 'react';

import { Box, Grid, Rating, Stack, Typography, styled } from '@mui/material';
import { toast } from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { ChooseOptions } from '@/components/client';
import { Button, InputChangeAmount } from '@/components/common';
import { DEVICE } from '@/constants';
import { useSelectedProductVariant } from '@/hooks/useSelectedProductVariant';
import useAuthStore from '@/store/auth';
import useCartStore from '@/store/cart';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { optionsKeyValues } from '@/utils/optionsKeyValues';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    product: Product;
};

function ProductInfo({ product }: Props) {
    const { addProductToCart } = useCartStore();
    const { user } = useAuthStore();
    const options = optionsKeyValues(product.options);
    const [quantity, setQuantity] = useState<number>(1);
    const {
        isSelectAllKeyRequired,
        selected,
        selectedProductVariant,
        setSelected,
    } = useSelectedProductVariant(product.options);

    const isQuantityInputLargerProductQuantity =
        selectedProductVariant?.quantity
            ? quantity > selectedProductVariant.quantity
            : quantity > product.quantity;

    const [loading, setLoading] = useState<boolean>(false);

    const handelAddProductToCart = async () => {
        if (!user) {
            toast.error('Please login to add this product to cart');
            return;
        }
        if (!selectedProductVariant && product.options.length > 0) {
            toast.error(' You must choose options before add to cart');
            return;
        }
        if (product.quantity <= 0) {
            toast.error('This product is out of stock');
            return;
        }
        try {
            setLoading(true);
            await addProductToCart({
                optionsSelected: selectedProductVariant || {},
                productId: product.id,
                quantity,
            });
            setLoading(false);
            toast.success('Add this product to your cart successfully');
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    error?.message ||
                    'Add this product to your cart failed',
            );
            setLoading(false);
        }
    };

    const originalPrice = selectedProductVariant?.price || product.price;
    const discountPrice =
        originalPrice - (originalPrice * product.discountPercent) / 100;

    return (
        <StyledProductInfo item md={5.5} xs={12} className="product-info">
            <Box className="product-title-wrap">
                <Typography component="span">{product.name}</Typography>
            </Box>

            <Box className="product-rate">
                <Box className="product-rate-price">
                    <Typography className="price">
                        {formatCurrency(discountPrice)}
                    </Typography>
                    <Typography className="discount">
                        {formatCurrency(originalPrice)}
                    </Typography>
                </Box>
                <Box className="product-rate-review">
                    <Rating
                        name="read-only"
                        value={product.averageRating || 0}
                        readOnly
                        sx={{ fontSize: 16 }}
                    />
                    <Typography component="a">
                        ({product.countReviews || 0} Review)
                    </Typography>
                </Box>
            </Box>

            <Typography className="product-desc">
                {product.description}
            </Typography>

            <Box component="div" className="product-add-form">
                <Box component="div" className="product-data">
                    {options.length > 0 && (
                        <ChooseOptions
                            selected={selected}
                            setSelected={setSelected}
                            options={options}
                        />
                    )}
                    <Typography my={24}>
                        {selectedProductVariant?.quantity || product.quantity}{' '}
                        pieces available
                    </Typography>
                    <Box
                        component="div"
                        className="product-option-bottom"
                        mt={24}
                    >
                        <Stack direction="row" alignItems="center" gap={16}>
                            <InputChangeAmount
                                value={quantity}
                                onChange={(value) => {
                                    if (value) {
                                        setQuantity(value);
                                    }
                                }}
                            />
                            <StyledAddCartButton
                                typeButton="secondary"
                                onClick={handelAddProductToCart}
                                disabled={
                                    !isSelectAllKeyRequired ||
                                    isQuantityInputLargerProductQuantity ||
                                    product.quantity === 0
                                }
                                isLoading={loading}
                            >
                                Add to Cart
                            </StyledAddCartButton>
                        </Stack>
                    </Box>
                </Box>
            </Box>
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

export default ProductInfo;
