import {
    ButtonBase,
    ButtonBaseProps,
    CircularProgress,
    CircularProgressProps,
    css,
    styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    typeButton?: 'primary' | 'secondary';
    isLoading?: boolean;
    propsIconLoading?: CircularProgressProps;
} & ButtonBaseProps;

const StyledButton = styled(ButtonBase)<Props>`
    font-weight: 500;
    text-transform: initial;
    border-radius: ${pxToRem(5)};
    font-size: ${pxToRem(16)};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${pxToRem(10.5)} ${pxToRem(32)};
    transition: all 0.2s ease;
    font-family: var(--font-base);

    &.primary {
        ${({ theme }) => {
            return css`
                background-color: ${theme.button.primary.background};
                color: ${theme.button.primary.color};
                border: 1px solid ${theme.button.primary.border};
                &:hover {
                    box-shadow: 0 0 0 0.1rem ${theme.button.primary.border};
                }
            `;
        }};
    }

    &.secondary {
        ${({ theme }) => {
            return css`
                background-color: ${theme.button.secondary.background};
                color: ${theme.button.secondary.color};
                border: 1px solid ${theme.button.secondary.border};
                &:hover {
                    box-shadow: 0 0 0 0.1rem ${theme.button.secondary.border};
                    background-color: ${theme.button.secondary.color};
                    color: ${theme.button.secondary.background};
                }
            `;
        }};
    }

    &:disabled {
        background-color: ${grey[200]};
        border: 1px solid ${grey[200]};
        color: ${grey[600]};
    }

    &:active {
        transform: translateY(3px);
    }
`;

const Button = ({
    isLoading,
    disabled,
    className = '',
    typeButton = 'primary',
    ...props
}: Props) => {
    return (
        <StyledButton
            {...props}
            typeButton={typeButton}
            disableRipple
            disabled={isLoading || disabled}
            className={`${className} ${typeButton}`}
        >
            {isLoading ? (
                <CircularProgress
                    {...props.propsIconLoading}
                    size={props.propsIconLoading?.size || 20}
                    sx={{
                        marginRight: pxToRem(8),
                        color: 'inherit',
                        ...props.propsIconLoading?.sx,
                    }}
                />
            ) : null}
            {props.children}
        </StyledButton>
    );
};

export default Button;
