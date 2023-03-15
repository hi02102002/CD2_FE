import { Typography, TypographyProps, styled } from '@mui/material';

type Props = {} & TypographyProps;

const TextHover = ({ children, ...props }: Props) => {
    return <StyledTextHover {...props}>{children}</StyledTextHover>;
};

const StyledTextHover = styled(Typography)`
    color: ${({ theme }) => theme.themeColor.primary};
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.7;
    }
`;

export default TextHover;
