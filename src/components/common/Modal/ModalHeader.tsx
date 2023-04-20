import { IconButton, Stack, StackProps, Typography } from '@mui/material';
import { IconX } from '@tabler/icons-react';

type Props = {
    onClose?: () => void;
    title?: string;
} & StackProps;

const ModalHeader = ({ onClose, title, ...props }: Props) => {
    return (
        <Stack
            p={16}
            padding={16}
            borderRadius={'4px 4px 0 0'}
            {...props}
            bgcolor="Background.papers"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography variant="h4">{title}</Typography>
            <IconButton disableRipple onClick={onClose}>
                <IconX />
            </IconButton>
        </Stack>
    );
};

export default ModalHeader;
