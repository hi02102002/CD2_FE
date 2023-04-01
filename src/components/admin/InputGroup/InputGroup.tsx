import {
    Box,
    BoxProps,
    Input,
    InputProps,
    TypographyProps,
    styled,
} from '@mui/material';

import Label from '../Label';
import MessageError from '../MessageError';

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
    required,
    LabelProps,
    ...props
}: Props) => {
    return (
        <StyledInputGroup className={className} {...props}>
            <Label required={required} {...LabelProps}>
                {label}
            </Label>
            <Input fullWidth {...InputProps} error={!!messageError} />
            {messageError && (
                <MessageError {...ErrorMessageProps}>
                    {messageError}
                </MessageError>
            )}
        </StyledInputGroup>
    );
};

const StyledInputGroup = styled(Box)``;

export default InputGroup;
