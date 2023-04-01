import { LoadingButton } from '@mui/lab';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
} from '@mui/material';

type Props = {
    title?: string;
    contentText?: string;
    isLoading?: boolean;
    onConfirm?: () => void;
} & DialogProps;

const AlterConfirm = ({
    open,
    onClose,
    title,
    isLoading,
    onConfirm,
    contentText,
    ...props
}: Props) => {
    return (
        <Dialog open={open} onClose={onClose} {...props}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {contentText}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => onClose}>Disagree</Button>
                    <LoadingButton
                        loading={isLoading}
                        variant="contained"
                        onClick={onConfirm}
                        autoFocus
                    >
                        Agree
                    </LoadingButton>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AlterConfirm;
