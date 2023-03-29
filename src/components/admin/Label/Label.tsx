import { Typography, TypographyProps, styled } from '@mui/material';
import { red } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    required?: boolean;
} & TypographyProps;

const Label = ({ className, required, children, ...props }: Props) => {
    return (
        <StyledLabel
            color={(theme) => theme.themeColor.primary}
            className={`${className || ''} ${required ? 'required' : ''}`}
            {...props}
        >
            {children}
        </StyledLabel>
    );
};

const StyledLabel = styled(Typography)`
    &.required {
        display: flex;
        align-items: center;
        gap: ${pxToRem(4)};

        &::after {
            content: ' *';
            color: ${red[500]};
        }
    }
`;

export default Label;
