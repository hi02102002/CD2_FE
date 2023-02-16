import {
    ButtonProps,
    CircularProgress,
    CircularProgressProps,
    Button as MButton,
    css,
    styled,
} from '@mui/material';
import { common, grey } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    typeButton?: 'primary';
    isLoading?: boolean;
    propsIconLoading?: CircularProgressProps;
} & ButtonProps;

const StyledButton = styled(MButton)<Props>`
    font-weight: 400;
    text-transform: initial;
    border-radius: ${pxToRem(5)};
    &:disabled {
        background-color: ${grey[200]};
        color: ${grey[500]};
        border: 2px solid ${grey[200]};
    }

    ${({ variant, typeButton, theme }) => {
        if (typeButton === 'primary') {
            if (variant === 'outlined') {
                return css`
                    background-color: ${common.white};
                    border: 2px solid ${theme.themeColor.primary};
                    color: ${theme.themeColor.primary};

                    &:hover {
                        background-color: ${theme.themeColor.primary};
                        border: 2px solid ${theme.themeColor.primary};
                        color: ${common.white};
                    }
                `;
            }

            if (variant === 'contained') {
                return css`
                    background-color: ${theme.themeColor.primary};
                    border: 2px solid ${theme.themeColor.primary};
                    color: ${common.white};

                    &:hover,
                    &:active {
                        box-shadow: 0px 0px 0px 0.2rem
                            ${theme.themeColor.primary};
                        background-color: ${theme.themeColor.primary};
                    }
                `;
            }
        }
    }};
`;

const Button = ({ isLoading, disabled, ...props }: Props) => {
    return (
        <StyledButton disableRipple {...props} disabled={isLoading || disabled}>
            {isLoading ? (
                <CircularProgress
                    {...props.propsIconLoading}
                    size={props.propsIconLoading?.size || 20}
                    sx={{
                        marginRight: pxToRem(8),
                        color: disabled || isLoading ? grey[500] : common.white,
                        ...props.propsIconLoading?.sx,
                    }}
                />
            ) : null}
            {props.children}
        </StyledButton>
    );
};

export default Button;
