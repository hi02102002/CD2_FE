import { useState } from 'react';

import { Alert, Box, Modal, Stack, Typography, styled } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

import { Button, InputChangeAmount } from '@/components/common';
import { useSelectedProductVariant } from '@/hooks/useSelectedProductVariant';
import useAuthStore from '@/store/auth';
import useCartStore from '@/store/cart';
import { OptionKeyValues, Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { pxToRem } from '@/utils/pxToRem';

import ChooseOptions from '../ChooseOptions';

type Props = {
    open: boolean;
    onClose: () => void;
    options: Array<OptionKeyValues>;
    product: Pick<Product, 'name' | 'options' | 'price' | 'quantity' | 'id'>;
};

const ModalChooseOptions = ({ onClose, open, options, product }: Props) => {
    const { addProductToCart } = useCartStore();
    const { user } = useAuthStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    const { selected, selectedProductVariant, setSelected } =
        useSelectedProductVariant(product.options);

    const isQuantityInputLargerProductQuantity =
        selectedProductVariant?.quantity
            ? quantity > selectedProductVariant.quantity
            : quantity > product.quantity;

    const handelAddProductToCart = async () => {
        if (!user) {
            toast.error('Please login to add this product to cart');
            return;
        }
        if (!selectedProductVariant) {
            return;
        }
        try {
            setLoading(true);
            await addProductToCart({
                optionsSelected: selectedProductVariant,
                productId: product.id,
                quantity,
            });
            setLoading(false);
            toast.success('Add this product to your cart successfully');
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <StyledContent>
                <StyledButtonClose onClick={onClose}>
                    <IconX />
                </StyledButtonClose>
                {!selectedProductVariant && (
                    <Alert severity="warning">
                        You must choose options before add to cart.
                    </Alert>
                )}
                <Stack gap={8} marginY={16}>
                    <Typography variant="h3" fontWeight={500}>
                        {product.name}
                    </Typography>
                    <Typography
                        fontSize={18}
                        color={(theme) => theme.themeColor.primary}
                    >
                        {formatCurrency(
                            selectedProductVariant?.price || product.price,
                        )}
                    </Typography>
                </Stack>
                <ChooseOptions
                    selected={selected}
                    setSelected={setSelected}
                    options={options}
                />
                <Typography my={16}>
                    {selectedProductVariant?.quantity || product.quantity}{' '}
                    pieces available
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    gap={16}
                    mt={16}
                >
                    <InputChangeAmount
                        value={quantity}
                        onChange={(value) => {
                            if (value) {
                                setQuantity(value);
                            }
                        }}
                    />
                    <Button
                        sx={{
                            flex: 1,
                        }}
                        onClick={handelAddProductToCart}
                        isLoading={loading}
                        disabled={
                            !selectedProductVariant ||
                            isQuantityInputLargerProductQuantity
                        }
                    >
                        Add to cart
                    </Button>
                </Stack>
            </StyledContent>
        </Modal>
    );
};

const StyledContent = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: ${pxToRem(24)};
    background-color: #fff;
    border-radius: 4px;
    max-width: ${pxToRem(500)};
    width: 100%;
`;

const StyledButtonClose = styled('button')`
    --size: ${pxToRem(42)};
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 50%;
    border: 0;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    top: calc(-1 * var(--size) / 2);
    position: absolute;
    right: calc(-1 * var(--size) / 2);
    cursor: pointer;
`;

export default ModalChooseOptions;
