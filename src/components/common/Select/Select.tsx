import {
    Box,
    BoxProps,
    Select as MuiSelect,
    SelectProps,
    Typography,
    css,
    styled,
} from '@mui/material';

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
};

const Select = ({
    className,
    isError,
    label,
    messageError,
    sx,
    SelectProps,
    placeholder,
}: Props) => {
    console.log({ className, isError, messageError, sx });
    return (
        <StyledSelect>
            {label && (
                <Typography component="label" variant="body1" className="label">
                    {label}
                </Typography>
            )}
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
            />
        </StyledSelect>
    );
};

const StyledSelect = styled(Box)<Props>`
    display: flex;
    flex-direction: column;
    width: 100%;

    .label {
        display: flex;
        align-items: center;
        margin-bottom: ${pxToRem(5)};
        height: 30px;

        &::after {
            ${({ required }) =>
                required
                    ? css`
                          content: '*';
                          color: #e02b27;
                          font-size: 1.2rem;
                          margin: 0 0 0 6px;
                      `
                    : undefined}
        }
    }

    .message-error {
        margin-top: ${pxToRem(7)};
        font-size: ${pxToRem(12)};
        color: #e02b27;
    }
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
