import { Typography, TypographyProps, styled } from '@mui/material';
import { red } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

type Props = {} & TypographyProps;

const MessageError = ({ className, children, ...props }: Props) => {
    return (
        <StyledMessageError
            className={`${className || ''} err-message`}
            {...props}
        >
            {children}
        </StyledMessageError>
    );
};

const StyledMessageError = styled(Typography)`
    margin-top: ${pxToRem(7)};
    font-size: ${pxToRem(14)};
    color: ${red[500]};
`;

export default MessageError;
