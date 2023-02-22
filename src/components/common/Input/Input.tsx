import {
    Box,
    BoxProps,
    InputBase,
    InputBaseProps,
    Typography,
    css,
    styled,
} from '@mui/material';
import { red } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    label?: string;
    isError?: boolean;
    messageError?: string;
} & InputBaseProps;

const Input = ({ label,required, messageError, isError,...rest }: Props) => {
    
    return (
        
        <StyledInputWrap required={required}>
            {label && (
                <Typography component="label" variant="body1" className="label">
                    {label}
                </Typography>
            )}
            <StyledInput required={required} isError={isError} {...rest} />
            {messageError && isError && (
                <Typography
                    variant="body1"
                    component="p"
                    className="message-error"
                >
                    {messageError}
                </Typography>
            )}
        </StyledInputWrap>
    );
};

const StyledInputWrap = styled(Box)<BoxProps & { required?: boolean }>`
    display: flex;
    flex-direction: column;

    .label {
        display: flex;
        align-items: center;
        margin-bottom: ${pxToRem(5)};

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
        color: ${red[500]};
    }
`;

const StyledInput = styled(InputBase)<Props>`
    .MuiInputBase-input {
        padding: ${pxToRem(3)} ${pxToRem(18)};
        height: ${pxToRem(40)};
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #d2d2d2;
        font-size: ${pxToRem(15)};
        transition: border-color 0.3s ease;
        border-color: ${({ isError }) => (isError ? red[500] : '#d2d2d2')};

        &:focus {
            border-color: ${({ isError }) => (isError ? red[500] : '#222')};
        }
    }
`;

export default Input;
