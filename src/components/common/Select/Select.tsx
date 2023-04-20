import { memo } from 'react';

import {
    Box,
    BoxProps,
    Select as MuiSelect,
    SelectProps,
    Typography,
    styled,
} from '@mui/material';

import { Label, MessageError } from '@/components/common';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    label?: string;
    isError?: boolean;
    messageError?: string;
    className?: string;
    sx?: BoxProps['sx'];
    required?: boolean;
    SelectProps?: Omit<SelectProps<any>, 'label' | 'placeholder'>;
    placeholder?: string;
    children?: React.ReactNode;
};

const Select = memo(
    ({
        isError,
        label,
        messageError,
        SelectProps,
        placeholder,
        required,
        children,
    }: Props) => {
        return (
            <StyledSelect>
                {label && <Label required={required}>{label}</Label>}
                <StyledMuiSelect
                    {...SelectProps}
                    displayEmpty
                    renderValue={(value: any) =>
                        value?.length ? (
                            Array.isArray(value) ? (
                                value.join(', ')
                            ) : (
                                value
                            )
                        ) : (
                            <Typography className="placeholder">
                                {placeholder || 'Select'}
                            </Typography>
                        )
                    }
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                boxShadow:
                                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                ...SelectProps?.MenuProps?.PaperProps?.sx,
                            },
                            ...SelectProps?.MenuProps?.PaperProps,
                        },
                    }}
                    error={isError || !!messageError}
                >
                    {children}
                </StyledMuiSelect>
                {messageError && <MessageError>{messageError}</MessageError>}
            </StyledSelect>
        );
    },
);

Select.displayName = 'Select';

const StyledSelect = styled(Box)<Props>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${pxToRem(8)};
`;

const StyledMuiSelect = styled(MuiSelect)`
    & .MuiInputBase-input {
        padding: 0;
        display: flex;
        align-items: center;
        padding-left: ${pxToRem(16)};
        height: ${pxToRem(40)} !important;
    }

    .MuiOutlinedInput-notchedOutline {
        transition: all 0.3s ease;
        border: 1px solid #d2d2d2;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 1px solid ${(p) => p.theme.themeColor.primary} !important;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
        border: 1px solid #d2d2d2;
    }
`;

export default Select;
