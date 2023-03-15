import {
    Box,
    BoxProps,
    Input,
    InputProps, styled, Typography,
    TypographyProps
} from '@mui/material';
import { red } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    InputProps?: InputProps;
    LabelProps?: TypographyProps;
    ErrorMessageProps?: TypographyProps;
    messageError?: string;
    label: string;
    required?: boolean;
} & BoxProps;

const InputGroup = ({
    label,
    className,
    InputProps,
    ErrorMessageProps,
    messageError,
    LabelProps,
    required,
    ...props
}: Props) => {
    return (
        <StyledInputGroup className={className} {...props}>
            <Typography
                color={(theme) => theme.themeColor.primary}
                {...LabelProps}
                className={`${LabelProps?.className} ${
                    required ? 'required' : ''
                }`}
            >
                {label}
            </Typography>
            <Input fullWidth {...InputProps} error={!!messageError} />
            {messageError && (
                <Typography
                    {...ErrorMessageProps}
                    className={`${ErrorMessageProps?.className} err-message`}
                >
                    {messageError}
                </Typography>
            )}
        </StyledInputGroup>
    );
};

const StyledInputGroup = styled(Box)`
    .required {
        display: flex;
        align-items: center;
        gap: ${pxToRem(4)};

        &::after {
            content: ' *';
            color: ${red[500]};
        }
    }

    .err-message {
        margin-top: ${pxToRem(7)};
        font-size: ${pxToRem(14)};
        color: ${red[500]};
    }
`;

export default InputGroup;
