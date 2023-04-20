import { memo } from 'react';

import {
    Box,
    BoxProps,
    InputBase,
    InputBaseProps,
    styled,
} from '@mui/material';
import { red } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

import Label from '../Label/Label';
import MessageError from '../MessageError/MessageError';

type Props = {
    label?: string;
    isError?: boolean;
    messageError?: string;
} & InputBaseProps;

const Input = memo(
    ({ label, required, messageError, isError, ...rest }: Props) => {
        return (
            <StyledInputWrap>
                {label && <Label required={required}>{label}</Label>}
                <StyledInput isError={isError} {...rest} />
                {messageError && isError && (
                    <MessageError>{messageError}</MessageError>
                )}
            </StyledInputWrap>
        );
    },
);

Input.displayName = 'Input';

const StyledInputWrap = styled(Box)<BoxProps & { required?: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${pxToRem(8)};
`;

const StyledInput = styled(InputBase)<Props>`
    .MuiInputBase-input {
        padding: ${pxToRem(3)} ${pxToRem(18)};
        height: ${pxToRem(40)};
        box-sizing: border-box;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #d2d2d2;
        font-size: ${pxToRem(15)};
        transition: border-color 0.3s ease;
        border-color: ${({ isError }) => (isError ? red[500] : '#d2d2d2')};
        display: flex;
        align-items: center;
        vertical-align: center;

        &:focus {
            border-color: ${({ isError }) => (isError ? red[500] : '#222')};
        }
    }
`;

export default Input;
