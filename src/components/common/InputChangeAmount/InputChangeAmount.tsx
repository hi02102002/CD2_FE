import { useState } from 'react';



import { Box, BoxProps, InputBase, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IconMinus, IconPlus } from '@tabler/icons-react';



import { pxToRem } from '@/utils/pxToRem';


type Props = {
    value?: number;
    onChange?: (value: number | undefined) => void;
    defaultValue?: number;
    sx?: BoxProps['sx'];
    className?: string;
};

export const InputChangeAmount = ({
    defaultValue,
    onChange,
    value,
    ...props
}: Props) => {
    const [amount, setAmount] = useState<number | undefined>(
        value || defaultValue || 1,
    );

    const handelIncrease = () => {
        setAmount((amount) => {
            if (!amount) {
                onChange?.(1);
                return 1;
            }
            onChange?.(amount + 1);
            return amount + 1;
        });
    };

    const handelDecrease = () => {
        setAmount((amount) => {
            if (!amount || amount === 1) {
                onChange?.(1);
                return 1;
            }
            onChange?.(amount - 1);
            return amount - 1;
        });
    };

    return (
        <StyledInputChangeAmount {...props} component="div">
            <Box
                component="button"
                className="sub"
                title="Decrease"
                onClick={handelDecrease}
            >
                <IconMinus />
            </Box>
            <InputBase
                className="input-amount"
                type="number"
                onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                    if (onlyNums.length === 0) {
                        onChange?.(undefined);
                        setAmount(undefined);
                    } else {
                        onChange?.(Number(onlyNums));
                        setAmount(Number(onlyNums));
                    }
                }}
                value={amount}
                onBlur={(e) => {
                    if (e.target.value === '') {
                        setAmount(1);
                        onChange?.(1);
                    }
                }}
            />
            <Box
                component="button"
                className="add"
                title="Increase"
                onClick={handelIncrease}
            >
                <IconPlus />
            </Box>
        </StyledInputChangeAmount>
    );
};

const StyledInputChangeAmount = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${grey[200]};
    border-radius: 4px;
    max-width: max-content;
    overflow: hidden;
    flex-shrink: 0;

    .sub,
    .add,
    .input-amount {
        width: ${pxToRem(44)};
        height: ${pxToRem(44)};
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: inherit;
    }

    .sub,
    .add {
        border: 0;
        outline: 0;
        cursor: pointer;
        &:hover {
            background-color: inherit;
        }
    }

    .MuiInputBase-input {
        text-align: center;

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        &[type='number'] {
            -moz-appearance: textfield;
        }
    }
`;