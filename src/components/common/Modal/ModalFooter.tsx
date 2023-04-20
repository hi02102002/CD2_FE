import { Stack, StackProps } from '@mui/material';

import { Button } from '@/components/common';
import type { Props as ButtonProps } from '@/components/common/Button/Button';

type Props = {
    textOk?: string;
    textCancel?: string;
    btnOkProps?: ButtonProps;
    btnCancelProps?: ButtonProps;
    onOk?: () => void;
    onCancel?: () => void;
} & StackProps;

const ModalFooter = ({
    textOk,
    textCancel,
    btnOkProps,
    btnCancelProps,
    onOk,
    onCancel,
    ...props
}: Props) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={16}
            p={16}
            justifyContent="flex-end"
            bgcolor="Background.papers"
            {...props}
        >
            <Button
                {...btnCancelProps}
                onClick={onCancel}
                typeButton="secondary"
                className="btn-cancel"
            >
                {textCancel}
            </Button>
            <Button {...btnOkProps} onClick={onOk} className="btn-ok">
                {textOk}
            </Button>
        </Stack>
    );
};

export default ModalFooter;
