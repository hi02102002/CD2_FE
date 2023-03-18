import { Typography, TypographyProps, css, styled } from '@mui/material';

type Props = {
    numLine?: number;
} & TypographyProps;

const TextLimit = ({ numLine, ...props }: Props) => {
    return (
        <StyledTextLimit numLine={numLine} {...props}>
            {props.children}
        </StyledTextLimit>
    );
};

const StyledTextLimit = styled(Typography)<Props>`
    ${(p) =>
        p.numLine
            ? css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: ${p.numLine}; /* number of lines to show */
                  line-clamp: ${p.numLine};
                  -webkit-box-orient: vertical;
              `
            : undefined}
`;

export default TextLimit;
