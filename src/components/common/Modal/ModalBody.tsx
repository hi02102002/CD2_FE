import { Box, BoxProps } from '@mui/material';

type Props = BoxProps;

const ModalBody = ({ children, ...props }: Props) => {
    return (
        <Box padding={16} {...props} bgcolor="Background.papers">
            {children}
        </Box>
    );
};

export default ModalBody;
