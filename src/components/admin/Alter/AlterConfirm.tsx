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
    onRemove?: () => void;
} & DialogProps;

const AlterConfirmRemove = ({
    open,
    onClose,
    title,
    isLoading,
    onRemove,
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
                        onClick={onRemove}
                        autoFocus
                    >
                        Agree
                    </LoadingButton>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AlterConfirmRemove;
